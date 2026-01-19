import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { ANNUAL_PLANNING_DETAILS_PAGE_ROUTE } from '@routes';
import { AuthenticationSelectors, Confirmable, nameof, namesof, NgxSmzTablesModule, SimpleNamedEntity, SmzFilterType, SmzTableBuilder, SmzTableState, ToastActions } from '@ngx-smz/core';
import { AnnualPlanningsSelectors } from '@state/database/annual-plannings/annual-plannings.selectors';
import { AnnualPlanningListItem } from '@models/annual-planning-list-item';
import { Observable } from 'rxjs';
import { AnnualPlanningsActions } from '@state/database/annual-plannings/annual-plannings.actions';
import { ClaimDefinitions } from '@models/claim-definitions';
import { AnnualPlanningStatus } from '@models/annual-planning-status';
import { AnnualPlanningStatusInfo } from '@models/data-transforms/annual-planning-status-info';
import { AnnualPlanningPrivacy } from '@models/annual-planning-privacy';
import { AnnualPlanningPrivacyInfo } from '@models/data-transforms/annual-planning-privacy-info';
import { showAnnualPlanningCreationDialog } from './dialogs/show-annual-planning-creation-dialog';
import { showAnnualPlanningUpdateDialog } from './dialogs/show-annual-planning-update-dialog';
import { Navigate } from '@ngxs/router-plugin';
import { InspectionsActions } from '@state/database/inspections/inspections.actions';
import { AutoRefreshTableComponent } from '@components/auto-refresh-table.component';
import { showAnnualPlanningHistoryDialog } from './dialogs/show-annual-planning-history-dialog';

@Component({
  selector: 'app-annual-planning-list-page',
  standalone: true,
  imports: [
    CommonModule,
    NgxSmzTablesModule,
    AutoRefreshTableComponent
  ],
  template: `
  <div class="layout-container flex flex-col items-left justify-center h-full gap-2">
    <smz-ui-table class="w-full" [items]="annualPlannings$ | async" [state]="tableState">
      <ng-template pTemplate="caption">
        <app-auto-refresh-table [actions]="refreshActions" [manualActions]="manualActions" ></app-auto-refresh-table>
      </ng-template>
    </smz-ui-table>
  </div>
  `
})
export class AnnualPlanningListPageComponent {

