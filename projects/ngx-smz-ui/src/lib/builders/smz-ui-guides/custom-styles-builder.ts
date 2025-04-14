import { SmzUiGuideBaseStylesBuilder } from './base-styles-builder';
import { SmzUiGuidesBuilder } from './ui-guides-builder';

export class SmzUiGuidesCustomStylesBuilder {
  constructor(private _builder: SmzUiGuidesBuilder) {
  }

  public overlay(): SmzUiGuidesOverlayStylesBuilder {
    return new SmzUiGuidesOverlayStylesBuilder(this);
  }

  public blend(): SmzUiGuidesBlendStylesBuilder {
    return new SmzUiGuidesBlendStylesBuilder(this);
  }

  public highlight(): SmzUiGuidesHighlightStylesBuilder {
    return new SmzUiGuidesHighlightStylesBuilder(this);
  }

  public get customStyles(): SmzUiGuidesBuilder {

    return this._builder;
  }

}


export class SmzUiGuidesOverlayStylesBuilder extends SmzUiGuideBaseStylesBuilder<SmzUiGuidesOverlayStylesBuilder, SmzUiGuidesCustomStylesBuilder> {
  constructor(private _customBuilder: SmzUiGuidesCustomStylesBuilder) {
    super(_customBuilder, _customBuilder.customStyles._state.styleClass.overlay);
    this.that = this;
  }

  public get overlay(): SmzUiGuidesCustomStylesBuilder {
    return this._customBuilder;
  }

}

export class SmzUiGuidesBlendStylesBuilder extends SmzUiGuideBaseStylesBuilder<SmzUiGuidesBlendStylesBuilder, SmzUiGuidesCustomStylesBuilder> {
  constructor(private _customBuilder: SmzUiGuidesCustomStylesBuilder) {
    super(_customBuilder, _customBuilder.customStyles._state.styleClass.blend);
    this.that = this;
  }

  public get blend(): SmzUiGuidesCustomStylesBuilder {
    return this._customBuilder;
  }

}

export class SmzUiGuidesHighlightStylesBuilder extends SmzUiGuideBaseStylesBuilder<SmzUiGuidesHighlightStylesBuilder, SmzUiGuidesCustomStylesBuilder> {
  constructor(private _customBuilder: SmzUiGuidesCustomStylesBuilder) {
    super(_customBuilder, _customBuilder.customStyles._state.styleClass.highlight);
    this.that = this;
  }

  public get highlight(): SmzUiGuidesCustomStylesBuilder {
    return this._customBuilder;
  }

}