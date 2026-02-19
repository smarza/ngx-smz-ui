import { Component, Input, OnInit, ViewChild, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngxs/store';
import { ANNUAL_PLANNING_SCENARIOS_COMPARISON_PAGE_ROUTE } from '@routes';
import { Navigate } from '@ngxs/router-plugin';
import { AnnualPlanningScenariosComparisonPageComponentRouteEvent } from '@pages/annual-planning-scenarios-comparison/annual-planning-scenarios-comparison-page.component';
import { AnnualPlanningsFtSelectors } from '@state/features/annual-plannings/annual-plannings.selectors';
import { Observable } from 'rxjs';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { Menu, MenuModule } from 'primeng/menu';
import { NgxSmzCardsModule, RbkAccessControlModule, SmzCardsBuilder, SmzCardsState, SmzMenuItem } from '@ngx-smz/core';
import { ScenarioListItem } from '@models/scenario-list-item';
import { ScenarioFrontCardComponent } from './components/scenario-front-card.component';
import { ScenarioBackCardComponent } from './components/scenario-back-card.component';
import { showCorrosionGoalScenarioCreationDialog } from '../scenario-creation/dialogs/show-corrosion-goal-scenario-creation-dialog';
import { showAvailableManHourScenarioCreationDialog } from '../scenario-creation/dialogs/show-available-man-hour-scenario-creation-dialog';
import { showCriticityScenarioCreationDialog } from '../scenario-creation/dialogs/show-criticity-scenario-creation-dialog';
import { showPrioritizationScenarioCreationDialog } from '../scenario-creation/dialogs/show-prioritization-scenario-creation-dialog';
import { showRtiScenarioCreationDialog } from '../scenario-creation/dialogs/show-rti-scenario-creation-dialog';
import { AnnualPlanningsFtActions } from '@state/features/annual-plannings/annual-plannings.actions';
import { AutoRefreshTableComponent } from '@components/auto-refresh-table.component';
import { TooltipModule } from 'primeng/tooltip';
import { ClaimDefinitions } from '@models/claim-definitions';

@Component({
  selector: 'app-annual-planning-scenarios',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MenuModule,
    NgxSmzCardsModule,
    AutoRefreshTableComponent,
    TooltipModule,
    RbkAccessControlModule
  ],
  template: `
  <div class="relative h-[calc(100vh-205px)]">
    @if (annualPlanning$ | async; as annualPlanning) {
      <div class="absolute inset-0">
        @if (annualPlanning.scenarios?.length > 0) {
          @if (state != null) {
            <smz-ui-cards [state]="state">
              <ng-template pTemplate="header" let-node>
                <app-auto-refresh-table [actions]="refreshActions" [manualActions]="manualActions"></app-auto-refresh-table>
                <p-menu #menu [model]="scenarioOptions" [popup]="true" appendTo="body" [style]="{'max-width': '170px'}"/>
                <p-button (onClick)="menu.toggle($event)" label="Novo Cenário" [disabled]="!(manageAnnualPlanningClaim | rbkCanAccess)" styleClass="text-lg" icon="fa-solid fa-plus"/>
                <button pButton icon="fa-solid fa-code-compare" class="p-button-primary"
                  label="Comparar ({{selectedScenarioIds().length}}/2)"
                  tooltip="Selecione dois cenários para comparar"
                  (click)="navigateToScenarioComparisonPageRoute()"
                  [disabled]="selectedScenarioIds().length !== 2 || !(manageAnnualPlanningClaim | rbkCanAccess)">
                </button>
              </ng-template>
            </smz-ui-cards>
          }
        } @else {
          <div class="grid grid-nogutter flex-col items-center justify-center h-full">
            <i class="fa-solid fa-circle-info text-6xl"></i>
            <h4 class="font-bold mb-2">Nenhum cenário disponível</h4>
            <p class="text-lg">Adicione um novo cenário para começar o planejamento</p>
            <p-menu #menu [model]="scenarioOptions" [popup]="true" appendTo="body" [style]="{'max-width': '170px'}"/>
            <p-button (onClick)="menu.toggle($event)" label="Novo Cenário" [disabled]="!(manageAnnualPlanningClaim | rbkCanAccess)" styleClass="text-lg" icon="fa-solid fa-plus"/>
          </div>
        }
      </div>
    }
  </div>
  `
})
export class AnnualPlanningScenariosComponent implements OnInit {
  private readonly store: Store = inject(Store);
  public readonly annualPlanning$: Observable<AnnualPlanningDetails> = this.store.select(AnnualPlanningsFtSelectors.getDetails);
  @Input() public annualPlanningId: string;
  @ViewChild('menu') public menu: Menu;
  public selectedScenarioIds: WritableSignal<string[]> = signal([]);
  public manageAnnualPlanningClaim = ClaimDefinitions.MANAGE_ANNUAL_PLANNING;
  public refreshActions;
  public manualActions;
  public scenarioOptions: SmzMenuItem[] = [{
    items: [
      { label: 'Meta de Corrosão', styleClass: 'text-lg', command: (): void => showCorrosionGoalScenarioCreationDialog(this.store) },
      { label: 'HH Disponível', styleClass: 'text-lg', command: (): void => showAvailableManHourScenarioCreationDialog(this.store) },
      { label: 'Criticidade', styleClass: 'text-lg', command: (): void => showCriticityScenarioCreationDialog(this.store) }
    ]
  }];

  public ngOnInit(): void {
    this.refreshActions = [new AnnualPlanningsFtActions.LoadAnnualPlanningScenariosSilent(this.annualPlanningId)];
    this.manualActions = [new AnnualPlanningsFtActions.LoadAnnualPlanningScenarios(this.annualPlanningId)];

    const annualPlanning = this.store.selectSnapshot(AnnualPlanningsFtSelectors.getDetails);

    if (annualPlanning.hasRtiData){
      this.scenarioOptions[0].items.push(
        { label: 'NdC E&P', styleClass: 'text-lg', command: (): void => showPrioritizationScenarioCreationDialog(this.store) },
        { label: 'RTI', styleClass: 'text-lg', command: (): void => showRtiScenarioCreationDialog(this.store) }
      );
    }
  }

  public state: SmzCardsState<ScenarioListItem> = new SmzCardsBuilder<ScenarioListItem>()
    .setSource(this.store.select(AnnualPlanningsFtSelectors.getScenarios))
    .setDataViewContainerStyles('')
    .template()
      .flipCard()
        .setCardSize('320px', '270px')
        .setCardStyles('')
        .setContentStyles('')
        .setToggleBehavior(2)
        .onChange((changes) => { this.selectedScenarioIds.set(changes.all.filter(x => x.status === 'back').map(x => x.key)); })
        .front()
          .component(ScenarioFrontCardComponent)
            .addDataToInput('data')
            .template
          .front
        .back()
          .component(ScenarioBackCardComponent)
            .addDataToInput('data')
            .template
          .back
        .template
      .cards
    .grid()
        .useAsDefault()
        .setLayout('')
        .setPadding('p-3')
      .cards
    .build();

  public navigateToScenarioComparisonPageRoute(): void {
    const params: AnnualPlanningScenariosComparisonPageComponentRouteEvent = { scenarioAId: this.selectedScenarioIds()[0], scenarioBId: this.selectedScenarioIds()[1] };
    this.store.dispatch(new Navigate([ ANNUAL_PLANNING_SCENARIOS_COMPARISON_PAGE_ROUTE.join('/'), params ]));
  }
}