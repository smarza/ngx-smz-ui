import { Observable } from 'rxjs';
import { SmzMenuItem } from '../../smz-menu/models/smz-menu-item';
import { SmzCardsTemplates } from './smz-cards-templates';
import { SmzAdvancedInjectable } from './smz-cards-component';

export interface SmzCardsState<T> {
  items$: Observable<T[]>;
  sources: SmzCardsSource<T>[]
  selectedSource: SmzCardsSource<T>;
  isDebug: boolean;
  title: {
    isVisible: boolean;
    getText: () => string;
  };
  locale: SmzCardsLocale;
  template: SmzCardsTemplates<T>;
  grid: SmzCardView;
  list: SmzCardView;
  buttons: SmzCardActions<T>;
  menu: SmzCardActions<T>;
  view: {
    rowsPerPage: number;
    paginator: boolean;
    showGlobalFilter: boolean;
    showLayoutOptions: boolean;
    filterBy: string;
    layout: 'grid' | 'list';
    showHeader: boolean;
    dataViewContentStyles: string;
    dataViewStyleClass: string;
    gridStyleClass: string;
    emptyMessageType: 'html' | 'component';
    emptyMessageComponent?: SmzAdvancedInjectable;
  }
}

export interface SmzCardsSource<T> {
  isDefault: boolean;
  label: string;
  items$: Observable<T[]>;
}

export interface SmzCardActions<T> {
  callback: (row: T) => SmzMenuItem[];
  styleClass: string;
  buttonClass: string;
  icon: string;
}

export interface SmzCardView {
  isVisible: boolean;
  styleClass: {
    all: string;
    layout: string;
    padding: string;
    general: string;
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