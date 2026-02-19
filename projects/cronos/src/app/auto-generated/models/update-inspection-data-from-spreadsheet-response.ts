import { AnnualPlanningDetails } from '@models/annual-planning-details';

export interface UpdateInspectionDataFromSpreadsheetResponse {
  errors: string[];
  annualPlanning: AnnualPlanningDetails;
}
