import { SmzSvgFeature, SmzSvgPin, SmzSvgRoot, SmzSvgAnchorTypes } from '../../modules/smz-svg/models/smz-svg';
import { SmzSVGWrapper } from '../../modules/smz-svg/models/smz-svg-wrapper';
import { SmzSvgBaseFeatureBuilder } from './svg-base-feature';
import { SmzSvgBuilder } from './svg-builder';
import { SmzSvgFeatureBuilder } from './svg-feature';



export class SmzSvgRootBuilder {
  protected that = this;
  constructor(public _featureBuilder: SmzSvgFeatureBuilder, public _feature: SmzSvgRoot, public _svgBuilder: SmzSvgBuilder) {
  }

  public overrideContainerStyles(styleClass: string): SmzSvgRootBuilder {
    // this.feature.root.container.styles = styleClass;
    return this.that;
  }

  public transform(callback: (feature: SmzSvgFeature, draw: SmzSVGWrapper) => void) {
    this._feature.transform = callback;
    return this.that;
  }

  public get feature(): SmzSvgFeatureBuilder {
    return this._featureBuilder;
  }

}

export class SmzSvgPinBuilder extends SmzSvgBaseFeatureBuilder<SmzSvgPinBuilder> {
  protected that = this;
  constructor(public _featureBuilder: SmzSvgFeatureBuilder, public _feature: SmzSvgPin, public _svgBuilder: SmzSvgBuilder) {
    super(_featureBuilder, _feature, _svgBuilder);
  }

  public setPosition(x: number, y: number): SmzSvgPinBuilder {
    this._feature.position.x = x;
    this._feature.position.y = y;
    return this.that;
  }

  public setAnchor(anchor: SmzSvgAnchorTypes): SmzSvgPinBuilder {
    this._feature.anchor = anchor;
    return this.that;
  }

  public setColor(color: string): SmzSvgPinBuilder {
    this._feature.color = color;
    return this.that;
  }

}