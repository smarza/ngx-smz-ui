
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzSvgBuilder } from './svg-builder';
import { SmzSvgAnchorTypes, SmzSvgPin, SmzSvgRoot, SmzSvgState } from '../../modules/smz-svg/models/smz-svg';
import { SmzSvgPinBuilder, SmzSvgRootBuilder } from './svg-features';

export class SmzSvgFeatureBuilder extends SmzBuilderUtilities<SmzSvgFeatureBuilder> {
  protected that = this;
  constructor(private _svgBuilder: SmzSvgBuilder, private _state: SmzSvgState) {
    super();

    if (this._svgBuilder._state.isDebug) {
      // this._feature.container.styles += ' border-dashed border-2 border-violet-500';
    }
  }

  public root(svgData: string, width: number, height: number): SmzSvgRootBuilder {

    const newFeature: SmzSvgRoot = {
      id: `root_${this._state.features.length}`,
      type: 'root',
      width,
      height,
      svgData,
      position: { x: 0, y: 0 },
      anchor: 'root',
      adaptative: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      transform: null
    };

    this._state.features.push(newFeature);

    return new SmzSvgRootBuilder(this, newFeature, this._svgBuilder);
  }

  public pin(svgData: string, width: number): SmzSvgPinBuilder {

    const newFeature: SmzSvgPin = {
      id: `pin_${this._state.features.length}`,
      type: 'pin',
      width,
      svgData,
      position: { x: 0, y: 0 },
      anchor: 'root',
      adaptative: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      transform: null
    };

    this._state.features.push(newFeature);

    return new SmzSvgPinBuilder(this, newFeature, this._svgBuilder);
  }

  public get svg(): SmzSvgBuilder {
    return this._svgBuilder;
  }
}
