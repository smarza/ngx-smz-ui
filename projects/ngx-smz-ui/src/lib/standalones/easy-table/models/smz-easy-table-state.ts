import { SmzEasyLocale } from './smz-easy-locale';
import { SmzEasyTableContentTypes } from './smz-easy-table-contents';
import { interval } from 'rxjs';

export interface SmzEasyTableState {
  isDebug: boolean;
  title: {
    isVisible: boolean;
    getText: () => string;
  };
  desktop: SmzEasyDesktopTable;
  mobile: SmzEasyMobileTable;
  paginator: SmzEasyPaginator;
  locale: SmzEasyLocale;
  globalSearch: {
    isEnabled: boolean;
    isOptimized: boolean;
    interval: number; // Tempo de configuração para processar novas pesquisas.
    incrementPercentage: number; // Percentagem do último tempo em ms levado para executar a pesquisa global.
  }
  config: {
    dataIdProperty: string;
    throttle: {
      isEnabled: boolean; // Se habilitado, a tabela nunca permitirá dados novos antes que o anterior seja processado, evitando lentidão do data source.
      method: 'auto' | 'fixed'; // Automático ou Fixo
      interval: number; // Tempo de configuração para processar novos dados.
      incrementPercentage: number; // Percentagem do último tempo em ms levado para executar o dado.
    }
  }

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
  visibleCount: number;
  headers: SmzEasyTableHeader[];
  sortMode: 'single' | 'multiple';
}

export interface SmzEasyTableHeader {
  key: string; // mesma key da column
  isVisible: boolean;
  label: string;
  widthClass: string;
  styleClass: string;
  sort: {
    isActive: boolean;
    order: -1 | 1;
  }
  searchPath: string;
  sortPath: string;
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
  key: string; // mesma key do header
  isVisible: boolean;
  styleClass: string;
  content: SmzEasyTableContentTypes;

}

export interface SmzEasyPaginator {
  itemsPerPage: number;
  maxVisiblePages: number;
  isVisible: boolean;
  showResults: boolean;
}