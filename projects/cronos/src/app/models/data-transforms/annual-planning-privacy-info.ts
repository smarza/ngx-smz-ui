import { AnnualPlanningPrivacy, AnnualPlanningPrivacyDescription } from '@models/annual-planning-privacy';

export class AnnualPlanningPrivacyInfo {

  constructor(private privacy: AnnualPlanningPrivacy) {

  }

  public getString(): string {
    if (this.privacy == null) {
      return '';
    }

    return AnnualPlanningPrivacyDescription[this.privacy];
  }
}
