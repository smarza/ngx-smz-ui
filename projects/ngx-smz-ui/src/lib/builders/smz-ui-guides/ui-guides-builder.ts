import { SmzUiGuidesState, SmzUiGuidesStep } from '../../standalones/smz-ui-guides/models/smz-ui-guides-state';
import { SmzUiGuidesDefaultStepBuilder } from './default-step-builder';
import { SmzUiGuidesStepBuilder } from './step-builder';
import { SmzUiGuidesStepOverridesBuilder } from './step-overrides-builder';

export class SmzUiGuidesBuilder {
  public _state: SmzUiGuidesState = {
    context: {
      step: 1
    },
    title: '',
    steps: [],
    locale: null,
    highlight: {
      enabled: true
    }
  };

  public _defaultStep: SmzUiGuidesStep = {
    number: 0,
    elementId: '',
    title: '',
    content: '',
    alignment: {
      centerX: false,
      centerY: false,
      offsetX: 0,
      offsetY: 0,
    },
    size: {
      width: '600px',
      height: '400px'
    },
    style: {
      styleClass: ''
    },
    callbacks: {
      init: () => {},
      concluded: () => {}
    }
  };

  constructor() {
    this.setLocale('pt-BR');
  }

  public setTitle(title: string): SmzUiGuidesBuilder {
    this._state.title = title;
    return this;
  }

  public disableHighlight(): SmzUiGuidesBuilder {
    this._state.highlight.enabled = false;
    return this;
  }

  public defaults(): SmzUiGuidesDefaultStepBuilder {
    return new SmzUiGuidesDefaultStepBuilder(this);
  }

  public step(elementId: string): SmzUiGuidesStepBuilder {
    return new SmzUiGuidesStepBuilder(this, elementId);
  }

  public override(): SmzUiGuidesStepOverridesBuilder {
    return new SmzUiGuidesStepOverridesBuilder(this);
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