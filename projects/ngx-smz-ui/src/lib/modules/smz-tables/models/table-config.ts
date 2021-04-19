import { SmzMenuItem } from './conditional-menu-item';
import { SmzTableColumn, SmzTableContextColumn } from './table-column';

export interface SmzTableConfig {
  clearFilterCallback?: () => void,
  clearFilterLabel?: string;
  columns: SmzTableColumn[];
  currentPageReportTemplate?: string;
  customActionWidth?: string;
  customEmptyMessage?: SmzCustomEmptyMessage;
  emptyMessage?: string;
  isRowClickable?: boolean,
  isSelectable?: boolean;
  menu?: SmzMenuItem[];
  multiSortMeta?: { field: string, order: 1 | -1 }[];
  rowClickCallback?: (event) => void,
  rowHover?: boolean;
  rows?: number;
  rowsPerPageOptions?: number[];
  selectBoxWidth?: string;
  showActions?: boolean;
  showCaption?: boolean;
  showClearFilter?: boolean;
  showColumnVisibility? : boolean;
  showCurrentPageReport?: boolean;
  showGlobalFilter?: boolean;
  showPaginator?: boolean;
  sortField?: string;
  sortMode?: 'single' | 'multiple';
  sortOrder?: 1 | -1;
  title?: string;
  toolbarAlignment?: 'start' | 'end';
  useCustomActions?: boolean;

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