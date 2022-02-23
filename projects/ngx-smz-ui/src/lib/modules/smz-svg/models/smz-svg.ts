import { MouseButton } from '@svgdotjs/svg.panzoom.js';
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
    width: number;
    height: number;
  }
}


export type SmzSvgFeature = SmzSvgRoot | SmzSvgPin;
export type SmzSvgFeatureTypes = 'root' | 'pin';
export interface SmzSvgBaseFeature {
  id: string;
  width: number;
  type?: SmzSvgFeatureTypes;
  // Se adapta ao alterar o zoom
  adaptative: {
    enabled: boolean;
    minWidth?: number;
    maxWidth?: number;
  };
  tooltip: SmzSvgTooltipData;
}

export interface SmzSvgRoot extends SmzSvgBaseFeature {
  type: 'root';
  svgData: string;
  height: number;

}

export interface SmzSvgPin extends SmzSvgBaseFeature {
  type: 'pin';
  color?: string;
  position: { x: number, y: number };
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