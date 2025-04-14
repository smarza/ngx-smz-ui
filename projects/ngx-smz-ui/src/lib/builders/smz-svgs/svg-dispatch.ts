
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzSvgBuilder } from './svg-builder';
import { SmzSvgPin, SmzSvgRoot, SmzSvgState } from '../../modules/smz-svg/models/smz-svg';
import { SmzSvgPinBuilder, SmzSvgRootBuilder } from './svg-features';

export class SmzSvgDispatchBuilder extends SmzBuilderUtilities<SmzSvgDispatchBuilder> {
  protected override that = this;
  constructor(private _svgBuilder: SmzSvgBuilder, private _state: SmzSvgState) {
    super();

    if (this._svgBuilder._state.isDebug) {
      // this._feature.container.styles += ' border-dashed border-2 border-violet-500';
    }
  }

  public panToId(): SmzSvgDispatchBuilder {
    return this.that;
  }


  public get svg(): SmzSvgBuilder {
    return this._svgBuilder;
  }
}
