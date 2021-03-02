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
}

export interface SmzTableContext {
  columns: SmzTableContextColumn[];
  config: SmzTableConfig;
  fieldsToOverrideContent: string[];
  globalFilter: string[];
  useCustomContent: boolean;
}