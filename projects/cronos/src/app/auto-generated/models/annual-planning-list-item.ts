import { SimpleNamedEntity } from '@ngx-smz/core';
import { AnnualPlanningPrivacy } from '@models/annual-planning-privacy';
import { AnnualPlanningStatus } from '@models/annual-planning-status';

export interface AnnualPlanningListItem {
  plant: SimpleNamedEntity;
  year: number;
  creationDate: Date;
  description: string;
  privacy: AnnualPlanningPrivacy;
  status: AnnualPlanningStatus;
  owner: string;
  hasRtiData: boolean;
  hasWeatherData: boolean;
  isInspectionDataFromGiants: boolean;
  id: string;
}
