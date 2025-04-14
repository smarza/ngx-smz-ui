import { deepCloneNode } from './clone-node';

/** Creates an element that will be shown instead of the current element while dragging. */
export function createPlaceholderElement(rootElement: any): HTMLElement {
  let placeholder: HTMLElement = deepCloneNode(rootElement);

  // Stop pointer events on the preview so the user can't
  // interact with it while the preview is animating.
  placeholder.classList.add('cdk-drag-placeholder');
  placeholder.classList.add('border-1');
  placeholder.classList.add('border-solid');
  placeholder.classList.add('border-red-500');
  placeholder.classList.add('cursor-none');

  return placeholder;
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/** Gets a mutable version of an element's bounding `ClientRect`. */
export function getMutableClientRect(element: Element): ClientRect {
  const clientRect = element.getBoundingClientRect();

  // We need to clone the `clientRect` here, because all the values on it are readonly
  // and we need to be able to update them. Also we can't use a spread here, because
  // the values on a `ClientRect` aren't own properties. See:
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect#Notes
  return {
    top: clientRect.top,
    right: clientRect.right,
    bottom: clientRect.bottom,
    left: clientRect.left,
    width: clientRect.width,
    height: clientRect.height,
    x: clientRect.x,
    y: clientRect.y,
  } as ClientRect;
}

/**
 * Updates the top/left positions of a `ClientRect`, as well as their bottom/right counterparts.
 * @param clientRect `ClientRect` that should be updated.
 * @param top Amount to add to the `top` position.
 * @param left Amount to add to the `left` position.
 */
export function adjustClientRect(
  clientRect: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    width: number;
    height: number;
  },
  top: number,
  left: number,
) {
  clientRect.top += top;
  clientRect.bottom = clientRect.top + clientRect.height;

  clientRect.left += left;
  clientRect.right = clientRect.left + clientRect.width;
}

/** Inline styles to be set as `!important` while dragging. */
export const dragImportantProperties = new Set([
  // Needs to be important, because some `mat-table` sets `position: sticky !important`. See #22781.
  'position',
]);

/**
 * Gets a 3d `transform` that can be applied to an element.
 * @param x Desired position of the element along the X axis.
 * @param y Desired position of the element along the Y axis.
 */
function getTransform(x: number, y: number): string {
  // Round the transforms since some browsers will
  // blur the elements for sub-pixel transforms.
  return `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
}

/**
 * Matches the target element's size to the source's size.
 * @param target Element that needs to be resized.
 * @param sourceRect Dimensions of the source element.
 */
export function matchElementSize(target: HTMLElement, sourceRect: ClientRect): void {
  target.style.width = `${sourceRect.width}px`;
  target.style.height = `${sourceRect.height}px`;
  target.style.transform = getTransform(sourceRect.left, sourceRect.top);
}