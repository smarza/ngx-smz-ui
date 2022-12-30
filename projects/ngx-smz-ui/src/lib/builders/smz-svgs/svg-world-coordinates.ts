
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzSvgBuilder } from './svg-builder';
import { SmzSvgState } from '../../modules/smz-svg/models/smz-svg';
import { SmzSvgRefPoint } from '../../modules/smz-svg/models/world-coordinates';

export class SmzSvgWorldCoordinatesBuilder extends SmzBuilderUtilities<SmzSvgWorldCoordinatesBuilder> {
  protected that = this;
  constructor(private _svgBuilder: SmzSvgBuilder, private _state: SmzSvgState) {
    super();

    _state.worldCoordinates.enabled = true;
  }

  public addRefPoint(point: SmzSvgRefPoint): SmzSvgWorldCoordinatesBuilder {
    this._state.worldCoordinates.refPoints.push(point);
    return this.that;
  }

  public get worldCoordinates(): SmzSvgBuilder {

    if (this._state.worldCoordinates.refPoints.length !== 2) {
      throw new Error(`You need to set two reference points to use world coordinates`);
    }

    return this._svgBuilder;
  }

}
