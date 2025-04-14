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
    this._builder._defaultStep.alignment.offsetX = 50;
    return this;
  }

  public vertical(): SmzUiGuidesDefaultStepBuilder {
    this._builder._defaultStep.alignment.offsetY = 50;
    return this;
  }

  public disableHighlight(): SmzUiGuidesDefaultStepBuilder {
    this._builder._defaultStep.highlight.enabled = false;
    return this;
  }

  public setHighlightMargin(margin: number): SmzUiGuidesDefaultStepBuilder {
    this._builder._defaultStep.highlight.margin = margin;
    return this;
  }

  public get defaults(): SmzUiGuidesBuilder {

    return this._builder;
  }
}
