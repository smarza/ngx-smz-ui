import { SmzUiGuidesState, SmzUiGuidesStep } from '../../standalones/smz-ui-guides/models/smz-ui-guides-state';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiGuidesCustomStylesBuilder } from './custom-styles-builder';
import { SmzUiGuidesDefaultStepBuilder } from './default-step-builder';
import { SmzUiGuidesStepBuilder } from './step-builder';
import { SmzUiGuidesStepOverridesBuilder } from './step-overrides-builder';

export class SmzUiGuidesBuilder extends SmzBuilderUtilities<SmzUiGuidesBuilder> {
  protected override that = this;
  public _state: SmzUiGuidesState = {
    context: {
      step: 1
    },
    steps: [],
    locale: null,
    allowBackNavigation: false,
    showSummaryCount: false,
    styleClass: {
      overlay: { styleClass: '' },
      highlight: { styleClass: '' },
      blend: { styleClass: '' }
    },
    callbacks: {
      init: () => {},
      concluded: () => {}
    },
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
    highlight: {
      enabled: true,
      margin: 0
    }
  };

  constructor() {
    super();
    this.setLocale('pt-BR');
  }

  public defaults(): SmzUiGuidesDefaultStepBuilder {
    return new SmzUiGuidesDefaultStepBuilder(this.that);
  }

  public step(elementId: string): SmzUiGuidesStepBuilder {
    return new SmzUiGuidesStepBuilder(this.that, elementId);
  }

  public override(): SmzUiGuidesStepOverridesBuilder {
    return new SmzUiGuidesStepOverridesBuilder(this.that);
  }

  public setInitCallback(callback: (step: SmzUiGuidesStep) => void): SmzUiGuidesBuilder {
    this._state.callbacks.init = callback;
    return this.that;
  }

  public setConcludedCallback(callback: (step: SmzUiGuidesStep) => void): SmzUiGuidesBuilder {
    this._state.callbacks.concluded = callback;
    return this.that;
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

    return this.that;
  }

  public allowBackNavigation(): SmzUiGuidesBuilder {
    this._state.allowBackNavigation = true;
    return this.that;
  }

  public showSummaryCount(): SmzUiGuidesBuilder {
    this._state.showSummaryCount = true;
    return this.that;
  }

  public customStyles(): SmzUiGuidesCustomStylesBuilder {
    return new SmzUiGuidesCustomStylesBuilder(this.that);
  }

  public build(): SmzUiGuidesState {

    if (this._state.steps.length === 0) {
      throw Error(`You can't build a guide without steps.`);
    }

    return this._state;
  }
}