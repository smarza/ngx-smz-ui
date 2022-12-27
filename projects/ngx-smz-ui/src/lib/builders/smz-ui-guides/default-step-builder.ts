import { SmzUiGuidesStep } from '../../standalones/smz-ui-guides/models/smz-ui-guides-state';
import { SmzUiGuidesBuilder } from './ui-guides-builder';

export class SmzUiGuidesDefaultStepBuilder {
  constructor(private _builder: SmzUiGuidesBuilder) {
  }

  public setTitle(title: string): SmzUiGuidesDefaultStepBuilder {
    this._builder._defaultStep.title = title;
    return this;
  }

  public setContent(content: string): SmzUiGuidesDefaultStepBuilder {
    this._builder._defaultStep.content = content;
    return this;
  }

  public setStyles(styleClass: string): SmzUiGuidesDefaultStepBuilder {
    this._builder._defaultStep.style.styleClass = styleClass;
    return this;
  }

  public setWidth(width: string): SmzUiGuidesDefaultStepBuilder {
    this._builder._defaultStep.size.width = width;
    return this;
  }

  public setHeight(height: string): SmzUiGuidesDefaultStepBuilder {
    this._builder._defaultStep.size.height = height;
    return this;
  }

  public offsetX(percentage: number): SmzUiGuidesDefaultStepBuilder {
    this._builder._defaultStep.alignment.offsetX = percentage;
    return this;
  }

  public offsetY(percentage: number): SmzUiGuidesDefaultStepBuilder {
    this._builder._defaultStep.alignment.offsetY = percentage;
    return this;
  }

  public horizontal(): SmzUiGuidesDefaultStepBuilder {
    this._builder._defaultStep.alignment.centerX = true;
    return this;
  }

  public vertical(): SmzUiGuidesDefaultStepBuilder {
    this._builder._defaultStep.alignment.centerY = true;
    return this;
  }

  public setInitCallback(callback: (step: SmzUiGuidesStep) => void): SmzUiGuidesDefaultStepBuilder {
    this._builder._defaultStep.callbacks.init = callback;
    return this;
  }

  public setConcludedCallback(callback: (step: SmzUiGuidesStep) => void): SmzUiGuidesDefaultStepBuilder {
    this._builder._defaultStep.callbacks.concluded = callback;
    return this;
  }

  public get defaults(): SmzUiGuidesBuilder {

    return this._builder;
  }
}
