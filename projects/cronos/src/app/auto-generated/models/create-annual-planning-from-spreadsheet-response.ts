import { AnnualPlanningListItem } from '@models/annual-planning-list-item';

export interface CreateAnnualPlanningFromSpreadsheetResponse {
  errors: string[];
  annualPlanning: AnnualPlanningListItem;
}
