import { GlobalInjector } from '../../modules/smz-dialogs/services/global-injector';
import { NgxRbkUtilsConfig } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzSvgState } from '../../modules/smz-svg/models/smz-svg';
import { SmzSvgFeatureBuilder } from './svg-feature';
import { BehaviorSubject } from 'rxjs';
import { SmzSvgDispatchBuilder } from './svg-dispatch';
import uniq from 'lodash-es/uniq';
import { SmzSvgWorldCoordinatesBuilder } from './svg-world-coordinates';

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
    worldCoordinates: {
      enabled: false,
      rootWidth: 0,
      rootHeight: 0,
      refPoints: []
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
      current: []
    },
    init: {
      reset: true,
      afterInit: () => {}
    },
    performance: {
      zoomDebounce: 100,
      animationTime: 150
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

  public avoidResetOnInit(): SmzSvgBuilder {
    this._state.init.reset = false;
    return this;
  }

  public executeAfterInit(callback: () => void): SmzSvgBuilder {
    this._state.init.afterInit = callback;
    return this;
  }

  public setInitialScopes(scopes: string[]): SmzSvgBuilder {
    this._state.scope.current = scopes;
    return this;
  }

  public enhancePerformance(): SmzSvgBuilder {
    this._state.performance.zoomDebounce = 400;
    this._state.performance.animationTime = 50;
    return this;
  }

  public setZoomDebounce(milliseconds: number): SmzSvgBuilder {

    if (milliseconds >= 0) {
      throw new Error(`You cannot set Zoom Debounce bellow zero`);
    }

    this._state.performance.zoomDebounce = milliseconds;
    return this;
  }

  public setAnimationTime(milliseconds: number): SmzSvgBuilder {

    if (milliseconds >= 0) {
      throw new Error(`You cannot set Animation Time bellow zero`);
    }

    this._state.performance.animationTime = milliseconds;
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

  public useWorldCoordinates(): SmzSvgWorldCoordinatesBuilder {
    return new SmzSvgWorldCoordinatesBuilder(this, this._state);
  }

  public build(): SmzSvgState {

    const all = [];

    this._state.features
      .filter(x => x.scopes != null)
      .map(x => x.scopes)
      .forEach((scopes) => {
        all.push(...scopes);
      })

    this._state.scope.all = uniq(all);

    if (this._state.isDebug) {
      console.log(this._state);
    }

    return this._state;
  }

}
