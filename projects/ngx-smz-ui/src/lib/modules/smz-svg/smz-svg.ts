import { SmzSVGWrapper } from './smz-svg-wrapper';

export interface SmzSvgData {
  debugMode: boolean;
  svgs: SmzSvg[];
  pan: {
    zoomMin: number;
    zoomMax: number;
  };
  width: string;
  height: string;
  containerClass: string;
}

export interface SmzSvg {
  svgFile: string;
  config: SmzSvgConfig;
}

export interface SmzSvgConfig {

}
