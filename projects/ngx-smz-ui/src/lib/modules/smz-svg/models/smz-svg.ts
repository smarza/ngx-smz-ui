import { Container, Element } from '@svgdotjs/svg.js';
import { MouseButton } from '@svgdotjs/svg.panzoom.js';
import { BehaviorSubject } from 'rxjs';
import { SmzSVGWrapper } from './smz-svg-wrapper';

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
    current: string;
  }
}


export type SmzSvgFeature = SmzSvgRoot | SmzSvgPin;
export type SmzSvgFeatureTypes = 'root' | 'pin';
export interface SmzSvgBaseFeature {
  _element: Element;
  _childrenIds: string[];
  id: string;
  width: number;
  type?: SmzSvgFeatureTypes;
  position: { x: number, y: number };

  // Anchor === 'container' => O position será relativa a todo o container
  // Anchor === 'root' => O position será relativa ao svg importado no root
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
  scope: string;
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

export type SmzSvgAnchorTypes = 'container' | 'root';