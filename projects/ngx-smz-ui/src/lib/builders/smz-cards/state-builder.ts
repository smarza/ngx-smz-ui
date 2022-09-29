import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { SmzCardsState } from '../../modules/smz-cards/models/smz-cards-state';
import { SmzCardsMenuBuilder } from './menu-builder';
import { SmzCardsColumnCollectionBuilder } from './column-builder';
import { Observable } from 'rxjs';
import { SmzCardsType } from '../../modules/smz-cards/models/smz-cards-types';
import { SmzCardsTypes, ImageWithDetails } from '../../modules/smz-cards/models/types/smz-cards-types';
import { SmzCardsContentType, SmzCardsImageContent } from '../../modules/smz-cards/models/smz-cards-contents';

export class SmzCardsBuilder<T> {
  public _state: SmzCardsState<T> = {
    items$: null,
    isDebug: false,
    title: {
      isVisible: false,
      getText: null
    },
    locale: null,
    columns: [],
    grid: {
      type: SmzCardsType.RAW,
      config: null
    },
    list: {
      type: SmzCardsType.RAW,
      config: null
    },
    menu: {
      callback: null
    }
  };

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

  public setType(type: SmzCardsType): SmzCardsBuilder<T> {
    this._state.grid.type = type;
    this._state.list.type = type;
    return this;
  }

  public setGridType(type: SmzCardsType): SmzCardsBuilder<T> {
    this._state.grid.type = type;
    return this;
  }

  public setListType(type: SmzCardsType): SmzCardsBuilder<T> {
    this._state.list.type = type;
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

    if (this._state.menu?.callback != null) {
      throw Error('[Smz Cards] You can\'t call \'menu\' because it is already set.');
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

    this._state.grid.config = GetTypeConfig(this._state.grid.type, this._state);
    this._state.list.config = GetTypeConfig(this._state.list.type, this._state);

    return this._state;
  }
}

function GetTypeConfig(type: SmzCardsType, state: SmzCardsState<unknown>): SmzCardsTypes {
  try {
    switch (type) {
      case SmzCardsType.RAW:
        return null;

      case SmzCardsType.IMAGE_WITH_DETAILS:
        const image = state.columns.find(x => x.content.type == SmzCardsContentType.IMAGE && x.isVisible);
        const texts = state.columns.filter(x => x.content.type !== SmzCardsContentType.IMAGE && x.isVisible);

        const result: ImageWithDetails = {
          image: {
            content: (image.content as SmzCardsImageContent),
          },
          texts
        };
        return result;

      default:
        return null;
    }
  } catch (error) {
    console.error(error);
    throw Error(`[Smz Cards] Error while trying to build the config for the type ${type}`);
  }
}