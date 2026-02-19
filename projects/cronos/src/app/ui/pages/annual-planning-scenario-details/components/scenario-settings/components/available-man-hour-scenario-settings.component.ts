/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenarioUpdateComponent } from '../scenario-update.component';
import { ScenarioDetails } from '@models/scenario-details';
import { Store } from '@ngxs/store';
import { ScenariosFtActions } from '@state/features/scenarios/scenarios.actions';
import { ButtonModule } from 'primeng/button';
import { StrategyFormData } from '../models/strategy-form-data';
import { AnnualPlanningsFtSelectors } from '@state/features/annual-plannings/annual-plannings.selectors';
import { Location } from '@angular/common';
import { AnnualPlanningStatus } from '@models/annual-planning-status';
import { Confirmable, RbkAccessControlModule } from '@ngx-smz/core';
import { UpdateScenarioWithAvailableManHourStrategy } from '@models/update-scenario-with-available-man-hour-strategy';
import { FixedTeamData } from '@models/fixed-team-data';
import { getAvailableManHourStrategyFormData } from '../forms/available-man-hour-strategy-form-data';
import { ToolbarModule } from 'primeng/toolbar';
import { ClaimDefinitions } from '@models/claim-definitions';
import { ScenarioStatusDescription } from '@models/scenario-status';

@Component({
  selector: 'app-available-man-hour-scenario-settings',
  standalone: true,
  imports: [CommonModule, ButtonModule, ScenarioUpdateComponent, ToolbarModule, RbkAccessControlModule],
  host: { class: '' },
  encapsulation: ViewEncapsulation.None,
  styleUrl: './scenario-settings.component.scss',
  templateUrl: './scenario-settings.component.html'
})
export class AvailableManHourScenarioSettingsComponent implements OnInit {
  private readonly store: Store = inject(Store);
  @Input() public scenario: ScenarioDetails;
  public general: UpdateScenarioWithAvailableManHourStrategy;
  public teams: FixedTeamData[];
  public formData: StrategyFormData<UpdateScenarioWithAvailableManHourStrategy, FixedTeamData>;
  public isEditing = false;
  public isValid = true;
  public hasRtiHidroblastCoverage = true;
  public manageAnnualPlanningClaim = ClaimDefinitions.MANAGE_ANNUAL_PLANNING;
  public scenarioStatusDescription = ScenarioStatusDescription;

  constructor(private readonly location: Location){}

  public ngOnInit(): void {
    this.defaultEditing();
  }

  public getGeneralData(general: UpdateScenarioWithAvailableManHourStrategy): void {
    this.general = general;
  }

  public getTeams(teams: FixedTeamData[]): void {
    this.teams = teams;
  }

  public enableEditing(): void {
    this.formData = null;
    setTimeout(() => {
      this.isEditing = true;
      const annualPlanning = this.store.selectSnapshot(AnnualPlanningsFtSelectors.getDetails);
      this.formData = getAvailableManHourStrategyFormData(this.scenario, annualPlanning, this.isEditing);
    }, 0);
  }

  @Confirmable('Tem certeza que deseja descartar as alterações?', 'Descartar alterações')
  public disableEditing(): void {
    this.defaultEditing();
  }

  public defaultEditing(): void {
    this.formData = null;
    setTimeout(() => {
      this.isEditing = false;
      const annualPlanning = this.store.selectSnapshot(AnnualPlanningsFtSelectors.getDetails);
      this.formData = getAvailableManHourStrategyFormData(this.scenario, annualPlanning, this.isEditing);
    }, 0);
  }

  public checkPlanningStatus(): boolean {
    return this.scenario.planningStatus === AnnualPlanningStatus.APPROVED;
  }

  public validateForm(isValid: boolean): void {
    this.isValid = isValid;
  }

  public updateScenario(): void {
    const payload: UpdateScenarioWithAvailableManHourStrategy = {
      ...this.general,
      scenarioId: this.scenario.id,
      teamData: this.teams,
    };

    if (this.scenario.isSelectedPlan) {
      this.confirmPlanRecalculation(payload);
    }
    else {
      this.confirmScenarioRecalculation(payload);
    }
  }

  @Confirmable('Este cenário é o atual plano eleito. Ao confirmar, o cenário será recalculado, todas as customizações do plano serão perdidas e o cenário deixará de ser o plano eleito.' +
    '<br><br> Tem certeza que deseja continuar?', 'Editar Plano Eleito', true)
  public confirmPlanRecalculation(payload: UpdateScenarioWithAvailableManHourStrategy): void {
    this.store.dispatch(new ScenariosFtActions.UpdateScenarioWithAvailableManHourStrategy(payload))
      .subscribe(() => this.location.back());
  }

  @Confirmable('Ao confirmar, este cenário será recalculado e o navegador redirecionará para a tela anterior.' +
      '<br><br> Tem certeza que deseja continuar?', 'Editar cenário', true)
  public confirmScenarioRecalculation(payload: UpdateScenarioWithAvailableManHourStrategy): void {
    this.store.dispatch(new ScenariosFtActions.UpdateScenarioWithAvailableManHourStrategy(payload))
      .subscribe(() => this.location.back());
  }
}
