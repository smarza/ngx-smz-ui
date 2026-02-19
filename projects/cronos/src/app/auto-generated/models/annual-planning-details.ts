import { SimpleNamedEntity } from '@ngx-smz/core';
import { AnnualPlanningPrivacy } from '@models/annual-planning-privacy';
import { AnnualPlanningStatus } from '@models/annual-planning-status';
import { InspectionEntity } from '@models/inspection-entity';
import { RtiInformation } from '@models/rti-information';
import { WeatherDataItem } from '@models/weather-data-item';
import { SummaryPanel } from '@models/summary-panel';
import { PreliminaryResultsData } from '@models/preliminary-results-data';
import { ScenarioListItem } from '@models/scenario-list-item';
import { ScenarioPaintingPlan } from '@models/scenario-painting-plan';
import { ScenarioProductivityData } from '@models/scenario-productivity-data';

export interface AnnualPlanningDetails {
  plant: SimpleNamedEntity;
  year: number;
  description: string;
  privacy: AnnualPlanningPrivacy;
  status: AnnualPlanningStatus;
  owner: string;
  inspectionData: InspectionEntity[];
  rtiData: RtiInformation[];
  weatherData: WeatherDataItem[];
  hasRtiData: boolean;
  hasWeatherData: boolean;
  isInspectionDataFromGiants: boolean;
  summaries: SummaryPanel[];
  preliminaryResults: PreliminaryResultsData;
  scenarios: ScenarioListItem[];
  selectedPlan: ScenarioPaintingPlan;
  defaultHidroblastLocations: string[];
  defaultProductivityData: ScenarioProductivityData;
  id: string;
}
