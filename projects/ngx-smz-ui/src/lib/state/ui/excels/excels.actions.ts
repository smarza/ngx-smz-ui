import { SmzCreateExcelTable, SmzExcelsDetails } from '../../../modules/smz-excels/models/smz-excel-table';


export namespace ExcelsUiActions
{
    export class GenerateTable
    {
        public static readonly type = '[Excels API] Generate Table';
        constructor(public data: SmzCreateExcelTable) { }
    }

    export class GenerateTableSuccess
    {
        public static readonly type = '[Excels API] Generate Table Success';
        constructor(public data: SmzExcelsDetails) {}
    }

}
