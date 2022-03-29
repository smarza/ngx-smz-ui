import { SmzEasyTableContentTypes } from './smz-easy-table-contents';

export interface SmzEasyTableState {
  title: string;
  emptyMessage: string;
  desktop: SmzEasyDesktopTable;
  mobile: SmzEasyMobileTable;
  paginator: SmzEasyPaginator;

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
}

export interface SmzEasyTableHeader {
  label: string;
  widthClass: string;
  styleClass: string;
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
  labels: {
    next: string;
    previous: string;
    showing: string;
    to: string;
    of: string;
    results: string;
  }
}