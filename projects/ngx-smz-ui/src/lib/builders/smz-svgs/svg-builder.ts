import { GlobalInjector } from '../../modules/smz-dialogs/services/global-injector';
import { NgxRbkUtilsConfig } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzSvgState } from '../../modules/smz-svg/models/smz-svg';
import { SmzSvgFeatureBuilder } from './svg-feature';
import { BehaviorSubject } from 'rxjs';
import { SmzSvgDispatchBuilder } from './svg-dispatch';
import uniq from 'lodash-es/uniq';

export class SmzSvgBuilder extends SmzBuilderUtilities<SmzSvgBuilder> {
  protected that = this;
  private defaultConfig = GlobalInjector.instance.get(NgxRbkUtilsConfig);
  public _state: SmzSvgState = {
    isDebug: false,
    features: [],
    panZoom: {
      enabled: false,
      zoomMin: 1,
      zoomMax: 1
    },
    containerClass: '',
    container: {
      useWindowSize: true,
      width: 0,
      height: 0
    },
    dispatch: {
      zoomToId: new BehaviorSubject(null),
      zoomToPosition: new BehaviorSubject(null),
      draw: new BehaviorSubject(null),
      reset: new BehaviorSubject(null),
      setScopes: new BehaviorSubject(null)
    },
    scope: {
      all: [],
      current: null
    }
  };

  constructor(state: SmzSvgState = null) {
    super();

    if (state != null) {
      this._state = state;
    }

  }

  public debugMode(): SmzSvgBuilder {
    this._state.isDebug = true;
    return this;
  }

  public setContainerStyles(styleClass: string): SmzSvgBuilder {
    this._state.containerClass = styleClass;
    return this;
  }

  public setContainerSize(width: number, height: number): SmzSvgBuilder {
    this._state.container.useWindowSize = false;
    this._state.container.width = width;
    this._state.container.height = height;
    return this;
  }

  public usePan(): SmzSvgBuilder {
    this._state.panZoom.enabled = true;
    this._state.panZoom.panning = true;
    return this;
  }

  public useMouseZoom(min: number, max: number, factor?: number): SmzSvgBuilder {

    if (this._state.panZoom.pinchZoom) {
      throw new Error(`You cannot use both mouse and touch zoom at the same time.`);
    }

    this._state.panZoom.enabled = true;
    this._state.panZoom.zoomMin = min;
    this._state.panZoom.zoomMax = max;
    this._state.panZoom.wheelZoom = true;

    this._state.panZoom.zoomFactor = factor;

    return this;
  }

  public useTouchZoom(min: number, max: number): SmzSvgBuilder {

    if (this._state.panZoom.wheelZoom) {
      throw new Error(`You cannot use both mouse and touch zoom at the same time.`);
    }

    this._state.panZoom.enabled = true;
    this._state.panZoom.zoomMin = min;
    this._state.panZoom.zoomMax = max;
    this._state.panZoom.pinchZoom = true;

    return this;
  }

  public feature(): SmzSvgFeatureBuilder {
    return new SmzSvgFeatureBuilder(this, this._state);
  }

  public dispatch(): SmzSvgDispatchBuilder {
    return new SmzSvgDispatchBuilder(this, this._state);
  }

  public build(): SmzSvgState {

    this._state.scope.all = uniq(
      this._state.features
        .filter(x => x.scope != null)
        .map(x => x.scope)
      );

    if (this._state.isDebug) {
      console.log(this._state);
    }

    return this._state;
  }

}
