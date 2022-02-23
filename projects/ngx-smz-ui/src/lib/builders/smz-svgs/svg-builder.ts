import { GlobalInjector } from '../../modules/smz-dialogs/services/global-injector';
import { NgxRbkUtilsConfig } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzDocumentConfig } from '../../modules/smz-documents/models/smz-document-config';
import cloneDeep from 'lodash-es/cloneDeep';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { HTMLOptions, jsPDFOptions } from 'jspdf';
import { SmzDocumentPageFormats, SmzPageFormatsInPt } from '../../modules/smz-documents/models/smz-page-formats';
import { isArray } from '../../common/utils/utils';
import { SmzSvgBaseFeature, SmzSvgFeature, SmzSvgState } from '../../modules/smz-svg/models/smz-svg';
import { SmzSvgFeatureBuilder } from './svg-feature';
import { UUID } from 'angular2-uuid';

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
      width: 0,
      height: 0
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

  public useWindowSize(): SmzSvgBuilder {
    this._state.container.width = window.innerWidth;
    this._state.container.height = window.innerHeight;
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

  public build(): SmzSvgState {

    if (this._state.isDebug) {
      console.log(this._state);
    }

    return this._state;
  }

}
