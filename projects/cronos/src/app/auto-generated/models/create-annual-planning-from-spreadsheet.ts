import { AnnualPlanningPrivacy } from '@models/annual-planning-privacy';
import { DefaultCorrosionStandard } from '@models/default-corrosion-standard';

export interface CreateAnnualPlanningFromSpreadsheet {
  description: string;
  privacy: AnnualPlanningPrivacy;
  inspectionSpreadsheetData: string;
  rtiSpreadsheetData: string;
  standard: DefaultCorrosionStandard;
}
