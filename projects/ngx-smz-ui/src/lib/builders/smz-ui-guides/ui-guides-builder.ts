import { SmzUiGuidesState } from '../../standalones/smz-ui-guides/models/smz-ui-guides-state';
import { SmzUiGuidesStepBuilder } from './step-builder';

export class SmzUiGuidesBuilder {
  public _state: SmzUiGuidesState = {
    context: {
      step: 1
    },
    title: '',
    steps: [],
    locale: null,
  };
  constructor() {
    this.setLocale('pt-BR');
  }

  public setTitle(title: string): SmzUiGuidesBuilder {
    this._state.title = title;
    return this;
  }

  public step(elementId: string): SmzUiGuidesStepBuilder {
    return new SmzUiGuidesStepBuilder(this, elementId);
  }

  public setLocale(language: 'pt-BR' | 'en-US'): SmzUiGuidesBuilder {

    switch (language) {
      case 'pt-BR':
        this._state.locale = {
          code: language,
        };

        break;

      case 'en-US':

        this._state.locale = {
          code: language,
        };

        break;

      default:
        break;
    }

    return this;
  }

  public build(): SmzUiGuidesState {

    if (this._state.steps.length === 0) {
      throw Error(`You can't build a guide without steps.`);
    }

    return this._state;
  }
}