import { Container, Element } from '@svgdotjs/svg.js';
import { SmzSvgFeature, SmzSvgPin, SmzSvgRoot, SmzSvgAnchorTypes, SmzSvgBaseFeature } from '../../modules/smz-svg/models/smz-svg';
import { SmzSvgBaseFeatureBuilder } from './svg-base-feature';
import { SmzSvgBuilder } from './svg-builder';
import { SmzSvgFeatureBuilder } from './svg-feature';


export class SmzSvgRootBuilder extends SmzSvgBaseFeatureBuilder<SmzSvgRootBuilder> {
  protected that = this;
  constructor(public _featureBuilder: SmzSvgFeatureBuilder, public _feature: SmzSvgRoot, public _svgBuilder: SmzSvgBuilder) {
    super(_featureBuilder, _feature, _svgBuilder);
  }

  public overrideContainerStyles(styleClass: string): SmzSvgRootBuilder {
    // this.feature.root.container.styles = styleClass;
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

    if (this._svgBuilder._state.worldCoordinates.enabled) {
      throw new Error(`You need to call 'setCoordinates' to register the position while using world coordinates`);
    }

    this._feature.position.x = x;
    this._feature.position.y = y;
    return this.that;
  }

  public setCoordinates(latitude: number, longitude: number): SmzSvgPinBuilder {

    if (!this._svgBuilder._state.worldCoordinates.enabled) {
      throw new Error(`You need to enable world coordinates to call 'setCoordinates'`);
    }

    this._feature.position.x = longitude;
    this._feature.position.y = latitude;
    return this.that;
  }

  public setDynamicBuild(callback: (rootContainer: Container, feature: SmzSvgBaseFeature) => Element): SmzSvgPinBuilder {
    this._feature.dynamicBuild.callback = callback;
    return this.that;
  }

  public setAnchor(anchor: SmzSvgAnchorTypes): SmzSvgPinBuilder {

    if (this._svgBuilder._state.worldCoordinates.enabled && anchor !== 'world') {
      throw new Error(`You cannot set anchor diferent of 'world' while using world coordinates`);
    }

    this._feature.anchor = anchor;
    return this.that;
  }

  public setColor(color: string): SmzSvgPinBuilder {
    this._feature.color = color;
    return this.that;
  }

}