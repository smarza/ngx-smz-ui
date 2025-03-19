import { Directive, OnDestroy, AfterViewInit, ElementRef, HostListener, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { SmzDragEventData } from '../models/drag-event';
import { SmzDraggableService } from '../services/smz-draggable.service';
import { deepCloneNode } from '../utils/clone-node';
import { createPlaceholderElement, dragImportantProperties, matchElementSize } from '../utils/drag-ref';
import { extendStyles, toggleNativeDragInteractions, toggleVisibility } from '../utils/styling';

@Directive({
    selector: '[smzDraggable]',
    host: {
        class: 'p-element'
    },
    standalone: false
})
export class SmzDraggable implements AfterViewInit, OnDestroy {
    @Input() allow: string[] = null;
    @Input() block: string[] = null;
    @Input() dragEffect: string;
    @Input() dragHandle: string;
    @Input() draggingStyles = 'smz-draggable-start';
    @Input() data: any;
    @Input() index: number;

    @Output() onDragStart: EventEmitter<SmzDragEventData> = new EventEmitter();

    @Output() onDragEnd: EventEmitter<SmzDragEventData> = new EventEmitter();

    @Output() onDrag: EventEmitter<SmzDragEventData> = new EventEmitter();

    handle: any;

    dragListener: any;

    mouseDownListener: any;

    mouseUpListener: any;

    _smzDraggableDisabled: boolean;

    constructor(public el: ElementRef, public zone: NgZone, public smzDraggableService: SmzDraggableService) {}

    @Input() get smzDraggableDisabled(): boolean {
        return this._smzDraggableDisabled;
    }
    set smzDraggableDisabled(_smzDraggableDisabled: boolean) {
        this._smzDraggableDisabled = _smzDraggableDisabled;

        if (this._smzDraggableDisabled) {
            this.unbindMouseListeners();
        } else {
            this.el.nativeElement.draggable = true;
            this.bindMouseListeners();
        }
    }

    ngAfterViewInit() {
        if (!this.smzDraggableDisabled) {
            this.el.nativeElement.draggable = true;
            DomHandler.addClass(this.el.nativeElement, 'smz-draggable');
            this.bindMouseListeners();
        }
    }

    bindDragListener() {
        if (!this.dragListener) {
            DomHandler.addClass(this.el.nativeElement, this.draggingStyles);
            this.zone.runOutsideAngular(() => {
                this.dragListener = this.drag.bind(this);
                this.el.nativeElement.addEventListener('drag', this.dragListener);
            });
        }
    }

    unbindDragListener() {
        if (this.dragListener) {
            DomHandler.removeClass(this.el.nativeElement, this.draggingStyles);
            this.zone.runOutsideAngular(() => {
                this.el.nativeElement.removeEventListener('drag', this.dragListener);
                this.dragListener = null;
            });
        }
    }

    bindMouseListeners() {
        if (!this.mouseDownListener && !this.mouseUpListener) {
            this.zone.runOutsideAngular(() => {
                this.mouseDownListener = this.mousedown.bind(this);
                this.mouseUpListener = this.mouseup.bind(this);
                this.el.nativeElement.addEventListener('mousedown', this.mouseDownListener);
                this.el.nativeElement.addEventListener('mouseup', this.mouseUpListener);
            });
        }
    }

    unbindMouseListeners() {
        if (this.mouseDownListener && this.mouseUpListener) {
            this.zone.runOutsideAngular(() => {
                this.el.nativeElement.removeEventListener('mousedown', this.mouseDownListener);
                this.el.nativeElement.removeEventListener('mouseup', this.mouseUpListener);
                this.mouseDownListener = null;
                this.mouseUpListener = null;
            });
        }
    }

    drag(event) {
        this.onDrag.emit({...this.smzDraggableService.current.context, event });
    }

    @HostListener('dragstart', ['$event'])
    dragStart(event) {
        if (this.allowDrag() && !this.smzDraggableDisabled) {
            if (this.dragEffect) {
                event.dataTransfer.effectAllowed = this.dragEffect;
            }

            this.smzDraggableService.current = {
              allowedScopes: this.allow,
              blockedScopes: this.block,
              context: {
                data: this.data,
                oldOrder: this.index,
                newOrder: null
              }
            };

            this.onDragStart.emit({...this.smzDraggableService.current.context, event });

            this.bindDragListener();


            // const element = this.el.nativeElement;
            // const parent = element.parentNode as HTMLElement;

            // // Elemento que vai ficar no lugar do elemento movido
            // const placeholder = createPlaceholderElement(this.el.nativeElement);

            // const initialTransform = element.style.transform || '';
            // const initialClientRect = element.getBoundingClientRect();

            // const preview = deepCloneNode(element);

            // console.log(1, preview);
            // matchElementSize(preview, initialClientRect!);

            // if (initialTransform) {
            //     preview.style.transform = initialTransform;
            // }

            // extendStyles(
            //     preview.style,
            //     {
            //       // It's important that we disable the pointer events on the preview, because
            //       // it can throw off the `document.elementFromPoint` calls in the `CdkDropList`.
            //       'pointer-events': 'none',
            //       // We have to reset the margin, because it can throw off positioning relative to the viewport.
            //       'margin': '0',
            //       'position': 'fixed',
            //       'top': '100',
            //       'right': '0',
            //       'z-index': '1000',
            //     },
            //     dragImportantProperties,
            //   );

            // console.log(2, preview);

            // toggleNativeDragInteractions(preview, false);
            // preview.classList.add('cdk-drag-preview');
            // preview.setAttribute('dir', 'ltr');

            // preview.classList.add('border-1');
            // preview.classList.add('border-solid');
            // preview.classList.add('border-green-500');

            // We move the element out at the end of the body and we make it hidden, because keeping it in
            // place will throw off the consumer's `:last-child` selectors. We can't remove the element
            // from the DOM completely, because iOS will stop firing all subsequent events in the chain.
            // toggleVisibility(element, false, dragImportantProperties);
            //document.body.appendChild(parent.replaceChild(placeholder, element));
            // parent.appendChild(preview);

        } else {
            event.preventDefault();
        }
    }

    @HostListener('dragend', ['$event'])
    dragEnd(event) {
        this.onDragEnd.emit({...this.smzDraggableService.current.context, event });
        this.unbindDragListener();
        this.smzDraggableService.current = null;
    }

    mousedown(event) {
        this.handle = event.target;
    }

    mouseup(event) {
        this.handle = null;
    }

    allowDrag(): boolean {
        if (this.dragHandle && this.handle) return DomHandler.matches(this.handle, this.dragHandle);
        else return true;
    }

    ngOnDestroy() {
        this.unbindDragListener();
        this.unbindMouseListeners();
    }
}