import { Directive, OnDestroy, AfterViewInit, ElementRef, HostListener, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { UUID } from 'angular2-uuid';
import { SmzDragEventData } from '../models/drag-event';
import { SmzDraggableService } from '../services/smz-draggable.service';

@Directive({
    selector: '[smzDroppable]',
    host: {
        class: 'p-element'
    },
    standalone: false
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
            DomHandler.addClass(this.el.nativeElement, 'smz-droppable');
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

