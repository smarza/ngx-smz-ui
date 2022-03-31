import { SmzEasyLocale } from './smz-easy-locale';
import { SmzEasyTableContentTypes } from './smz-easy-table-contents';

export interface SmzEasyTableState {
  isDebug: boolean;
  title: string;
  emptyMessage: string;
  desktop: SmzEasyDesktopTable;
  mobile: SmzEasyMobileTable;
  paginator: SmzEasyPaginator;
  locale: SmzEasyLocale;

}

export interface SmzEasyDesktopTable {
  enabled: boolean;
  containerStyleClass: string;
  tableStyleClass: string;
  layout: 'fixed' | 'auto';
  head: SmzEasyTableHead;
  body: SmzEasyTableBody;
}

export interface SmzEasyMobileTable {
  enabled: boolean;
  head: SmzEasyTableHead;
  body: SmzEasyTableBody;
}

export interface SmzEasyTableHead {
  styleClass: string;
  headers: SmzEasyTableHeader[];
  sortMode: 'single' | 'multiple';
}

export interface SmzEasyTableHeader {
  label: string;
  widthClass: string;
  styleClass: string;
  sort: {
    isActive: boolean;
    order: -1 | 1;
    dataPath: string;
  }
}

export interface SmzEasyTableBody {
  styleClass: string;
  evenRow: {
    styleClass: string;
  },
  oddRow: {
    styleClass: string;
  },
  columns: SmzEasyTableBodyColumn[];
}

export interface SmzEasyTableBodyColumn {
  styleClass: string;
  key: string;
  content: SmzEasyTableContentTypes;

}

export interface SmzEasyPaginator {
  itemsPerPage: number;
  maxVisiblePages: number;
}