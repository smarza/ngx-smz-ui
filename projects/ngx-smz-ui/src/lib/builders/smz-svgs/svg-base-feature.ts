import { SmzSvgFeature } from '../../modules/smz-svg/models/smz-svg';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzSvgFeatureBuilder } from './svg-feature';
import { SmzSvgBuilder } from './svg-builder';
import { SmzSVGWrapper } from '../../modules/smz-svg/models/smz-svg-wrapper';

export class SmzSvgBaseFeatureBuilder<T> extends SmzBuilderUtilities<T> {
  protected that: T;
  constructor(public _featureBuilder: SmzSvgFeatureBuilder, public _feature: SmzSvgFeature, public _svgBuilder: SmzSvgBuilder) {
    super();
  }

  public useTooltip(content: string): T {
    this._feature.tooltip.enabled = true;
    this._feature.tooltip.data = content;
    return this.that;
  }

  public useAdaptative(minWidth: number, maxWidth: number): T {
    this._feature.adaptative.enabled = true;
    this._feature.adaptative.minWidth = minWidth;
    this._feature.adaptative.maxWidth = maxWidth;
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