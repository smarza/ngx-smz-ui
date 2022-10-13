import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { Observable } from 'rxjs';
import { SmzTimelineMarkerBuilder, SmzTimelineViewBuilder } from './template-builder';
import { cloneDeep } from 'lodash-es';
import { SmzTimelineState } from '../../modules/smz-timeline/models/smz-timeline-state';
import { SmzCardsTemplateBuilder } from '../smz-cards/template-builder';
import { SmzTimelineSourcesBuilder } from './source-builder';
import { SmzTimelineMenuBuilder } from './menu-builder';

export class SmzTimelineBuilder<T> {
  public _state: SmzTimelineState<T> = {
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
      styleClass: {
        event: '',
        timeline: '',
      },
      align: 'alternate',
      layout: 'vertical'
    },
    marker: {
      styleClass: '',
      icon: 'fa-solid fa-circle'
    }
  };

  constructor(uiDefinitionName?: string) {

    if (uiDefinitionName) {
      throw Error(`[SmzTimeline] Ui Definition integration is not implemented yet.`);
    }

    this.setLocale('pt-BR');

  }

  public setSource(items$: Observable<T[]>): SmzTimelineBuilder<T> {

    if (this._state.sources.length > 0) {
      throw Error(`You can't call setSource() after sources().`);
    }

    this._state.items$ = items$;
    return this;
  }

  public sources(): SmzTimelineSourcesBuilder<T> {
    return new SmzTimelineSourcesBuilder<T>(this);
  }

  public setTitle(title: string): SmzTimelineBuilder<T> {
    this._state.title.isVisible = true;
    this._state.title.getText = () => title;

    return this;
  }

  public template(): SmzCardsTemplateBuilder<SmzTimelineBuilder<T>> {
    return new SmzCardsTemplateBuilder(this, this._state.template);
  }

  public view(): SmzTimelineViewBuilder {
    return new SmzTimelineViewBuilder(this, this._state.view, 'vertical');
  }

  public marker(): SmzTimelineMarkerBuilder {
    return new SmzTimelineMarkerBuilder(this, this._state.marker);
  }

  public setDynamicTitle(callback: () => string): SmzTimelineBuilder<T> {
    this._state.title.isVisible = true;
    this._state.title.getText = callback;

    return this;
  }

  public setLocale(language: 'pt-BR' | 'en-US'): SmzTimelineBuilder<T> {

    switch (language) {
      case 'pt-BR':
        this._state.locale = {
          code: language,
          emptyMessage: 'Lista Vazia',
        };

        break;

      case 'en-US':

        this._state.locale = {
          code: language,
          emptyMessage: 'Empty List',
        };

        break;

      default:
        break;
    }

    return this;
  }

  public setEmptyMessage(message: string): SmzTimelineBuilder<T> {
    this._state.locale.emptyMessage = message;
    return this;
  }

  public buttons(items?: SmzMenuItem[]): SmzTimelineMenuBuilder {

    if (this._state.buttons?.callback != null) {
      throw Error('[Smz Timeline] You can\'t call \'buttons\' because it is already set.');
    }

    return new SmzTimelineMenuBuilder(this, this._state.buttons, items);
  }

  public menu(items?: SmzMenuItem[]): SmzTimelineMenuBuilder {

    if (this._state.menu?.callback != null) {
      throw Error('[Smz Timeline] You can\'t call \'menu\' because it is already set.');
    }

    return new SmzTimelineMenuBuilder(this, this._state.menu, items);
  }

  public debugMode(): SmzTimelineBuilder<T> {
    this._state.isDebug = true;
    return this;
  }

  public build(): SmzTimelineState<T> {

    if (this._state.template.type == null) {
      throw Error('[Smz Timeline] You need to set a template.');
    }

    if (this._state.sources.length > 0) {
      const defaultSource = this._state.sources.some(x => x.isDefault) ? this._state.sources.find(x => x.isDefault) : this._state.sources[0];
      this._state.selectedSource = defaultSource;
      this._state.items$ = defaultSource.items$;
    }

    if (this._state.items$ == null) {
      throw Error('[Smz Timeline] You can\'t call \'build()\' without setting the source.');
    }

    if (this._state.isDebug) {
      console.log(cloneDeep(this._state));
    }

    return this._state;
  }
}