import { AnnualPlanningPrivacy } from '@models/annual-planning-privacy';

export interface CreateAnnualPlanningFromGiants {
  giantsInspectionId: string;
  plantName: string;
  inspectionYear: number;
  description: string;
  privacy: AnnualPlanningPrivacy;
  rtiSpreadsheetData: string;
}
