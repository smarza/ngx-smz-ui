import { cloneDeep } from 'lodash-es';
import { SmzUiGuidesStep } from '../../standalones/smz-ui-guides/models/smz-ui-guides-state';
import { SmzUiGuidesBuilder } from './ui-guides-builder';

export class SmzUiGuidesStepBuilder {
  private _step: SmzUiGuidesStep;
  constructor(private _builder: SmzUiGuidesBuilder, private elementId: string) {
    this._step = {
      ...cloneDeep(this._builder._defaultStep),
      number: this._builder._state.steps.length + 1,
      elementId,
    };

    this._builder._state.steps.push(this._step);
  }

  public setTitle(title: string): SmzUiGuidesStepBuilder {
    this._step.title = title;
    return this;
  }

  public setContent(content: string): SmzUiGuidesStepBuilder {
    this._step.content = content;
    return this;
  }

  public setStyles(styleClass: string): SmzUiGuidesStepBuilder {
    this._step.style.styleClass = styleClass;
    return this;
  }

  public setWidth(width: string): SmzUiGuidesStepBuilder {
    this._step.size.width = width;
    return this;
  }

  public setHeight(height: string): SmzUiGuidesStepBuilder {
    this._step.size.height = height;
    return this;
  }

  public offsetX(percentage: number): SmzUiGuidesStepBuilder {
    this._step.alignment.offsetX = percentage;
    return this;
  }

  public offsetY(percentage: number): SmzUiGuidesStepBuilder {
    this._step.alignment.offsetY = percentage;
    return this;
  }

  public horizontal(): SmzUiGuidesStepBuilder {
    this._step.alignment.offsetX = 50;
    return this;
  }

  public vertical(): SmzUiGuidesStepBuilder {
    this._step.alignment.offsetY = 50;
    return this;
  }

  public disableHighlight(): SmzUiGuidesStepBuilder {
    this._step.highlight.enabled = false;
    return this;
  }

  public setHighlightMargin(margin: number): SmzUiGuidesStepBuilder {
    this._step.highlight.margin = margin;
    return this;
  }

  public get step(): SmzUiGuidesBuilder {

    return this._builder;
  }
}
