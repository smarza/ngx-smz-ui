import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { SmzEasyTableBodyColumn, SmzEasyTableHeader } from '../../standalones/easy-table/models/smz-easy-table-state';
import { SmzEasyTableActionContent } from '../../standalones/easy-table/models/smz-easy-table-contents';
import { SmzCardsState } from '../../modules/smz-cards/models/smz-cards-state';
import { SmzCardsMenuBuilder } from './menu-builder';
import { SmzCardsColumnCollectionBuilder } from './column-builder';
import { Observable } from 'rxjs';

export class SmzCardsBuilder<T> {
  public _state: SmzCardsState<T> = {
    items$: null,
    isDebug: false,
    title: {
      isVisible: false,
      getText: null
    },
    locale: null,
    columns: []
  };

  public _tempMenu: { column: SmzEasyTableBodyColumn, header: SmzEasyTableHeader } = null;

  constructor(uiDefinitionName?: string) {

    if (uiDefinitionName) {
      throw Error(`[Smz Eazy Table] Ui Definition integration is not implemented yet.`);
    }

    this.setLocale('pt-BR');

  }

  public setSource(items$: Observable<T[]>): SmzCardsBuilder<T> {
    this._state.items$ = items$;
    return this;
  }

  public setTitle(title: string): SmzCardsBuilder<T> {
    this._state.title.isVisible = true;
    this._state.title.getText = () => title;

    return this;
  }

  public setDynamicTitle(callback: () => string): SmzCardsBuilder<T> {
    this._state.title.isVisible = true;
    this._state.title.getText = callback;

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

  public menu(items?: SmzMenuItem[]): SmzCardsMenuBuilder {

    if (this._tempMenu != null && (this._tempMenu.column?.content as SmzEasyTableActionContent)?.callback != null) {
      throw Error('[Smz Eazy Table] You can\'t call \'menu\' while using dynamic menu.');
    }

    return new SmzCardsMenuBuilder(this, items);
  }

  public columns(): SmzCardsColumnCollectionBuilder {
    return new SmzCardsColumnCollectionBuilder(this);
  }

  public debugMode(): SmzCardsBuilder<T> {
    this._state.isDebug = true;
    return this;
  }

  public build(): SmzCardsState<T> {

    if (this._state.isDebug) {
      console.log(this._state);
    }


    if (this._state.items$ == null) {
      throw Error('[Smz Cards] You can\'t call \'build()\' without setting the source.');
    }

    return this._state;
  }
}