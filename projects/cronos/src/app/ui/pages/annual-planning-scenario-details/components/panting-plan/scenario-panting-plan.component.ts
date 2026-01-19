import { AvailableSystemPipe } from './pipes/available-system-pipe';
import { BehaviorSubject } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { cloneDeep } from 'lodash-es';
import { CommonModule, Location } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, inject, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { ComputeTeamManHoursUsedPipe } from './pipes/compute-team-man-hours-used.pipe';
import { Confirmable, nameof, NgVarModule, NgxSmzTablesModule, RbkAccessControlModule, SimpleNamedEntity, SmzFilterType, SmzGaugeBuilder, SmzGaugeComponent,
  SmzGaugeState, SmzMenuBuilder, SmzTableBuilder, SmzTableState, ToastActions } from '@ngx-smz/core';
import { NgPipesModule } from 'ngx-pipes';
import { ScenarioDetails } from '@models/scenario-details';
import { ScenariosFtActions } from '@state/features/scenarios/scenarios.actions';
import { ScenarioSystemResults } from '@models/scenario-system-results';
import { Store } from '@ngxs/store';
import { SystemByTeamPipe } from './pipes/system-by-team-pipe';
import { SystemPostOptimization } from '@models/system-post-optimization';
import { ToolbarModule } from 'primeng/toolbar';
import { UpdateScenarioPostOptimization } from '@models/update-scenario-post-optimization';
import { UiTeam } from './models/ui-team';
import { ClaimDefinitions } from '@models/claim-definitions';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-scenario-panting-plan',
  standalone: true,
  imports: [
    CommonModule,
    NgxSmzTablesModule,
    NgVarModule,
    NgPipesModule,
    ToolbarModule,
    ButtonModule,
    // AvailableSystemPipe,
    // SystemByTeamPipe,
    // ComputeTeamManHoursUsedPipe,
    // SmzGaugeComponent,
    RbkAccessControlModule,
    TooltipModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: '' },
  templateUrl: './scenario-panting-plan.component.html',
  styleUrls: ['./scenario-panting-plan.component.scss']
})
export class ScenarioPaintingPlanComponent implements OnChanges {
  public readonly changeDetectorRef = inject(ChangeDetectorRef);
  public readonly store = inject(Store);
  public readonly location = inject(Location);
  @Input() public scenario: ScenarioDetails;
  public originalScenario: ScenarioDetails;
  public editingScenario: ScenarioDetails;
  public isEditing = false;
  public allowEditing = true;
  public uiTeams: UiTeam[];
  public availableSystemTableState: SmzTableState;
  public manageAnnualPlanningClaim = ClaimDefinitions.MANAGE_ANNUAL_PLANNING;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['scenario']) {
      this.disableEditing();
    }
  }

  public getGaugeState(value: BehaviorSubject<number>, minimumValue: number, maximumValue: number, unit: string): SmzGaugeState {
    return new SmzGaugeBuilder()
      .withSize(150)
      .withTitleStyle('font-bold text-2xl')
      .withValue(value)
      .withValueThrottleTime(300)
      .withDecimalPlaces(1, false)
      .withRange(minimumValue, maximumValue)
      .withUnit(unit)
      .withBackgroundColor('#e6e6e6')
      .withFont('bold', '#000000')
      .withMinMaxFont('bold', '#000000')
      .addThreshold()
        .withValue(minimumValue)
        .withColor('#00FF00')
        .gauge
      .addThreshold()
        .withValue(maximumValue)
        .withColor('#FF0000')
        .gauge
      .build();
  }

  public removeSystemFromTeam(item: ScenarioSystemResults): void {
    const system = this.editingScenario.results.systems.find(x => x.id === item.id);
    system.team = null;
    this.refreshEditingScenario();

    this.store.dispatch(new ToastActions.Success('Sistema removido da equipe'));
  }

  public removeSectorFromTeam(item: ScenarioSystemResults): void {
    this.editingScenario.results.systems
      .filter(system => system.module === item.module && system.sector === item.sector)
      .forEach(system => {
        system.team = null;
      });

    this.refreshEditingScenario();

    this.store.dispatch(new ToastActions.Success('Setor removido da equipe'));
  }

  public moveSystemToTeam(item: ScenarioSystemResults, toTeam: SimpleNamedEntity): void {
    const system = this.editingScenario.results.systems.find(x => x.id === item.id);
    system.team = toTeam;
    this.refreshEditingScenario();

    this.store.dispatch(new ToastActions.Success('Sistema enviado para a equipe'));
  }

  public moveSectorToTeam(item: ScenarioSystemResults, toTeam: SimpleNamedEntity): void {
    this.editingScenario.results.systems
      .filter(system => system.module === item.module && system.sector === item.sector && system.manHours > 0)
      .forEach(system => {
        system.team = toTeam;
      });

    this.refreshEditingScenario();

    this.store.dispatch(new ToastActions.Success('Setor enviado para a equipe'));
  }

  public beginEditing(): void {
    this.availableSystemTableState = this.getAvailableSystemTableState(true);
    this.updateTeamSummary(true);
    this.isEditing = true;
  }

  public updateTeamSummary(allowEditing: boolean): void {
    this.uiTeams = this.editingScenario.teams.map(team => {
      const manHoursUsed = new BehaviorSubject<number>(0);
      return {
        team,
        tableState: this.getTeamTableState(team, allowEditing),
        manHoursUsed,
        gaugeState: this.getGaugeState(manHoursUsed, team.minimumManHours, team.maximumManHours, ' hh'),
        isBellowMinimum: false,
        isAboveMaximum: false
      };
    });
  }

  public refreshEditingScenario(): void {
    this.editingScenario.results.systems = [...this.editingScenario.results.systems];
    this.changeDetectorRef.markForCheck();
  }

  public disableEditing(): void {
    this.originalScenario = cloneDeep(this.scenario);
    this.editingScenario = cloneDeep(this.originalScenario);

    this.availableSystemTableState = this.getAvailableSystemTableState(false);

    this.updateTeamSummary(false);
    this.isEditing = false;

    this.changeDetectorRef.markForCheck();
  }

  public resetTeamSystems(team: SimpleNamedEntity): void {
    const systems = this.editingScenario.results.systems.filter(system => system.team?.id === team.id);

    if (systems.length === 0) {
      this.store.dispatch(new ToastActions.Warning(`Nenhum sistema para a equipe '${team.name}'`));
      return;
    }

    systems.forEach(system => system.team = null);
    this.refreshEditingScenario();

    this.store.dispatch(new ToastActions.Success(`Sistemas resetados para a equipe '${team.name}'`));
  }

  @Confirmable('Deseja cancelar as alterações? Qualquer alteração não salva será perdida.', 'Cancelar')
  public cancelEditing(): void {
    this.disableEditing();
  }

  public save(): void {
    const systemPostOptimizationData: SystemPostOptimization[] = [];

    this.editingScenario.results.systems
      .filter(system => system.team != null)
      .forEach(system => {
        systemPostOptimizationData.push({ teamId: system.team.id, system: system.id });
      });

    const payload: UpdateScenarioPostOptimization = {
      scenarioId: this.editingScenario.id,
      systemPostOptimizationData: systemPostOptimizationData
    };

    if (this.scenario.isSelectedPlan) {
      this.confirmPlanRecalculation(payload);
    }
    else {
      this.confirmScenarioRecalculation(payload);
    }

    this.refreshEditingScenario();
  }

  @Confirmable('Este cenário é o atual plano eleito. Após entrar em cálculo de pós-otimização, todas as customizações do plano serão perdidas e o cenário deixará de ser o plano eleito.' +
    '<br><br> Tem certeza que deseja continuar?', 'Salvar Alterações', true)
  public confirmPlanRecalculation(payload: UpdateScenarioPostOptimization): void {
    this.store.dispatch(new ScenariosFtActions.UpdateScenarioPostOptimization(payload))
      .subscribe(() => this.location.back());
  }

  @Confirmable('Após confirmar, o cenário entrará em cálculo de pós-otimização e todas as customizações do plano serão perdidas.' +
    '<br><br> Tem certeza que deseja continuar?', 'Salvar Alterações', true)
  public confirmScenarioRecalculation(payload: UpdateScenarioPostOptimization): void {
    this.store.dispatch(new ScenariosFtActions.UpdateScenarioPostOptimization(payload))
      .subscribe(() => this.location.back());
  }

  public getAvailableSystemTableState(allowEditing: boolean): SmzTableState {
    return new SmzTableBuilder<ScenarioSystemResults>()
    .enableClearFilters()
    .setSize('small')
    .useStrippedStyle()
    .usePagination()
    .setPaginationDefaultRows(15)
    .setPaginationPageOptions([15, 50])
    .setPaginatorTemplate('')
    .useTableEmptyMessage()
    .setEmptyFeedbackMessage('Nenhum sistema disponível')
    .if(allowEditing)
      .dynamicMenu(() => (
        new SmzMenuBuilder()
        .for(this.uiTeams, (_each, system: ScenarioSystemResults) =>
          _each
            .item(`Enviar para ${system.team.name}`, 'fa-solid fa-right-to-bracket')
              .setCallback((item: ScenarioSystemResults) => this.moveSystemToTeam(item, system.team))
              .setActivationRule((item: ScenarioSystemResults) => item.manHours === 0)
              .menu
            .item(`Enviar Setor para ${system.team.name}`, 'fa-solid fa-right-to-bracket')
              .setCallback((item: ScenarioSystemResults) => this.moveSectorToTeam(item, system.team))
              .setActivationRule((item: ScenarioSystemResults) => item.manHours === 0)
              .menu
            .separator()
        )
        .build()))
        .endIf
    .columns()
      .text(nameof<ScenarioSystemResults>('sectorDisplayName'), 'Localização', '10em')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns
      .text(nameof<ScenarioSystemResults>('system'), 'Sistema')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .addStyles('font-bold')
        .actions()
          .add('fa-solid fa-circle-exclamation', (item: ScenarioSystemResults) => `${item.hidroblastCenter}`)
            .condition(item => this.scenario.considerProximity && item.manHours > 0 && item.hidroblastCenter === null)
            .setStyleClass('text-red-500')
            .setTooltip(() => 'Este sistema não está contemplado por hidrojatos selecionados para a simulação.')
            .action
          .add('fa-solid fa-circle-check', (item: ScenarioSystemResults) => `${item.hidroblastCenter}`)
            .condition(item => this.scenario.considerProximity && item.manHours > 0 && item.hidroblastCenter != null)
            .setStyleClass('text-green-500')
            .setTooltip((item: ScenarioSystemResults) => `Este sistema está contemplado pelo hidrojato: ${item.hidroblastCenter}.`)
            .action
          .add('fa-solid fa-circle-exclamation', (item: ScenarioSystemResults) => `${item.hidroblastCenter}`)
            .condition(item => item.manHours === 0)
            .setStyleClass('text-yellow-500')
            .setTooltip(() => 'Este sistema não possui corrosão computada.')
            .action
          .column
        .columns
      .dataTransform(nameof<ScenarioSystemResults>('manHours'), 'Horas de Pintura', (manHours: number) => manHours > 0 ? `${manHours.toFixed(3)} hh` : '-', '12em')
        .addStyles('text-sm')
        .setFilter(SmzFilterType.NUMERIC)
        .overrideSort(nameof<ScenarioSystemResults>('manHours'))
        .columns
      .table
    .build();
  }

  public getTeamTableState(team: SimpleNamedEntity, allowEditing: boolean): SmzTableState {
    return new SmzTableBuilder<ScenarioSystemResults>()
      .enableClearFilters()
      .setSize('small')
      .useStrippedStyle()
      .usePagination()
      .setPaginationDefaultRows(15)
      .setPaginationPageOptions([15, 50])
      .setPaginatorTemplate('')
      .useTableEmptyMessage()
      .setEmptyFeedbackMessage('Nenhum sistema para esta equipe')
      .if(allowEditing)
        .menu()
            .for(this.editingScenario.teams, (_each, toTeam: SimpleNamedEntity) =>
              _each
                .if(toTeam.id !== team.id)
                  .item(`Enviar Sistema para ${toTeam.name}`, 'fa-solid fa-right-to-bracket')
                    .setCallback((item: ScenarioSystemResults) => this.moveSystemToTeam(item, toTeam))
                    .menu
                  .item(`Enviar Setor para ${toTeam.name}`, 'fa-solid fa-right-to-bracket')
                    .setCallback((item: ScenarioSystemResults) => this.moveSectorToTeam(item, toTeam))
                    .menu
                  .separator()
                .endIf)
            .item('Remover', 'fa-solid fa-trash')
              .setCallback((item: ScenarioSystemResults) => this.removeSystemFromTeam(item))
              .menu
            .item('Remover Setor', 'fa-solid fa-trash')
              .setCallback((item: ScenarioSystemResults) => this.removeSectorFromTeam(item))
              .menu
          .table
        .buttons()
          .add('Resetar', () => this.resetTeamSystems(team))
            .setIcon('fa-solid fa-rotate-left')
            .setTooltip(() => `Resetar os sistemas para a equipe '${team.name}'`)
            .buttons
          .table
        .endIf
      .columns()
        .text(nameof<ScenarioSystemResults>('sectorDisplayName'), 'Localização', '10em')
          .setFilter(SmzFilterType.MULTI_SELECT_STRING)
          .columns
        .text(nameof<ScenarioSystemResults>('system'), 'Sistema')
          .setFilter(SmzFilterType.MULTI_SELECT_STRING)
          .addStyles('font-bold')
          .actions()
            .add('fa-solid fa-circle-exclamation', (item: ScenarioSystemResults) => `${item.hidroblastCenter}`)
              .condition(item => this.scenario.considerProximity && item.hidroblastCenter === null)
              .setStyleClass('text-red-500')
              .setTooltip(() => 'Este sistema não está contemplado por hidrojatos selecionados para a simulação.')
              .action
            .add('fa-solid fa-circle-check', (item: ScenarioSystemResults) => `${item.hidroblastCenter}`)
              .condition(item => this.scenario.considerProximity && item.hidroblastCenter != null)
              .setStyleClass('text-green-500')
              .setTooltip((item: ScenarioSystemResults) => `Este sistema está contemplado pelo hidrojato: ${item.hidroblastCenter}.`)
              .action
            .column
          .columns
        .dataTransform(nameof<ScenarioSystemResults>('manHours'), 'Horas de Pintura', (manHours: number) => manHours > 0 ? `${manHours.toFixed(3)} hh` : '-', '12em')
          .addStyles('text-sm')
          .setFilter(SmzFilterType.NUMERIC)
          .overrideSort(nameof<ScenarioSystemResults>('manHours'))
          .columns
        .table
      .build();
  }

}