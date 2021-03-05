import { MenuItem } from 'primeng/api';
import { SmzTableColumn, SmzTableContextColumn } from './table-column';

export interface SmzTableConfig {
  columns: SmzTableColumn[];
  currentPageReportTemplate?: string;
  isSelectable?: boolean;
  menu?: MenuItem[];
  rowHover?: boolean;
  rows?: number;
  rowsPerPageOptions?: number[];
  showActions?: boolean;
  showCaption?: boolean;
  showCurrentPageReport?: boolean;
  showGlobalFilter?: boolean;
  showPaginator?: boolean;
  title?: string;
  useCustomActions?: boolean;
  customActionWidth?: string;
  showClearFilter?: boolean;
  emptyMessage?: string;
  customEmptyMessage?: SmzCustomEmptyMessage;
  isRowClickable: boolean,
  rowClickCallback: (event) => void,

}

export interface SmzTableContext {
  columns: SmzTableContextColumn[];
  config: SmzTableConfig;
  globalFilter: string[];
}

export interface SmzCustomEmptyMessage {
  message?: string;
  callbackLabel?: string;
  callbackInfo?: string;
  callback?: () => void;
  image?: string;
}