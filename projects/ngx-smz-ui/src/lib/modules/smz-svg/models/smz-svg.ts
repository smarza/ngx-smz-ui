import { Container, Element } from '@svgdotjs/svg.js';
import { MouseButton } from '@svgdotjs/svg.panzoom.js';
import { BehaviorSubject } from 'rxjs';
import { SmzSVGWrapper } from './smz-svg-wrapper';
import { SmzSvgRefPoint, SmzSvgWorldCoordinates } from './world-coordinates';

export interface SmzSvgState {
  isDebug: boolean;
  features: SmzSvgFeature[];
  panZoom: {
    enabled: boolean;
    panning?: boolean
    pinchZoom?: boolean
    wheelZoom?: boolean
    panButton?: MouseButton
    oneFingerPan?: boolean
    margins?: boolean | marginOptions
    zoomFactor?: number
    zoomMin?: number
    zoomMax?: number
  };
  worldCoordinates: {
    enabled: boolean;
    rootWidth: number;
    rootHeight: number;
    refPoints: SmzSvgRefPoint[];
  }
  containerClass: string;
  container: {
    useWindowSize: boolean;
    width?: number;
    height?: number;
  },
  dispatch: {
    zoomToId: BehaviorSubject<{ elementId: string, zoom: number }>;
    zoomToPosition: BehaviorSubject<{ x: number, y: number, zoom: number }>;
    draw: BehaviorSubject<{ callback: (draw: SmzSVGWrapper) => void }>;
    reset: BehaviorSubject<void>;
    setScopes: BehaviorSubject<string[]>;
  }
  scope: {
    all: string[];
    current: string[];
  }
  init: {
    reset: boolean;
    afterInit: () => void
  }
  performance: {
    zoomDebounce: number;
    animationTime: number;
  }
}


export type SmzSvgFeature = SmzSvgRoot | SmzSvgPin;
export type SmzSvgFeatureTypes = 'root' | 'pin';
export interface SmzSvgBaseFeature {
  _element: Element;
  _childrenIds: string[];
  _visible: boolean;
  id: string;
  width: number;
  type?: SmzSvgFeatureTypes;
  dynamicBuild: {
    callback: (rootContainer: Container, feature: SmzSvgBaseFeature) => Element
  }
  position: {
    x: number;
    y: number;
  };

  // Anchor === 'container' => O position será relativa a todo o container
  // Anchor === 'root' => O position será relativa ao svg importado no root
  // Anchor === 'world' => A posição será calculada com base nas cordenadas do mundo... aceitando latitude e longitude
  anchor: SmzSvgAnchorTypes;

  // Se adapta ao alterar o zoom
  adaptative: {
    enabled: boolean;
    minWidth?: number;
    maxWidth?: number;
  };
  tooltip: SmzSvgTooltipData;
  transform: (container: Container, elementId: string, feature: SmzSvgFeature, draw: SmzSVGWrapper) => void;
  color: string;
  stroke: string;
  styleClass: string;
  highlight: {
    enabled: boolean;
    color: string;
  };
  click: {
    enabled: boolean;
    navigate: boolean;
    callback: (id: string, svg: SmzSVGWrapper, data: any) => void
  };
  dbClick: {
    enabled: boolean;
    navigate: boolean;
    callback: (id: string, svg: SmzSVGWrapper, data: any) => void
  };
  focus: {
    zoom: number;
  };
  data: any;
  scopes: string[];
  isDisabled: boolean;
}

export interface SmzSvgRoot extends SmzSvgBaseFeature {
  type: 'root';
  svgData: string;
  height: number;
}

export interface SmzSvgPin extends SmzSvgBaseFeature {
  type: 'pin';
  width: number;
  svgData: string;

}


export interface SmzSvgTooltipData {
  enabled: boolean;
  data?: string;
}



interface marginOptions {
  left: number
  top: number
  right: number
  bottom: number
}

export type SmzSvgAnchorTypes = 'container' | 'root' | 'world';