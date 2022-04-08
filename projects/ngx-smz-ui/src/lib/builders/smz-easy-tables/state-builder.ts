import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { SmzEasyMenuTableBuilder } from './menu-builder';
import { SmzEasyTableBodyColumn, SmzEasyTableHeader, SmzEasyTableState } from '../../standalones/easy-table/models/smz-easy-table-state';
import { SmzEasyTableActionContent } from '../../standalones/easy-table/models/smz-easy-table-contents';
import { SmzEasyColumnCollectionBuilder } from './column-builder';
import { SmzEasyTablePaginatorBuilder } from './paginator-builder';
import { SmzEasyTableOptimizationsBuilder } from './optimizations-builder';

export class SmzEasyTableBuilder {
  public _state: SmzEasyTableState = {
    isDebug: false,
    title: {
      isVisible: false,
      getText: null
    },
    locale: null,
    config: {
      dataIdProperty: 'id',
      throttle: {
        isEnabled: false,
        interval: 500,
        method: 'auto',
        incrementPercentage: 200
      }
    },
    desktop: {
      enabled: true,
      containerStyleClass: 'overflow-auto rounded-lg shadow hidden md:block',
      tableStyleClass: 'w-full',
      layout: 'auto',
      head: {
        styleClass: 'bg-gray-50 border-b-2 border-gray-200',
        sortMode: 'multiple',
        headers: [],
        visibleCount: 0
      },
      body: {
        styleClass: 'divide-y divide-gray-100',
        evenRow: {
          styleClass: 'bg-white'
        },
        oddRow: {
          styleClass: 'bg-gray-50'
        },
        columns: []
      }
    },
    mobile: {
      enabled: false,
      head: null,
      body: null
    },
    paginator: {
      itemsPerPage: 6,
      maxVisiblePages: 6,
      isVisible: true,
      showResults: true,
    },
    globalSearch: {
      isEnabled: true,
      isOptimized: false,
      interval: 1000,
      incrementPercentage: 200
    }
  };

  public _tempMenu: { column: SmzEasyTableBodyColumn, header: SmzEasyTableHeader } = null;

  constructor(uiDefinitionName?: string) {

    if (uiDefinitionName) {
      throw Error(`[Smz Eazy Table] Ui Definition integration is not implemented yet.`);
    }

    this.setLocale('pt-BR');

  }

  public setTitle(title: string): SmzEasyTableBuilder {
    this._state.title.isVisible = true;
    this._state.title.getText = () => title;

    return this;
  }

  public setDynamicTitle(callback: () => string): SmzEasyTableBuilder {
    this._state.title.isVisible = true;
    this._state.title.getText = callback;

    return this;
  }

  public setLocale(language: 'pt-BR' | 'en-US'): SmzEasyTableBuilder {

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

  public setEmptyMessage(message: string): SmzEasyTableBuilder {
    this._state.locale.emptyMessage = message;
    return this;
  }

  public paginator(itemsPerPage: number = 10): SmzEasyTablePaginatorBuilder {
    return new SmzEasyTablePaginatorBuilder(this, itemsPerPage);
  }

  public optimize(): SmzEasyTableOptimizationsBuilder {
    return new SmzEasyTableOptimizationsBuilder(this);
  }

  public setDataIdProperty(property: string): SmzEasyTableBuilder {
    this._state.config.dataIdProperty = property;
    return this;
  }

  public setSize(size: 'small' | 'regular' | 'large'): SmzEasyTableBuilder {
    throw Error(`[Smz Eazy Table] setSize is not implemented yet.`);
    return this;
  }

  public menu(items?: SmzMenuItem[]): SmzEasyMenuTableBuilder {

    if (this._tempMenu != null && (this._tempMenu.column?.content as SmzEasyTableActionContent)?.callback != null) {
      throw Error('[Smz Eazy Table] You can\'t call \'menu\' while using dynamic menu.');
    }

    return new SmzEasyMenuTableBuilder(this, items);
  }

  public columns(): SmzEasyColumnCollectionBuilder {
    return new SmzEasyColumnCollectionBuilder(this);
  }

  public debugMode(): SmzEasyTableBuilder {
    this._state.isDebug = true;
    return this;
  }

  public build(): SmzEasyTableState {

    this._state.desktop.head.visibleCount = this._state.desktop.head.headers.filter(x => x.isVisible).length;

    if (this._tempMenu != null) {

      this._state.desktop.head.headers.push(this._tempMenu.header);
      this._state.desktop.body.columns.push(this._tempMenu.column);
    }

    if (this._state.isDebug) {
      console.log(this._state);
    }

    return this._state;
  }
}