import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { SmzCardsState } from '../../modules/smz-cards/models/smz-cards-state';
import { SmzCardsMenuBuilder } from './menu-builder';
import { Observable } from 'rxjs';
import { SmzCardsTemplateBuilder, SmzCardViewBuilder } from './template-builder';
import { cloneDeep } from 'lodash-es';
import { SmzCardsSourcesBuilder } from './source-builder';

export class SmzCardsBuilder<T> {
  public _state: SmzCardsState<T> = {
    items$: null,
    sources: [],
    selectedSource: null,
    isDebug: false,
    title: {
      isVisible: false,
      getText: null
    },
    locale: null,
    template: {
      type: null,
    },
    grid: {
      styleClass: {
        all: '',
        layout: 'col-12 lg:col-6 xl:col-3',
        padding: 'p-2',
        general: ''
      }
    },
    list: {
      styleClass: {
        all: '',
        layout: 'col-12 lg:col-6 xl:col-3',
        padding: 'p-2',
        general: ''
      }
    },
    buttons: {
      callback: null,
      buttonClass: 'p-0',
      styleClass: 'p-button-rounded p-button-text p-button-plain',
      icon: 'fa-solid fa-ellipsis-vertical'
    },
    menu: {
      callback: null,
      buttonClass: 'p-0',
      styleClass: 'p-button-rounded p-button-text p-button-plain',
      icon: 'fa-solid fa-ellipsis-vertical'
    },
    view: {
      rowsPerPage: 9,
      paginator: true,
      showGlobalFilter: false,
      filterBy: '',
      layout: 'grid',
      showHeader: true
    }
  };

  constructor(uiDefinitionName?: string) {

    if (uiDefinitionName) {
      throw Error(`[SmzCards] Ui Definition integration is not implemented yet.`);
    }

    this.setLocale('pt-BR');

  }

  public setSource(items$: Observable<T[]>): SmzCardsBuilder<T> {

    if (this._state.sources.length > 0) {
      throw Error(`You can't call setSource() after sources().`);
    }

    this._state.items$ = items$;
    return this;
  }

  public sources(): SmzCardsSourcesBuilder<T> {
    return new SmzCardsSourcesBuilder<T>(this);
  }

  public setTitle(title: string): SmzCardsBuilder<T> {
    this._state.title.isVisible = true;
    this._state.title.getText = () => title;

    return this;
  }

  public hideHeader(): SmzCardsBuilder<T> {
    this._state.view.showHeader = false;

    return this;
  }

  public template(): SmzCardsTemplateBuilder<SmzCardsBuilder<T>> {
    return new SmzCardsTemplateBuilder(this, this._state.template);
  }

  public grid(): SmzCardViewBuilder<T> {
    return new SmzCardViewBuilder(this, this._state.grid, 'grid');
  }

  public list(): SmzCardViewBuilder<T> {
    return new SmzCardViewBuilder(this, this._state.list, 'list');
  }

  public setDynamicTitle(callback: () => string): SmzCardsBuilder<T> {
    this._state.title.isVisible = true;
    this._state.title.getText = callback;

    return this;
  }

  public setRowsPerPage(rows: number): SmzCardsBuilder<T> {
    this._state.view.rowsPerPage = rows;
    return this;
  }

  public hidePaginator(): SmzCardsBuilder<T> {
    this._state.view.paginator = false;
    return this;
  }

  public setLocale(language: 'pt-BR' | 'en-US'): SmzCardsBuilder<T> {

    switch (language) {
      case 'pt-BR':
        this._state.locale = {
          code: language,
          globalSearch: {
            placeholder: 'Pesquisa Global'
          },
          paginator: {
            previous: 'Anterior',
            next: 'Próximo',
            showing: 'Mostrando',
            to: 'a',
            of: 'de',
            results: 'Resultados',
          },
          emptyMessage: 'Lista Vazia',
        };

        break;

      case 'en-US':

        this._state.locale = {
          code: language,
          globalSearch: {
            placeholder: 'Global Search'
          },
          paginator: {
            previous: 'Previous',
            next: 'Next',
            showing: 'Showing',
            to: 'to',
            of: 'of',
            results: 'Results',
          },
          emptyMessage: 'Empty List',
        };

        break;

      default:
        break;
    }

    return this;
  }

  public setEmptyMessage(message: string): SmzCardsBuilder<T> {
    this._state.locale.emptyMessage = message;
    return this;
  }

  public buttons(items?: SmzMenuItem[]): SmzCardsMenuBuilder {

    if (this._state.buttons?.callback != null) {
      throw Error('[Smz Cards] You can\'t call \'buttons\' because it is already set.');
    }

    return new SmzCardsMenuBuilder(this, this._state.buttons, items);
  }

  public menu(items?: SmzMenuItem[]): SmzCardsMenuBuilder {

    if (this._state.menu?.callback != null) {
      throw Error('[Smz Cards] You can\'t call \'menu\' because it is already set.');
    }

    return new SmzCardsMenuBuilder(this, this._state.menu, items);
  }

  public debugMode(): SmzCardsBuilder<T> {
    this._state.isDebug = true;
    return this;
  }

  public build(): SmzCardsState<T> {

    if (this._state.template.type == null) {
      throw Error('[Smz Cards] You need to set a template.');
    }

    if (this._state.view.filterBy != '') {
      this._state.view.showGlobalFilter = true;
    }

    if (this._state.sources.length > 0) {
      const defaultSource = this._state.sources.some(x => x.isDefault) ? this._state.sources.find(x => x.isDefault) : this._state.sources[0];
      this._state.selectedSource = defaultSource;
      this._state.items$ = defaultSource.items$;
    }

    if (this._state.items$ == null) {
      throw Error('[Smz Cards] You can\'t call \'build()\' without setting the source.');
    }

    if (this._state.isDebug) {
      console.log(cloneDeep(this._state));
    }

    return this._state;
  }
}