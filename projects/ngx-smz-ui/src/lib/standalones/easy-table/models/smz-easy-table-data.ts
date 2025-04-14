export interface SmzEasyTableData { [key: string]: string };

export interface SmzEasyTableViewport {
  original: any[], // Array original recebido do projeto
  allTableData: SmzEasyTableData[]; // Array original convertido para formato da tabela
  tableData: SmzEasyTableData[]; // Array contendo apenas os elementos convertidos que estarão disponíveis para paginar
  search: {
    globalSearchData: GlobalSearchData[]; // Array otimizado para uso em busca global
    searchValue?: string;
  }

  paginator: Paginator;
}

export interface GlobalSearchData {
  id: string;
  searchData: string;
  item: SmzEasyTableData;
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