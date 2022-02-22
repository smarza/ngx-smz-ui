import { SmzSVGWrapper } from './smz-svg-wrapper';

export interface SmzSvgData {
  debugMode: boolean;
  features: SmzSvgFeature[];
  pan: {
    zoomMin: number;
    zoomMax: number;
  };
  containerClass: string;
}


export type SmzSvgFeature = SmzSvgRoot | SmzSvgPin;
export type SmzSvgFeatureTypes = 'root' | 'pin';
export interface SmzSvgBaseFeature {
  id: string;
  width: number;
  type: SmzSvgFeatureTypes;
  // Se adapta ao alterar o zoom
  adaptative?: {
    minWidth: number;
    maxWidth: number;
  };
  tooltip?: SmzSvgTooltipData;
}

export interface SmzSvgRoot extends SmzSvgBaseFeature {
  type: 'root';
  svgData: string;
  height: number;

}

export interface SmzSvgPin extends SmzSvgBaseFeature {
  type: 'pin';
  color: string;
  position: { x: number, y: number };
  width: number;
  svgData: string;

}


export interface SmzSvgTooltipData {
  data: string;
}