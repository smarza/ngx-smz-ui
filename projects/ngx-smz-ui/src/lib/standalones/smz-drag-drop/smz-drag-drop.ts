import { NgModule, Directive, OnDestroy, AfterViewInit, ElementRef, HostListener, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { UUID } from 'angular2-uuid';
import { Injectable } from '@angular/core';

export interface SmzDragEventData {
  data: any;
  oldOrder: number;
  newOrder: number;
  event?: any;
}

interface SmzDragEvent {
  context: SmzDragEventData;
  allowedScopes: string[];
  blockedScopes: string[];

}

@Injectable({providedIn: 'root'})
export class SmzDraggableService {
  public current: SmzDragEvent = null;
  constructor() { }

}

@Directive({
    selector: '[smzDraggable]',
    host: {
        class: 'p-element'
    }
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

@Directive({
    selector: '[smzDroppable]',
    host: {
        class: 'p-element'
    }
})
export class SmzDroppable implements AfterViewInit, OnDestroy {
    @Input('smzDroppable') scope: string | string[];
    @Input() smzDroppableDisabled: boolean;
    @Input() dropEffect: string;
    @Input() enterStyles = 'smz-draggable-enter';
    @Output() onDragEnter: EventEmitter<SmzDragEventData> = new EventEmitter();
    @Output() onDragLeave: EventEmitter<SmzDragEventData> = new EventEmitter();
    @Output() onDrop: EventEmitter<SmzDragEventData> = new EventEmitter();

    @Output() onDropBlocked: EventEmitter<SmzDragEventData> = new EventEmitter();
    public key = UUID.UUID();
    public counter = 0;

    constructor(public el: ElementRef, public zone: NgZone, public smzDraggableService: SmzDraggableService) {}

    dragOverListener: any;

    ngAfterViewInit() {
        if (!this.smzDroppableDisabled) {
            this.bindDragOverListener();
        }

        this.el.nativeElement.setAttribute('key', this.key);
    }

    bindDragOverListener() {
        if (!this.dragOverListener) {
            this.counter = 0;
            this.zone.runOutsideAngular(() => {
                this.dragOverListener = this.dragOver.bind(this);
                this.el.nativeElement.addEventListener('dragover', this.dragOverListener);
            });
        }
    }

    unbindDragOverListener() {
        if (this.dragOverListener) {
            this.zone.runOutsideAngular(() => {
                this.el.nativeElement.removeEventListener('dragover', this.dragOverListener);
                this.dragOverListener = null;
            });
        }
    }

    dragOver(event) {
        event.preventDefault();
    }

    @HostListener('drop', ['$event'])
    drop(event) {
        this.counter = 0;
        DomHandler.removeClass(this.el.nativeElement, this.enterStyles);
        if (this.allowDrop()) {
            event.preventDefault();
            this.onDrop.emit({...this.smzDraggableService.current.context, event });
        }
        else {
          this.onDropBlocked.emit({...this.smzDraggableService.current.context, event });
        }
    }

    @HostListener('dragenter', ['$event'])
    dragEnter(event) {
        this.counter++;

        event.preventDefault();

        if (this.dropEffect) {
            event.dataTransfer.dropEffect = this.dropEffect;
        }

        if (this.allowDrop()) {
          DomHandler.addClass(this.el.nativeElement, this.enterStyles);
        }

        this.onDragEnter.emit({...this.smzDraggableService.current.context, event });
    }

    @HostListener('dragleave', ['$event'])
    dragLeave(event) {
        event.preventDefault();

        this.counter--;

        if (this.counter === 0) {
          DomHandler.removeClass(this.el.nativeElement, this.enterStyles);
        }

        this.onDragLeave.emit({...this.smzDraggableService.current.context, event });
    }

    allowDrop(): boolean {
        const allowedScopes = this.smzDraggableService.current.allowedScopes;
        const blockedScopes = this.smzDraggableService.current.blockedScopes;
        const scopes: string[] = typeof this.scope == 'string' ? [this.scope] : this.scope;

        const hasAnyAllowed = allowedScopes  == null ? true : scopes.find(x => allowedScopes.includes(x)) != null;
        const hasAnyBlocked = blockedScopes  == null ? false : scopes.find(x => blockedScopes.includes(x)) != null;

        if (hasAnyAllowed && !hasAnyBlocked) {
          return true;
        }

        return false;
    }

    ngOnDestroy() {
        this.unbindDragOverListener();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [SmzDraggable, SmzDroppable],
    declarations: [SmzDraggable, SmzDroppable]
})
export class SmzDragDropModule {}