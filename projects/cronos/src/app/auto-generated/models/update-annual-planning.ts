import { AnnualPlanningPrivacy } from '@models/annual-planning-privacy';

export interface UpdateAnnualPlanning {
  description: string;
  privacy: AnnualPlanningPrivacy;
  annualPlanningId: string;
}
