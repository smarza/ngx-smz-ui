import { SmzControlType } from 'ngx-smz-dialogs';

export interface SmzTableColumn {
  contentType: SmzControlType;
  field: string;
  filterControlType?: SmzControlType;
  header: string;
  isGlobalFilterable?: boolean;
  isOrderable?: boolean;
  isSimpleNamed: boolean;
  overrideContent?: boolean;
  showFilter?: boolean;
  width?: string;
}

export interface SmzTableContextColumn extends SmzTableColumn {

}