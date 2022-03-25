export interface SmzEasyTableData { [key: string]: string };

export interface SmzEasyTableViewport {
  original: any[],
  allTableData: SmzEasyTableData[];
  paginator: Paginator
}

export interface Paginator {
  page: number;
  perPage: number;
  prePage: number;
  nextPage: number;
  total: number;
  totalPages: number;
  maxVisiblePages: number;
  showing: number;
  to: number;
  pages: {
    number: number;
    isCurrent: boolean;
    isVisible: boolean;
    showEllipsis: boolean;
  }[]
  data: SmzEasyTableData[];
}