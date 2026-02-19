import { CalculatePreliminaryResults as CalculatePreliminaryResultsDto } from '@models/calculate-preliminary-results';
import { CreateAnnualPlanningFromGiants } from '@models/create-annual-planning-from-giants';
import { CreateAnnualPlanningFromSpreadsheet } from '@models/create-annual-planning-from-spreadsheet';
import { UpdateAnnualPlanning } from '@models/update-annual-planning';
import { DownloadPaintingPlanForEnviron as DownloadPaintingPlanForEnvironDto } from '@models/download-environ-spreadsheets';

export namespace AnnualPlanningsActions {
  export class LoadAll {
    public static readonly type = '[AnnualPlannings API] LoadAll';
  }

  export class LoadAllSilent {
    public static readonly type = '[AnnualPlannings API] LoadAllSilent';
  }

  export class CreateFromGiants {
    public static readonly type = '[AnnualPlannings API] Create From Giants';

    constructor(public data: CreateAnnualPlanningFromGiants) {}
  }

  export class CreateFromSpreadsheet {
    public static readonly type = '[AnnualPlannings API] Create From Spreadsheet';

    constructor(public data: CreateAnnualPlanningFromSpreadsheet) {}
  }

  export class Update {
    public static readonly type = '[AnnualPlannings API] Update';

    constructor(public data: UpdateAnnualPlanning) {}
  }

  export class Delete {
    public static readonly type = '[AnnualPlannings API] Delete';

    constructor(public id: string) {}
  }

  export class DownloadRtiData {
    public static readonly type = '[AnnualPlannings API] Download Rti Data';

    constructor(public annualPlanningId: string, public outputType: string) {}
  }

  export class DownloadInspectionData {
    public static readonly type = '[AnnualPlannings API] Download Inspection Data';

    constructor(public annualPlanningId: string, public outputType: string) {}
  }

  export class DownloadPaintingPlan {
    public static readonly type = '[AnnualPlannings API] Download Painting Plan';

    constructor(public annualPlanningId: string, public systemIds: string[], public selectedColumns: string[]) {}
  }

  export class DownloadPaintingPlanForEnviron {
    public static readonly type = '[AnnualPlannings API] Download Painting Plan For Environ';

    constructor(public data: DownloadPaintingPlanForEnvironDto) {}
  }

  export class CalculatePreliminaryResults {
    public static readonly type = '[AnnualPlannings API] Calculate Preliminary Results';

    constructor(public data: CalculatePreliminaryResultsDto) {}
  }

  export class Clear {
    public static readonly type = '[AnnualPlannings API] Clear';
  }
}
