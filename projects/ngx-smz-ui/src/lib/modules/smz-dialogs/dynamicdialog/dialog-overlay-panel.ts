import { DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import { deepCloneNode } from '../../../standalones/smz-drag-drop/utils/clone-node';
import { matchElementSize } from '../../../standalones/smz-drag-drop/utils/drag-ref';
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

    this.handleOverlayClip();
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

    console.log('screen', screen);
    console.log('offset', offset);
    console.log('position', position);
    console.log('percentLeft', percentLeft);
    console.log('percentRight', percentRight);
    console.log('percentTop', percentTop);
    console.log('percentBottom', percentBottom);

    const topLeft = { x: percentLeft, y: percentTop };
    const topRight = { x: percentRight, y: percentTop };
    const bottomLeft = { x: percentLeft, y: percentBottom };
    const bottomRight = { x: percentRight, y: percentBottom };
    // const topLeft = { x: 25, y: 25 };
    // const topRight = { x: 75, y: 25 };
    // const bottomLeft = { x: 25, y: 75 };
    // const bottomRight = { x: 75, y: 75 };
    this.overlayClip.style.clipPath = `polygon(0% 0%, 0% 100%, ${bottomLeft.x}% 100%, ${topLeft.x}% ${topLeft.y}%, ${topRight.x}% ${topRight.y}%, ${bottomRight.x}% ${bottomRight.y}%, ${bottomLeft.x}% ${bottomLeft.y}%, ${bottomLeft.x}% 100%, 100% 100%, 100% 0%)`;
    this.overlayClip.style.zIndex =  this.mask.style.zIndex;
  }

  private handleOverlayDimensions(): void {

    this.container.style.setProperty('width', this.config.width);
    DomHandler.addClass(this.container, 'p-overlaypanel');

  }

  private handleOverlayDepth(): void {

    ZIndexUtils.set('overlay', this.container, this.config.baseZIndex);

  }

  private handleOverlayPosition(): void {

    DomHandler.alignOverlay(this.container, this.target, 'body');

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

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}