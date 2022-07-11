import { SmzSvgFeature } from '../../modules/smz-svg/models/smz-svg';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzSvgFeatureBuilder } from './svg-feature';
import { SmzSvgBuilder } from './svg-builder';
import { SmzSVGWrapper } from '../../modules/smz-svg/models/smz-svg-wrapper';
import { isEmpty } from '../common/utils';

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

  public styleClass(styleClass: string): T {
    this._feature.styleClass = styleClass;
    return this.that;
  }

  public useHighlight(color: string): T {

    if (isEmpty(this._feature.color)) {
      throw new Error(`You cannot set useHighlight without color. Please setColor before useHighlight`);
    }

    this._feature.highlight.enabled = true;
    this._feature.highlight.color = color;
    return this.that;
  }

  public allowClick(callback: (id: string, svg: SmzSVGWrapper, data: any) => void): T {
    this._feature.click.enabled = true;
    this._feature.click.callback = callback;
    return this.that;
  }

  public allowDbClick(callback: (id: string, svg: SmzSVGWrapper, data: any) => void): T {
    this._feature.dbClick.enabled = true;
    this._feature.dbClick.callback = callback;
    return this.that;
  }

  public setNavigation(behavior: 'onClick' | 'onDbClick'): T {

    if (behavior === 'onClick') {
      this._feature.click.enabled = true;
      this._feature.click.navigate = true;
    }
    else if (behavior === 'onDbClick') {
      this._feature.dbClick.enabled = true;
      this._feature.dbClick.navigate = true;
    }

    return this.that;
  }

  public setData(data: any): T {
    this._feature.data = data;
    return this.that;
  }

  public setColor(color: string): T {
    this._feature.color = color;
    return this.that;
  }

  public setStroke(color: string): T {
    this._feature.stroke = color;
    return this.that;
  }

  public setFocusApproximation(approximation: number): T {
    this._feature.focus.zoom = approximation;
    return this.that;
  }

  public get feature(): SmzSvgFeatureBuilder {
    return this._featureBuilder;
  }
}