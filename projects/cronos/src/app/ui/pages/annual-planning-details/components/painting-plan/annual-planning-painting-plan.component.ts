import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalInjector, NgxSmzTablesModule, RbkAccessControlModule, SmzDialogBuilder, SmzDialogsService, SmzTableComponent } from '@ngx-smz/core';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { UpdateTableStatePipe } from './update-table-state.pipe';
import { ButtonModule } from 'primeng/button';
import { ScenarioPaintingPlanSystemData } from '@models/scenario-painting-plan-system-data';
import { ClaimDefinitions } from '@models/claim-definitions';
import { Store } from '@ngxs/store';
import { AnnualPlanningsActions } from '@state/database/annual-plannings/annual-plannings.actions';
import { DownloadPaintingPlanForEnviron } from '@models/download-environ-spreadsheets';
import { EnvironSituation, EnvironSituationValues } from './situation-options';

@Component({
  selector: 'app-annual-planning-painting-plan',
  standalone: true,
  imports: [
    CommonModule,
    NgxSmzTablesModule,
    ButtonModule,
    UpdateTableStatePipe,
    RbkAccessControlModule
  ],
  template: `
  <ng-container *ngIf="annualPlanning.selectedPlan; else noSelectedPlan">
    <div>
      <smz-ui-table #smzTable class="w-full" [state]="annualPlanning | updateTableState">
        <ng-template pTemplate="caption" let-primeTable>
          <button pButton type="button" label="Plano de Pintura" icon="fa-solid fa-download" class="mr-2" severity="primary"
            [disabled]="!(manageAnnualPlanningClaim | rbkCanAccess)" (click)="downloadPaintingPlan(smzTable)">
          </button>
          <button pButton type="button" label="Plano para Environ" icon="fa-solid fa-download" class="mr-2" severity="primary"
            [disabled]="!(manageAnnualPlanningClaim | rbkCanAccess)" (click)="downloadPaintingPlanForEnviron()">
          </button>
        </ng-template>
      </smz-ui-table>
    </div>
  </ng-container>
  <ng-template #noSelectedPlan>
    <div class="relative h-[calc(100vh-205px)]">
      <div class="absolute inset-0">
        <div class="grid grid-nogutter flex-col items-center justify-center h-full">
          <i class="fa-solid fa-circle-info text-6xl"></i>
          <h4 class="font-bold mb-2">Nenhum plano de pintura foi eleito ainda</h4>
          <p class="text-lg">Eleja um cenário na aba contendo a lista de cenários</p>
        </div>
      </div>
    </div>
  </ng-template>
  `
})
export class AnnualPlanningPaintingPlanComponent {

  private readonly store = inject(Store);

  @Input() public annualPlanning: AnnualPlanningDetails;

  public manageAnnualPlanningClaim = ClaimDefinitions.MANAGE_ANNUAL_PLANNING;

  public downloadPaintingPlan(smzTable: SmzTableComponent): void {
    const itemsIds = smzTable.table.filteredValue?.map(column => column.id) ?? smzTable.table.value?.map((item: ScenarioPaintingPlanSystemData) => item.id);
    const columns = smzTable.selectedColumns.map(column => column.field);
    this.store.dispatch(new AnnualPlanningsActions.DownloadPaintingPlan(this.annualPlanning.id, itemsIds, columns));
  }

  public downloadPaintingPlanForEnviron(): void {
    const dialogs: SmzDialogsService = GlobalInjector.instance.get(SmzDialogsService);

    dialogs.open(new SmzDialogBuilder<{situationIds: number[]}>()
    .setTitle('Exportar dados para Environ')
    .closeOnEscape()
    .setLayout('EXTRA_LARGE', 'col-4')
    .setLayout('LARGE', 'col-4')
    .setLayout('MEDIUM', 'col-6')
    .setLayout('SMALL', 'col-8')
    .form()
      .group()
        .checkboxGroup('situation', 'Escolha pelo menos uma opção', EnvironSituationValues, EnvironSituationValues.map(x => x.id))
          .validators()
            .required()
            .input
        .group
        .form
      .dialog
    .buttons()
      .confirm()
        .callback(response => {
          const payload: DownloadPaintingPlanForEnviron = {
            annualPlanningId: this.annualPlanning.id,
            currentSituation: response.situationIds.includes(EnvironSituation.CURRENT_SITUATION),
            postPaintingSituation: response.situationIds.includes(EnvironSituation.POST_PAINTING_SITUATION)
          };

          this.store.dispatch(new AnnualPlanningsActions.DownloadPaintingPlanForEnviron(payload));
        })
        .buttons
      .dialog
    .build());
  }
}