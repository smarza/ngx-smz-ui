import { SmzEasyTableContentTypes } from './smz-easy-table-contents';

export interface SmzEasyTableState {
  title: string;
  desktop: SmzEasyDesktopTable;
  mobile: SmzEasyMobileTable;

}

export interface SmzEasyDesktopTable {
  enabled: boolean;
  containerStyleClass: string;
  tableStyleClass: string;
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
  content: SmzEasyTableContentTypes;
}