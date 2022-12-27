import { DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import { deepCloneNode } from '../../../standalones/smz-drag-drop/utils/clone-node';
import { SmzDialogOverlayPanel } from '../models/smz-dialogs';
import { cloneDeep } from 'lodash';

export class DialogOverlayPanel {
  private target: HTMLElement;
  constructor(private config: SmzDialogOverlayPanel, private container: HTMLDivElement, private mask: HTMLDivElement, private overlayClip: HTMLDivElement) {
    const elementId = this.config.targetElementId;
    this.target = document.getElementById(elementId);
  }

  public kill(): void {
    DomHandler.removeClass(this.target, 'pointer-events-none');
  }

  public initializeOverlay(): void {

    if (this.config.highlight) {
      this.handleOverlayClip();
    }

    this.handleOverlayDimensions();
    this.handleOverlayDepth();
    this.handleOverlayPosition();

  }

  private handleOverlayClip(): void {

    DomHandler.addClass(this.target, 'pointer-events-none');

    const position = this.target.getBoundingClientRect();
    const screen = this.mask.getBoundingClientRect();
    const offset = getOffset(this.target);
    const margin = this.config.hightlightMargin;

    const percentLeft = (offset.left - margin) / screen.width * 100;
    const percentRight = (offset.left + position.width + margin) / screen.width * 100;
    const percentTop = (offset.top - margin) / screen.height * 100;
    const percentBottom = (offset.top + position.height + margin) / screen.height * 100;

    // console.log('screen', screen);
    // console.log('offset', offset);
    // console.log('position', position);
    // console.log('percentLeft', percentLeft);
    // console.log('percentRight', percentRight);
    // console.log('percentTop', percentTop);
    // console.log('percentBottom', percentBottom);

    const topLeft = { x: percentLeft, y: percentTop };
    const topRight = { x: percentRight, y: percentTop };
    const bottomLeft = { x: percentLeft, y: percentBottom };
    const bottomRight = { x: percentRight, y: percentBottom };

    this.overlayClip.style.clipPath = `polygon(0% 0%, 0% 100%, ${bottomLeft.x}% 100%, ${topLeft.x}% ${topLeft.y}%, ${topRight.x}% ${topRight.y}%, ${bottomRight.x}% ${bottomRight.y}%, ${bottomLeft.x}% ${bottomLeft.y}%, ${bottomLeft.x}% 100%, 100% 100%, 100% 0%)`;
  }

  private handleOverlayDimensions(): void {
    this.overlayClip.style.zIndex =  this.mask.style.zIndex;
    this.container.style.setProperty('width', this.config.width);
    this.container.style.setProperty('height', this.config.height);
    DomHandler.addClass(this.container, 'p-overlaypanel');
  }

  private handleOverlayDepth(): void {
    ZIndexUtils.set('overlay', this.container, this.config.baseZIndex);
  }

  private handleOverlayPosition(): void {

    const arrowHalfWidth = 10;

    const containerOffset = absolutePosition(this.container, this.target, this.config);
    const targetOffset = getOffset(this.target);

    const targetOffsetTop =  targetOffset.top - this.config.hightlightMargin;
    const targetOffsetLeft =  targetOffset.left - this.config.hightlightMargin;

    let arrowLeft = 0;

    if (containerOffset.left < targetOffsetLeft) {
      // Right Side of the window
      arrowLeft = targetOffsetLeft - containerOffset.left + arrowHalfWidth;
    }
    else {
      // Left Side of the window
    }

    this.container.style.setProperty('--overlayArrowLeft', `${arrowLeft}px`);

    if (containerOffset.top < targetOffsetTop) {
      DomHandler.addClass(this.container, 'p-overlaypanel-flipped');
    }

  }

}

function absolutePosition(element: any, target: any, config: SmzDialogOverlayPanel): { left: number, top: number } {

  const elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : getHiddenElementDimensions(element);
  const elementOuterHeight = elementDimensions.height;
  const elementOuterWidth = elementDimensions.width;
  const targetOuterHeight = target.offsetHeight + config.hightlightMargin;
  const targetOuterWidth = target.offsetWidth + config.hightlightMargin;
  const targetOffset = target.getBoundingClientRect();
  const windowScrollTop = getWindowScrollTop();
  const windowScrollLeft = getWindowScrollLeft();
  const viewport = getViewport();
  const extraOffsetX = targetOuterWidth * (config.offsetX / 100);
  const extraOffsetY = targetOuterHeight * (config.offsetY / 100);

  const arrowHalfWidth = 10;

  const targetOffsetTop =  targetOffset.top - config.hightlightMargin;
  const targetOffsetLeft =  targetOffset.left - config.hightlightMargin;

  let top: number, left: number;

  if (targetOffsetTop + elementOuterHeight + extraOffsetY > viewport.height) {
      top = targetOffsetTop + windowScrollTop - elementOuterHeight + extraOffsetY;
      element.style.transformOrigin = 'bottom';

      if (top < 0) {
          top = windowScrollTop;
      }
  } else {
      top = targetOffsetTop + windowScrollTop + extraOffsetY;
      element.style.transformOrigin = 'top';
  }

  if ((targetOffsetLeft + elementOuterWidth + extraOffsetX) > viewport.width){
    // Right Side of the window
    left = Math.max(0, targetOffsetLeft - arrowHalfWidth + windowScrollLeft + targetOuterWidth - elementOuterWidth + extraOffsetX);
  }
  else {
    // Left Side of the window
    left = targetOffsetLeft - arrowHalfWidth + windowScrollLeft + extraOffsetX;
  }

  element.style.top = top + 'px';
  element.style.left = left + 'px';

  return {
    left,
    top
  };
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function getWindowScrollTop(): number {
  let doc = document.documentElement;
  return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
}

function getWindowScrollLeft(): number {
  let doc = document.documentElement;
  return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
}

function getViewport(): any {
  let win = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      w = win.innerWidth || e.clientWidth || g.clientWidth,
      h = win.innerHeight || e.clientHeight || g.clientHeight;

  return { width: w, height: h };
}

function getHiddenElementDimensions(element: any): any {
  let dimensions: any = {};
  element.style.visibility = 'hidden';
  element.style.display = 'block';
  dimensions.width = element.offsetWidth;
  dimensions.height = element.offsetHeight;
  element.style.display = 'none';
  element.style.visibility = 'visible';

  return dimensions;
}