  private readonly store: Store = inject(Store);
  public readonly annualPlannings$: Observable<AnnualPlanningListItem[]> = this.store.select(AnnualPlanningsSelectors.all);
  public refreshActions = [new AnnualPlanningsActions.LoadAllSilent];
  public manualActions = [new AnnualPlanningsActions.LoadAll];
  public readonly annualPlanningDetailsPageRoute = ANNUAL_PLANNING_DETAILS_PAGE_ROUTE;
  public tableState: SmzTableState = new SmzTableBuilder<AnnualPlanningListItem>()
    .setToolbarAlignment('end')
    .usePagination().setPaginationDefaultRows(2).setPaginationPageOptions([2, 10, 25, 50, 100])
    .enableClearFilters()
    .enableGlobalFilter()
    .useTableEmptyMessage()
    .setEmptyFeedbackMessage('Nenhum planejamento anual cadastrado.')
    .disableRowHoverEffect()
    .useStrippedStyle()
    .setSize('small')
    .buttons()
      .add('CRIAR PLANEJAMENTO', () => showAnnualPlanningCreationDialog())
        .setIcon('fa-solid fa-plus')
        .customAuthorize(ClaimDefinitions.MANAGE_ANNUAL_PLANNING)
        .buttons
      .table
    .menu()
      .item()
        .addChild('Ver Detalhes', 'fa-solid fa-table')
          .setActivationRule((annualPlanning: AnnualPlanningListItem) =>
            !this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(ClaimDefinitions.VIEW_ANNUAL_PLANNING)) || this.isInCalculationStatus(annualPlanning) || annualPlanning.status === AnnualPlanningStatus.DRAFT)
          .setCallback((annualPlanning: AnnualPlanningListItem) => this.store.dispatch(new Navigate([ ANNUAL_PLANNING_DETAILS_PAGE_ROUTE.join('/'), { planningId: annualPlanning.id }])))
          .applyChild()
        .addChild('Editar', 'fa-solid fa-pencil')
          .setActivationRule((annualPlanning: AnnualPlanningListItem) =>
            !this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(ClaimDefinitions.MANAGE_ANNUAL_PLANNING)) || this.isInCalculationStatus(annualPlanning) || annualPlanning.status === AnnualPlanningStatus.DRAFT)
          .setCallback((annualPlanning: AnnualPlanningListItem) => showAnnualPlanningUpdateDialog(annualPlanning))
          .applyChild()
        .addChild('Excluir', 'fa-solid fa-trash')
          .setCallback((annualPlanning: AnnualPlanningListItem) => this.deleteAnnualPlanning(annualPlanning))
          .applyChild()
        .addChild('Teste Toast', 'fa-solid fa-trash')
          .setCallback(() => this.testToast())
          .applyChild()
        .addChild('Recalcular Visão Exploratória', 'fa-solid fa-calculator')
          .setActivationRule((annualPlanning: AnnualPlanningListItem) =>
            !this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(ClaimDefinitions.MANAGE_ANNUAL_PLANNING)) || this.isInCalculationStatus(annualPlanning)|| annualPlanning.status === AnnualPlanningStatus.DRAFT)
          .askForCriticalConfirmation('Atenção', 'Tem certeza que deseja recalcular? Todos os resultados existentes serão perdidos')
          .setCallback((annualPlanning: AnnualPlanningListItem) =>
            this.store.dispatch(new AnnualPlanningsActions.CalculatePreliminaryResults({ annualPlanningId: annualPlanning.id, fetchNewWeatherData: false, fetchNewGiantsData: false })))
          .applyChild()
        .addChild('Ver Histórico', 'fa-solid fa-clock-rotate-left')
          .setCallback((annualPlanning: AnnualPlanningListItem) => showAnnualPlanningHistoryDialog(annualPlanning))
          .applyChild()
        .menu
      .separator()
      .item('Dados de RTI')
        .addChild('Baixar Excel', 'fa-solid fa-file-excel')
          .setActivationRule((annualPlanning: AnnualPlanningListItem) => !annualPlanning.hasRtiData || !this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(ClaimDefinitions.MANAGE_ANNUAL_PLANNING)))
          .setCallback((annualPlanning: AnnualPlanningListItem) => this.store.dispatch(new AnnualPlanningsActions.DownloadRtiData(annualPlanning.id, 'xlsx')))
          .applyChild()
        .addChild('Baixar JSON', 'fa-solid fa-file-code')
          .setActivationRule((annualPlanning: AnnualPlanningListItem) => !annualPlanning.hasRtiData || !this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(ClaimDefinitions.MANAGE_ANNUAL_PLANNING)))
          .setCallback((annualPlanning: AnnualPlanningListItem) => this.store.dispatch(new AnnualPlanningsActions.DownloadRtiData(annualPlanning.id, 'json')))
          .applyChild()
        .menu
      .separator()
      .item('Dados de Inspeção')
        .addChild('Baixar Excel', 'fa-solid fa-file-excel')
          .setActivationRule(() => !this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(ClaimDefinitions.MANAGE_ANNUAL_PLANNING)))
          .setCallback((annualPlanning: AnnualPlanningListItem) => this.store.dispatch(new AnnualPlanningsActions.DownloadInspectionData(annualPlanning.id, 'xlsx')))
          .applyChild()
        .addChild('Baixar JSON', 'fa-solid fa-file-code')
          .setActivationRule(() => !this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(ClaimDefinitions.MANAGE_ANNUAL_PLANNING)))
          .setCallback((annualPlanning: AnnualPlanningListItem) => this.store.dispatch(new AnnualPlanningsActions.DownloadInspectionData(annualPlanning.id, 'json')))
          .applyChild()
        .menu
      .table
    .columns()
      .text(namesof<AnnualPlanningListItem, SimpleNamedEntity>('plant', 'name'), 'Planta', '8em')
        .setFilter(SmzFilterType.MULTI_SELECT)
        .columns
      .text(nameof<AnnualPlanningListItem>('year'), 'Ano', '6em')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns
      .text(nameof<AnnualPlanningListItem>('description'), 'Descrição')
        .columns
      .dataTransform(nameof<AnnualPlanningListItem>('privacy'), 'Privacidade',
        (privacy: AnnualPlanningPrivacy) => new AnnualPlanningPrivacyInfo(privacy).getString(), '8em')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .filterWithTransformedData()
        .columns
      .dataTransform(nameof<AnnualPlanningListItem>('hasRtiData'), 'RTI', (hasRtiData: boolean) => hasRtiData ? 'Sim' : 'Não', '6em')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .filterWithTransformedData()
        .columns
      .text(nameof<AnnualPlanningListItem>('owner'), 'Proprietário', '10em')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns
      .date(nameof<AnnualPlanningListItem>('creationDate'), 'Data de Criação', '14em')
        .columns
      .dataTransform(nameof<AnnualPlanningListItem>('status'), 'Estado',
        (status: AnnualPlanningStatus) => new AnnualPlanningStatusInfo(status).getHtml(), '25em')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .setFilterableData((status: AnnualPlanningStatus) => new AnnualPlanningStatusInfo(status).getString())
        .columns
      .table
    .build();

  private isInCalculationStatus(annualPlanning: AnnualPlanningListItem): boolean {
    return (annualPlanning.status === AnnualPlanningStatus.WAITING_PRE_EXPLORATORY_CALCULATION
      || annualPlanning.status === AnnualPlanningStatus.CALCULATING_PRE_EXPLORATORY_VIEW);
  }

  @Confirmable('Atenção', 'Tem certeza que deseja excluir o planejamento anual ?', true)
  public deleteAnnualPlanning(annualPlanning: AnnualPlanningListItem): void {
    console.log('deleteAnnualPlanning', annualPlanning);
  }

  public testToast(): void {
    this.store.dispatch(new ToastActions.Success('Teste de toast', 'Teste de toast'));
  }
}

