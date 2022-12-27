import { SmzUiGuidesState, SmzUiGuidesStep } from '../../standalones/smz-ui-guides/models/smz-ui-guides-state';
import { SmzUiGuidesDefaultStepBuilder } from './default-step-builder';
import { SmzUiGuidesStepBuilder } from './step-builder';
import { SmzUiGuidesStepOverridesBuilder } from './step-overrides-builder';

export class SmzUiGuidesBuilder {
  public _state: SmzUiGuidesState = {
    context: {
      step: 1
    },
    steps: [],
    locale: null,
    allowBackNavigation: false,
    showSummaryCount: false
  };

  public _defaultStep: SmzUiGuidesStep = {
    number: 0,
    elementId: '',
    title: '',
    content: '',
    alignment: {
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
    },
    highlight: {
      enabled: true,
      margin: 0
    }
  };

  constructor() {
    this.setLocale('pt-BR');
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
          previousButton: 'Voltar',
          nextButton: 'Avançar',
          concludeButton: 'Concluir'
        };

        break;

      case 'en-US':

        this._state.locale = {
          code: language,
          previousButton: 'Back',
          nextButton: 'Next',
          concludeButton: 'Finish'
        };

        break;

      default:
        break;
    }

    return this;
  }

  public allowBackNavigation(): SmzUiGuidesBuilder {
    this._state.allowBackNavigation = true;
    return this;
  }

  public showSummaryCount(): SmzUiGuidesBuilder {
    this._state.showSummaryCount = true;
    return this;
  }

  public build(): SmzUiGuidesState {

    if (this._state.steps.length === 0) {
      throw Error(`You can't build a guide without steps.`);
    }

    return this._state;
  }
}