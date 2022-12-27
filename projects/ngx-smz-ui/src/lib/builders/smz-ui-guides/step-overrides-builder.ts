import { SmzUiGuidesStep } from '../../standalones/smz-ui-guides/models/smz-ui-guides-state';
import { SmzUiGuidesBuilder } from './ui-guides-builder';

export class SmzUiGuidesStepOverridesBuilder {
  constructor(private _builder: SmzUiGuidesBuilder) {
    if (this._builder._state.steps.length === 0) {
      throw Error(`You can't override before setting all steps.`);
    }
  }

  public setTitle(title: string): SmzUiGuidesStepOverridesBuilder {
    this._builder._state.steps.forEach(step => step.title = title);
    return this;
  }

  public setContent(content: string): SmzUiGuidesStepOverridesBuilder {
    this._builder._state.steps.forEach(step => step.content = content);
    return this;
  }

  public setStyles(styleClass: string): SmzUiGuidesStepOverridesBuilder {
    this._builder._state.steps.forEach(step => step.style.styleClass = styleClass);
    return this;
  }

  public setWidth(width: string): SmzUiGuidesStepOverridesBuilder {
    this._builder._state.steps.forEach(step => step.size.width = width);
    return this;
  }

  public setHeight(height: string): SmzUiGuidesStepOverridesBuilder {
    this._builder._state.steps.forEach(step => step.size.height = height);
    return this;
  }

  public offsetX(percentage: number): SmzUiGuidesStepOverridesBuilder {
    this._builder._state.steps.forEach(step => step.alignment.offsetX = percentage);
    return this;
  }

  public offsetY(percentage: number): SmzUiGuidesStepOverridesBuilder {
    this._builder._state.steps.forEach(step => step.alignment.offsetY = percentage);
    return this;
  }

  public horizontal(): SmzUiGuidesStepOverridesBuilder {
    this._builder._state.steps.forEach(step => step.alignment.offsetX = 50);
    return this;
  }

  public vertical(): SmzUiGuidesStepOverridesBuilder {
    this._builder._state.steps.forEach(step => step.alignment.offsetY = 50);
    return this;
  }

  public disableHighlight(): SmzUiGuidesStepOverridesBuilder {
    this._builder._state.steps.forEach(step => step.highlight.enabled = false);
    return this;
  }

  public setHighlightMargin(margin: number): SmzUiGuidesStepOverridesBuilder {
    this._builder._state.steps.forEach(step => step.highlight.margin = margin);
    return this;
  }

  public setInitCallback(callback: (step: SmzUiGuidesStep) => void): SmzUiGuidesStepOverridesBuilder {
    this._builder._state.steps.forEach(step => step.callbacks.init = callback);
    return this;
  }

  public setConcludedCallback(callback: (step: SmzUiGuidesStep) => void): SmzUiGuidesStepOverridesBuilder {
    this._builder._state.steps.forEach(step => step.callbacks.concluded = callback);
    return this;
  }

  public get override(): SmzUiGuidesBuilder {

    return this._builder;
  }
}
