import { SmzTableColumn, SmzTableContextColumn } from './table-column';

export interface SmzTableConfig {
  showCaption: boolean;
  showGlobalFilter: boolean;
  isSelectable: boolean;
  showActions: boolean;
  title: string;
  columns: SmzTableColumn[];
}

export interface SmzTableContext {
  globalFilter: string[];
  columns: SmzTableContextColumn[];
}