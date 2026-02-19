import { Selector } from '@ngxs/store';
import { InspectionEntity } from '@models/inspection-entity';
import { AnnualPlanningsFtState, AnnualPlanningsFtStateModel } from './annual-plannings.state';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { RtiInformation } from '@models/rti-information';
import { ScenarioListItem } from '@models/scenario-list-item';
import { ScenarioPaintingPlanSystemData } from '@models/scenario-painting-plan-system-data';
import { InspectionSpreadsheetParseErrors } from '@models/inspection-spreadsheet-parse-errors';
import { WeatherDataItem } from '@models/weather-data-item';
import { AnnualPlanningHistory } from '@models/annual-planning-history';

export class AnnualPlanningsFtSelectors {
  @Selector([AnnualPlanningsFtState])
  public static getDetails(state: AnnualPlanningsFtStateModel): AnnualPlanningDetails {
    return state.item;
  }

  @Selector([AnnualPlanningsFtState])
  public static getScenarios(state: AnnualPlanningsFtStateModel): ScenarioListItem[] {
    return state.item.scenarios;
  }

  @Selector([AnnualPlanningsFtState])
  public static getPaintingPlanSystemData(state: AnnualPlanningsFtStateModel): ScenarioPaintingPlanSystemData[] {
    return state.item.selectedPlan.systemData;
  }

  @Selector([AnnualPlanningsFtState])
  public static shouldConsiderProximity(state: AnnualPlanningsFtStateModel): boolean {
    return state.item.selectedPlan.considerProximity;
  }

  @Selector([AnnualPlanningsFtState])
  public static getInspectionData(state: AnnualPlanningsFtStateModel): InspectionEntity[] {
    return state.item.inspectionData;
  }

  @Selector([AnnualPlanningsFtState])
  public static getRtiData(state: AnnualPlanningsFtStateModel): RtiInformation[] {
    return state.item.rtiData;
  }

  @Selector([AnnualPlanningsFtState])
  public static hasWeatherDataErrors(state: AnnualPlanningsFtStateModel): boolean {
    return state.item.weatherData.filter(x => x.details.errorMessage?.length > 0)?.length > 0;
  }

  @Selector([AnnualPlanningsFtState])
  public static getWeatherData(state: AnnualPlanningsFtStateModel): WeatherDataItem[] {
    return state.item.weatherData;
  }

  @Selector([AnnualPlanningsFtState])
  public static errors(state: AnnualPlanningsFtStateModel): InspectionSpreadsheetParseErrors[] {
    return state.errors.map<InspectionSpreadsheetParseErrors>(x => ({ error: x }));
  }

  @Selector([AnnualPlanningsFtState])
  public static history(state: AnnualPlanningsFtStateModel): AnnualPlanningHistory[] {
    return state.history;
  }

}
