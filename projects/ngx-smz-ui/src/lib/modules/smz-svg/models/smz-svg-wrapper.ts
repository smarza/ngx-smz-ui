import { MouseButton } from '@svgdotjs/svg.panzoom.js';
import { Container } from '@svgdotjs/svg.js';
import { Point } from '@svgdotjs/svg.js';

interface marginOptions {
  left: number
  top: number
  right: number
  bottom: number
}

interface options {
  panning?: boolean
  pinchZoom?: boolean
  wheelZoom?: boolean
  panButton?: MouseButton
  oneFingerPan?: boolean
  margins?: boolean | marginOptions
  zoomFactor?: number
  zoomMin?: number
  zoomMax?: number
}


export interface SmzSVGWrapper extends Container {
  panZoom(options?: options | false): this

}

export interface SvgZoomEvent {
  level: number,
  focus: Point
}