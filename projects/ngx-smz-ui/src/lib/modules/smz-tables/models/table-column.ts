import { SmzControlType } from 'ngx-smz-dialogs';

export interface SmzTableColumn {
  field: string;
  header: string;
  controlType: SmzControlType;
  isGlobalFilterable: boolean;
  showFilter: boolean;
  isOrderable: boolean;
}

export interface SmzTableContextColumn extends SmzTableColumn {
  isSimpleNamed: boolean;
}