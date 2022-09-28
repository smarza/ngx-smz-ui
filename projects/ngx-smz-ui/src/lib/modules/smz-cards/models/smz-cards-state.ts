import { Observable } from 'rxjs';
import { SmzCardsContentTypes } from './smz-cards-contents';
import { SmzCardsType } from './smz-cards-types';
export interface SmzCardsState<T> {
  items$: Observable<T[]>;
  isDebug: boolean;
  title: {
    isVisible: boolean;
    getText: () => string;
  };
  locale: SmzCardsLocale;

  columns: SmzCardsColumn[];

  types: {
    grid: SmzCardsType;
    list: SmzCardsType;
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