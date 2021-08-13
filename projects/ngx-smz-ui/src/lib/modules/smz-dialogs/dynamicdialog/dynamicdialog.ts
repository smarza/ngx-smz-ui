import { Component, NgModule, Type, ComponentFactoryResolver, ViewChild, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef, Renderer2, NgZone, ElementRef, ChangeDetectionStrategy, ViewRef, HostListener, HostBinding, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, style, transition, animate, AnimationEvent, animation, useAnimation } from '@angular/animations';
import { DynamicDialogContent, DynamicDialogFooter } from './dynamicdialogcontent';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { DynamicDialogRef } from './dynamicdialog-ref';
import { SmzDynamicDialogConfig } from '../models/smz-dialogs';

const showAnimation = animation([
    style({ transform: '{{transform}}', opacity: 0 }),
    animate('{{transition}}', style({ transform: 'none', opacity: 1 }))
]);

const hideAnimation = animation([
    animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))
]);

@Component({
    selector: 'smz-dynamicDialog',
    template: `
        <div #mask [ngClass]="{'ui-dialog-mask ui-dialog-visible':true, 'ui-widget-overlay ui-dialog-mask-scrollblocker': config.modal !== false}" class="smz_form_grid_container">
            <div [ngClass]="{'ui-dialog ui-dynamicdialog ui-widget ui-widget-content ui-corner-all ui-shadow':true, 'ui-dialog-rtl': config.rtl, 'ui-dialog-maximized': maximized}" [ngStyle]="config.style" [class]="config.styleClass"
                [@animation]="{value: 'visible', params: {transform: transformOptions, transition: config.transitionOptions || '150ms cubic-bezier(0, 0, 0.2, 1)'}}"
                (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)" role="dialog" *ngIf="visible"
                [style.width]="config.width" [style.height]="config.height">
                <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top" *ngIf="config.showHeader === false ? false: true">
                    <span class="ui-dialog-title">{{config.header}}</span>
                    <div class="ui-dialog-titlebar-icons" [ngClass]="{ 'disable-a': dialogConfig.data._context.isGlobalDisabled }">
                        <a [ngClass]="'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all'" tabindex="0" role="button" (click)="maximize()" *ngIf="config.maximizable !== false">
                            <span [ngClass]="maximized ? minimizeIcon : maximizeIcon"></span>
                        </a>
                        <a [ngClass]="'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all'" tabindex="0" role="button" (click)="close()" *ngIf="config.closable !== false">
                            <span class="pi pi-times"></span>
                        </a>
                    </div>
                </div>
                <div class="ui-dialog-content ui-widget-content" [ngStyle]="config.contentStyle" [ngClass]="{ 'disable-ui-dialog-content': dialogConfig.data._context.isGlobalDisabled }">
                    <ng-template pDynamicDialogContent></ng-template>
                </div>
                <div class="ui-dialog-footer ui-widget-content" *ngIf="config.footer" [ngClass]="{ 'disable-container': dialogConfig.data._context.isGlobalDisabled }">
                    <ng-template pDynamicDialogFooter></ng-template>
                </div>
            </div>
        </div>
	`,
    animations: [
        trigger('animation', [
            transition('void => visible', [
                useAnimation(showAnimation)
            ]),
            transition('visible => void', [
                useAnimation(hideAnimation)
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.Default
})
export class DynamicDialogComponent implements AfterViewInit, OnInit, OnDestroy
{

    visible: boolean = true;

    componentRef: ComponentRef<any>;

    mask: HTMLDivElement;

    @ViewChild(DynamicDialogContent) insertionPoint: DynamicDialogContent;
    @ViewChild(DynamicDialogFooter) insertionFooter: DynamicDialogFooter;

    @ViewChild('mask') maskViewChild: ElementRef;

    childComponentType: Type<any>;
    footerComponentType: Type<any>;

    container: HTMLDivElement;

    wrapper: HTMLElement;

    documentKeydownListener: any;

    documentEscapeListener: Function;

    maskClickListener: Function;

    transformOptions: string = "scale(0.7)";
    @HostBinding('attr.id') domId = 'smz-dialog';
    minimizeIcon: string = 'pi pi-window-minimize';
    maximizeIcon: string = 'pi pi-window-maximize';
    @Output() onMaximize: EventEmitter<any> = new EventEmitter();
    maximized: boolean;

    preMaximizeContentHeight: number;

    preMaximizeContainerWidth: number;

    preMaximizeContainerHeight: number;

    preMaximizePageX: number;

    preMaximizePageY: number;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef, public renderer: Renderer2,
        public config: DynamicDialogConfig, private dialogRef: DynamicDialogRef, public zone: NgZone, public dialogConfig: SmzDynamicDialogConfig) { }

    ngOnInit()
    {
        if (this.config.domElementId != null) this.domId = this.config.domElementId;
    }

    ngAfterViewInit()
    {
        this.loadChildComponent(this.childComponentType);

        if (this.config.footer != null && this.config.footer != '')
        {
            this.loadFooterComponent(this.footerComponentType);
        }

        this.cd.detectChanges();
    }

    @HostListener('document:keydown.escape', ['$event']) onEscapeHandler(event: KeyboardEvent)
    {
        if (this.config?.closeOnEscape && !this.dialogConfig.data._context.isLoading)
        {
            this.close();
        }
    }

    loadChildComponent(componentType: Type<any>)
    {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

        if (this.insertionPoint == null) {
            console.warn('insertionPoint null', componentType, this);
        }
        else {
            let viewContainerRef = this.insertionPoint.viewContainerRef;
            viewContainerRef.clear();

            this.componentRef = viewContainerRef.createComponent(componentFactory);
        }
    }

    loadFooterComponent(componentType: Type<any>)
    {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

        if (this.insertionFooter == null) {
            console.warn('insertionFooter null', componentType, this);
        }
        else {
            let viewContainerRef = this.insertionFooter.viewContainerRef;
            viewContainerRef.clear();

            this.componentRef = viewContainerRef.createComponent(componentFactory);
        }

    }

    moveOnTop()
    {
        if (this.config.autoZIndex !== false)
        {
            const zIndex = (this.config.baseZIndex || 0) + (++DomHandler.zindex);
            this.container.style.zIndex = String(zIndex);
            this.maskViewChild.nativeElement.style.zIndex = String(zIndex - 1);
        }
    }

    onAnimationStart(event: AnimationEvent)
    {
        switch (event.toState)
        {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container.parentElement;
                this.moveOnTop();
                this.bindGlobalListeners();

                if (this.config.modal !== false)
                {
                    this.enableModality();
                }
                this.focus();
                break;

            case 'void':
                this.onContainerDestroy();
                break;
        }
    }

    onAnimationEnd(event: AnimationEvent)
    {
        if (event.toState === 'void')
        {
            this.dialogRef.destroy();
        }
    }

    onContainerDestroy()
    {
        this.unbindGlobalListeners();

        if (this.maximized) {
            DomHandler.removeClass(document.body, 'p-overflow-hidden');
            this.maximized = false;
        }

        if (this.config.modal !== false)
        {
            this.disableModality();
        }

        this.container = null;
    }

    close()
    {
        this.visible = false;
    }

    maximize() {
        this.maximized = !this.maximized;

        if (!this.config.modal) {
            if (this.maximized)
                DomHandler.addClass(document.body, 'p-overflow-hidden');
            else
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }

        this.onMaximize.emit({'maximized': this.maximized});
    }

    enableModality()
    {
        if (this.config.closable !== false && this.config.dismissableMask)
        {
            this.maskClickListener = this.renderer.listen(this.wrapper, 'click', (event: any) =>
            {
                if (this.wrapper && this.wrapper.isSameNode(event.target))
                {
                    this.close();
                }
            });
        }

        if (this.config.modal !== false)
        {
            DomHandler.addClass(document.body, 'ui-overflow-hidden');
            DomHandler.addClass(document.body, 'p-overflow-hidden');
        }
    }

    disableModality()
    {
        if (this.wrapper)
        {
            if (this.config.dismissableMask)
            {
                this.unbindMaskClickListener();
            }

            if (this.config.modal !== false)
            {
                DomHandler.removeClass(document.body, 'ui-overflow-hidden');
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }

            if (!(this.cd as ViewRef).destroyed)
            {
                this.cd.detectChanges();
            }
        }
    }

    onKeydown(event: KeyboardEvent)
    {
        if (event.which === 9)
        {
            event.preventDefault();

            let focusableElements = DomHandler.getFocusableElements(this.container);

            if (focusableElements && focusableElements.length > 0)
            {
                if (!document.activeElement)
                {
                    focusableElements[0].focus();
                }
                else
                {
                    let focusedIndex = focusableElements.indexOf(document.activeElement);

                    if (event.shiftKey)
                    {
                        if (focusedIndex == -1 || focusedIndex === 0)
                            focusableElements[focusableElements.length - 1].focus();
                        else
                            focusableElements[focusedIndex - 1].focus();
                    }
                    else
                    {
                        if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                            focusableElements[0].focus();
                        else
                            focusableElements[focusedIndex + 1].focus();
                    }
                }
            }
        }
    }

    focus()
    {
        let focusable = DomHandler.findSingle(this.container, 'a');
        if (focusable)
        {
            this.zone.runOutsideAngular(() =>
            {
                setTimeout(() => focusable.focus(), 5);
            });
        }
    }

    bindGlobalListeners()
    {
        this.bindDocumentKeydownListener();

        if (this.config.closeOnEscape !== false && this.config.closable !== false)
        {
            this.bindDocumentEscapeListener();
        }
    }

    unbindGlobalListeners()
    {
        this.unbindDocumentKeydownListener();
        this.unbindDocumentEscapeListener();
    }

    bindDocumentKeydownListener()
    {
        this.zone.runOutsideAngular(() =>
        {
            this.documentKeydownListener = this.onKeydown.bind(this);
            window.document.addEventListener('keydown', this.documentKeydownListener);
        });
    }

    unbindDocumentKeydownListener()
    {
        if (this.documentKeydownListener)
        {
            window.document.removeEventListener('keydown', this.documentKeydownListener);
            this.documentKeydownListener = null;
        }
    }

    bindDocumentEscapeListener()
    {
        this.documentEscapeListener = this.renderer.listen('document', 'keydown', (event) =>
        {
            if (event.which == 27)
            {
                if (parseInt(this.container.style.zIndex) == (DomHandler.zindex + (this.config.baseZIndex ? this.config.baseZIndex : 0)))
                {
                    if (!this.dialogConfig.data._context.isLoading)
                    {
                        this.close();
                    }
                }
            }
        });
    }

    unbindDocumentEscapeListener()
    {
        if (this.documentEscapeListener)
        {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }

    unbindMaskClickListener()
    {
        if (this.maskClickListener)
        {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }

    ngOnDestroy()
    {
        this.onContainerDestroy();

        if (this.componentRef)
        {
            this.componentRef.destroy();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [DynamicDialogComponent, DynamicDialogContent, DynamicDialogFooter],
    entryComponents: [DynamicDialogComponent]
})
export class DynamicDialogModule { }
