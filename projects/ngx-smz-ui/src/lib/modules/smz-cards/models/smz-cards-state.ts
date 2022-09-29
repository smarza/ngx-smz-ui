import { Observable } from 'rxjs';
import { SmzMenuItem } from '../../smz-menu/models/smz-menu-item';
import { SmzCardsContentTypes } from './smz-cards-contents';
import { SmzCardsType } from './smz-cards-types';
import { SmzCardsTypes } from './types/smz-cards-types';
export interface SmzCardsState<T> {
  items$: Observable<T[]>;
  isDebug: boolean;
  title: {
    isVisible: boolean;
    getText: () => string;
  };
  locale: SmzCardsLocale;
  columns: SmzCardsColumn[];
  grid: {
    type: SmzCardsType;
    config: SmzCardsTypes;
  }
  list: {
    type: SmzCardsType;
    config: SmzCardsTypes;
  }
  menu: {
    callback: (row: T) => SmzMenuItem[];
    styleClass: string;
    buttonClass: string;
    icon: string;
  }
  view: {
    rowsPerPage: number;
    paginator: boolean;
    showGlobalFilter: boolean;
    filterBy: string;
  }
}

export interface SmzCardsLocale {
  code: 'pt-BR' | 'en-US';
  globalSearch: {
    placeholder: string;
  };
  paginator: {
    next: string;
    previous: string;
    showing: string;
    to: string;
    of: string;
    results: string;
  };
  emptyMessage: string;
}

export interface SmzCardsColumn {
  key: string; // mesma key do header
  isVisible: boolean;
  styleClass: string;
  content: SmzCardsContentTypes;

}