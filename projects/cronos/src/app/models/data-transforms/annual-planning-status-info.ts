import { AnnualPlanningStatus, AnnualPlanningStatusDescription } from '@models/annual-planning-status';

const AnnualPlanningStatusBackgroundClass: { [key in AnnualPlanningStatus]: string } = {
  [AnnualPlanningStatus.DRAFT]: 'bg-gray-100',
  [AnnualPlanningStatus.WAITING_PRE_EXPLORATORY_CALCULATION]: 'bg-blue-100',
  [AnnualPlanningStatus.CALCULATING_PRE_EXPLORATORY_VIEW]: 'bg-yellow-200',
  [AnnualPlanningStatus.PRE_EXPLORATORY_VIEW_CALCULATION_SUCCEEDED]: 'bg-green-100',
  [AnnualPlanningStatus.PRE_EXPLORATORY_VIEW_CALCULATION_FAILED]: 'bg-red-100',
  [AnnualPlanningStatus.APPROVED]: 'bg-green-200',
};


export class AnnualPlanningStatusInfo {

  constructor(private status: AnnualPlanningStatus) {

  }

  public getHtml(): string {
    if (this.status == null) {
      return '';
    }

    return `
    <div class="px-3 py-1 rounded-md ${AnnualPlanningStatusBackgroundClass[this.status]} text-black">
      ${AnnualPlanningStatusDescription[this.status]}
    </div>
    `;
  }

  public getString(): string {
    return AnnualPlanningStatusDescription[this.status] ?? '';
  }
}
