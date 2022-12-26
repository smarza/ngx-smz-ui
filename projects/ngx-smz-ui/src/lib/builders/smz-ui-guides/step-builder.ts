import { SmzUiGuidesStep } from '../../standalones/smz-ui-guides/models/smz-ui-guides-state';
import { SmzUiGuidesBuilder } from './ui-guides-builder';

export class SmzUiGuidesStepBuilder {
  private _step: SmzUiGuidesStep;
  constructor(private _builder: SmzUiGuidesBuilder, private elementId: string) {
    this._step = {
      elementId,
      title: '',
      content: '',
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

  public get step(): SmzUiGuidesBuilder {

    return this._builder;
  }
}
