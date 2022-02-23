import { SmzSvgFeature, SmzSvgPin, SmzSvgRoot } from '../../modules/smz-svg/models/smz-svg';
import { SmzSvgBaseFeatureBuilder } from './svg-base-feature';
import { SmzSvgBuilder } from './svg-builder';
import { SmzSvgFeatureBuilder } from './svg-feature';



export class SmzSvgRootBuilder extends SmzSvgBaseFeatureBuilder<SmzSvgRootBuilder> {
  protected that = this;
  constructor(public _featureBuilder: SmzSvgFeatureBuilder, public _feature: SmzSvgRoot, public _svgBuilder: SmzSvgBuilder) {
    super(_featureBuilder, _feature, _svgBuilder);
  }

  // public overrideContainerStyles(styleClass: string): SmzSvgRootBuilder {
  //   this._data.container.styles = styleClass;
  //   return this.that;
  // }

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

  public setColor(color: string): SmzSvgPinBuilder {
    this._feature.color = color;
    return this.that;
  }

}