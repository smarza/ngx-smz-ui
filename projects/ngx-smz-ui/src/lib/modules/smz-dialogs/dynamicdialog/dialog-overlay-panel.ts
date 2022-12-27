import { DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import { deepCloneNode } from '../../../standalones/smz-drag-drop/utils/clone-node';
import { SmzDialogOverlayPanel } from '../models/smz-dialogs';

export class DialogOverlayPanel {
  private placeholder: HTMLElement;
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

    // this.handlePlaceholder();
    this.handleOverlayDimensions();
    this.handleOverlayDepth();
    this.handleOverlayPosition();

  }

  private handlePlaceholder(): void {

    const placeholder: HTMLElement = deepCloneNode(this.target);

    ZIndexUtils.set('overlay', placeholder, this.config.baseZIndex - 1);
    // DomHandler.addClass(placeholder, 'smz-ui-guides-target');
    DomHandler.addClass(placeholder, 'fixed');
    DomHandler.addClass(placeholder, 'select-none');
    DomHandler.addClass(placeholder, 'bg-white');
    DomHandler.addClass(placeholder, 'rounded');
    DomHandler.addClass(placeholder, 'pointer-events-none');
    DomHandler.addClass(placeholder, 'outline');
    DomHandler.addClass(placeholder, 'outline-4');
    DomHandler.addClass(placeholder, 'outline-red-500');
    DomHandler.addClass(placeholder, 'outline-offset-0');
    DomHandler.addClass(placeholder, 'shadow-lg');

    placeholder.classList.forEach(styleClass => {
      if (styleClass.startsWith('h-') || styleClass.startsWith('w-')) {
        placeholder.classList.remove(styleClass);
      }
    });

    const offset = getOffset(this.target);

    const initialClientRect = this.target.getBoundingClientRect();

    placeholder.style.transform = '';
    placeholder.style.width = `${initialClientRect.width}px`;
    placeholder.style.height = `${initialClientRect.height}px`;
    placeholder.style.top = `${offset.top}px`;
    placeholder.style.left = `${offset.left}px`;

    console.log('initialClientRect', initialClientRect);
    console.log('offset', offset);
    console.log('target', this.target);
    console.log('placeholder', placeholder);

    this.mask.appendChild(placeholder);
  }

  private handleOverlayClip(): void {

    DomHandler.addClass(this.target, 'pointer-events-none');

    const position = this.target.getBoundingClientRect();
    const screen = this.mask.getBoundingClientRect();
    const offset = getOffset(this.target);

    const percentLeft = offset.left / screen.width * 100;
    const percentRight = (offset.left + position.width) / screen.width * 100;
    const percentTop = offset.top / screen.height * 100;
    const percentBottom = (offset.top + position.height) / screen.height * 100;

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

    absolutePosition(this.container, this.target, this.config);

    const containerOffset = DomHandler.getOffset(this.container);
    const targetOffset = DomHandler.getOffset(this.target);
    let arrowLeft = 0;

    if (containerOffset.left < targetOffset.left) {
      arrowLeft = targetOffset.left - containerOffset.left;
    }
    this.container.style.setProperty('--overlayArrowLeft', `${arrowLeft}px`);

    if (containerOffset.top < targetOffset.top) {
      DomHandler.addClass(this.container, 'p-overlaypanel-flipped');
    }

  }

}

function absolutePosition(element: any, target: any, config: SmzDialogOverlayPanel): void {
  // debugger;
  const elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : getHiddenElementDimensions(element);
  const elementOuterHeight = elementDimensions.height;
  const elementOuterWidth = elementDimensions.width;
  const targetOuterHeight = target.offsetHeight;
  const targetOuterWidth = target.offsetWidth;
  const targetOffset = target.getBoundingClientRect();
  const windowScrollTop = getWindowScrollTop();
  const windowScrollLeft = getWindowScrollLeft();
  const viewport = getViewport();
  const extraOffsetX = targetOuterWidth * (config.offsetX / 100);
  const extraOffsetY = targetOuterHeight * (config.offsetY / 100);

  let top: number, left: number;

  if (targetOffset.top + elementOuterHeight + extraOffsetY > viewport.height) {
      top = targetOffset.top + windowScrollTop - elementOuterHeight + extraOffsetY;
      element.style.transformOrigin = 'bottom';

      if (top < 0) {
          top = windowScrollTop;
      }
  } else {
      top = targetOffset.top + (config.centerX ? (targetOuterHeight / 2) : 0) + windowScrollTop + extraOffsetY;
      element.style.transformOrigin = 'top';
  }

  if ((targetOffset.left + elementOuterWidth + extraOffsetX) > viewport.width){
    left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth + extraOffsetX);
  }
  else {
    left = targetOffset.left + (config.centerY ? (targetOuterWidth / 2) : 0 ) + windowScrollLeft + extraOffsetX;
  }

  element.style.top = top + 'px';
  element.style.left = left + 'px';
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