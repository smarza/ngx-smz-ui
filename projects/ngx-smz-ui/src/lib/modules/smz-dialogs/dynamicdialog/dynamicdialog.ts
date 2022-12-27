import { Component, NgModule, Type, ViewChild, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef, Renderer2, NgZone, ElementRef, ChangeDetectionStrategy, ViewRef, HostListener, HostBinding, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { trigger, style, transition, animate, AnimationEvent, animation, useAnimation } from '@angular/animations';
import { DynamicDialogContent, DynamicDialogFooter } from './dynamicdialogcontent';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import { DynamicDialogRef } from './dynamicdialog-ref';
import { SmzDynamicDialogConfig } from '../models/smz-dialogs';
import { NgxRbkUtilsConfig } from '../../rbk-utils/ngx-rbk-utils.config';
import { PrimeNGConfig } from 'primeng/api';
import { SmzDockService } from '../../smz-dock/services/smz-dock.service';
import { TooltipModule } from 'primeng/tooltip';
import { DialogOverlayPanel } from './dialog-overlay-panel';

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

        <div #overlayPanelClip *ngIf="dialogConfig.data.behaviors.showAsLinkedOverlayPanel" class="fixed inset-0 p-component-overlay p-component-overlay-enter"></div>
        <div *ngIf="dialogConfig.data.behaviors.showAsLinkedOverlayPanel" class="fixed inset-0"></div>
        <div #mask [ngClass]="{'p-dialog-mask-free': dialogConfig.data.behaviors.showAsLinkedOverlayPanel, 'p-component-overlay p-component-overlay-enter pointer-events-none' : config.modal !== false && !dialogConfig.data.behaviors.showAsLinkedOverlayPanel, 'p-dialog-mask-scrollblocker': config.modal !== false, 'smz-dialog-minimized': minimized }" class="smz_form_grid_container p-dialog-mask">
            <div #dialogContainer [ngClass]="{'p-dialog p-dynamic-dialog p-component': true, 'p-dialog-rtl': config.rtl, 'p-dialog-maximized': maximized}" [ngStyle]="config.style" [class]="config.styleClass"
                [@animation]="{value: 'visible', params: {transform: transformOptions, transition: config.transitionOptions || '150ms cubic-bezier(0, 0, 0.2, 1)'}}"
                (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)" role="dialog" *ngIf="visible"
                [style.width]="config.width" [style.height]="config.height">
                <div class="p-dialog-header" [ngStyle]="config.headerStyle" *ngIf="config.showHeader === false ? false: true">
                    <span class="p-dialog-title">{{config.header}}</span>
                    <div class="p-dialog-header-icons" [ngClass]="{ 'disable-a': dialogConfig.data._context.isGlobalDisabled }">
                        <ng-container *ngFor="let topbarButton of dialogConfig.data.topbarButtons">
                            <button [ngClass]="'p-dialog-header-icon p-dialog-header-maximize p-link'" type="button" (click)="topbarButton.onClick()" *ngIf="topbarButton.visible" [pTooltip]="topbarButton.tooltip">
                                <span [ngClass]="topbarButton.class"></span>
                            </button>
                        </ng-container>
                        <button [ngClass]="'p-dialog-header-icon p-dialog-header-maximize p-link'" type="button" (click)="minimize()" (keydown.enter)="minimize()" *ngIf="config.minimizable !== false">
                            <span class="p-dialog-header-close-icon pi pi-minus"></span>
                        </button>
                        <button [ngClass]="'p-dialog-header-icon p-dialog-header-maximize p-link'" type="button" (click)="maximize()" (keydown.enter)="maximize()" *ngIf="config.maximizable !== false && !maximized">
                            <span class="p-dialog-header-close-icon" [ngClass]="maximizeIcon"></span>
                        </button>
                        <button [ngClass]="'p-dialog-header-icon p-dialog-header-maximize p-link'" type="button" (click)="maximize()" (keydown.enter)="maximize()" *ngIf="maximized && !config.blockRestoreButton">
                            <span class="p-dialog-header-close-icon" [ngClass]="minimizeIcon"></span>
                        </button>
                        <button [ngClass]="'p-dialog-header-icon p-dialog-header-maximize p-link'" type="button" (click)="hide()" (keydown.enter)="hide()" *ngIf="config.closable !== false">
                            <span class="p-dialog-header-close-icon pi pi-times"></span>
                        </button>
                    </div>
                </div>
                <div class="p-dialog-content" [ngStyle]="config.contentStyle" [ngClass]="{ 'disable-ui-dialog-content': dialogConfig.data._context.isGlobalDisabled }">
                    <ng-template pDynamicDialogContent></ng-template>
                </div>
                <div class="p-dialog-footer" *ngIf="config.footer" [ngStyle]="config.footerStyle" [ngClass]="{ 'disable-container': dialogConfig.data._context.isGlobalDisabled }">
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
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./dialog.css'],
    host: {
        'class': 'p-element'
    }
})
export class DynamicDialogComponent implements AfterViewInit, OnInit, OnDestroy
{

    visible: boolean = true;

    componentRef: ComponentRef<any>;

    mask: HTMLDivElement;

    @ViewChild(DynamicDialogContent) insertionPoint: DynamicDialogContent;
    @ViewChild(DynamicDialogFooter) insertionFooter: DynamicDialogFooter;

    @ViewChild('mask') maskViewChild: ElementRef;

    @ViewChild('dialogContainer') containerViewChild: ElementRef;

    @ViewChild('overlayPanelClip') overlayPanelClip: ElementRef;

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

    @Output() onMinimize: EventEmitter<any> = new EventEmitter();
    minimized: boolean;

    preMaximizeContentHeight: number;

    preMaximizeContainerWidth: number;

    preMaximizeContainerHeight: number;

    preMaximizePageX: number;

    preMaximizePageY: number;
    private overlayPanel: DialogOverlayPanel;

    constructor(private cd: ChangeDetectorRef, public renderer: Renderer2,
        public config: DynamicDialogConfig, private dialogRef: DynamicDialogRef, public zone: NgZone, public dialogConfig: SmzDynamicDialogConfig, private rbkConfig: NgxRbkUtilsConfig, public primeNGConfig: PrimeNGConfig,
        public dockService: SmzDockService) { }

    ngOnInit()
    {
        if (this.config.domElementId != null) this.domId = this.config.domElementId;
    }

    ngAfterViewInit()
    {
        if (this.dialogConfig.data.behaviors.showAsLinkedOverlayPanel) {
            setTimeout(() => {
                this.overlayPanel = new DialogOverlayPanel(this.dialogConfig.data.overlayPanel, this.container, this.maskViewChild.nativeElement, this.overlayPanelClip.nativeElement);
                this.overlayPanel.initializeOverlay();
            }, 0);
        }

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
        if (this.insertionPoint == null) {
            console.warn('insertionPoint null', componentType, this);
        }
        else {
            let viewContainerRef = this.insertionPoint.viewContainerRef;
            viewContainerRef.clear();

            this.componentRef = viewContainerRef.createComponent(componentType);
        }
    }

    loadFooterComponent(componentType: Type<any>)
    {
        if (this.insertionFooter == null) {
            console.warn('insertionFooter null', componentType, this);
        }
        else {
            let viewContainerRef = this.insertionFooter.viewContainerRef;
            viewContainerRef.clear();

            this.componentRef = viewContainerRef.createComponent(componentType);
        }

    }

    moveOnTop()
    {

        if (this.config.autoZIndex !== false) {
            ZIndexUtils.set('modal', this.container, (this.config.baseZIndex||0) + this.primeNGConfig.zIndex.modal);
            this.wrapper.style.zIndex = String(parseInt(this.container.style.zIndex, 10) - 1);

            if (this.rbkConfig.debugMode) {
                console.groupCollapsed('DynamicDialogComponent => moveOnTop()');

                console.log('config.baseZIndex', this.config.baseZIndex);
                console.log('DomHandler.zindex', DomHandler.zindex);
                console.log('primeNGConfig', this.primeNGConfig);
                console.log('wrapper.style.zIndex', this.wrapper.style.zIndex);

                console.groupEnd();
            }
		}
    }

    onAnimationStart(event: AnimationEvent)
    {
		switch(event.toState) {
			case 'visible':
                this.container = event.element;
                this.wrapper = this.container.parentElement;
				this.moveOnTop();
                this.bindGlobalListeners();

                if (this.config.modal !== false) {
                    this.enableModality();
                }
                this.focus();
			break;

			case 'void':
                if (this.wrapper && this.config.modal !== false) {
                    DomHandler.addClass(this.wrapper, 'p-component-overlay-leave');
                }
			break;
		}
    }

    onAnimationEnd(event: AnimationEvent)
    {
		if (event.toState === 'void') {
            this.onContainerDestroy();
			this.dialogRef.destroy();
		}
    }

    onContainerDestroy()
    {
		this.unbindGlobalListeners();

        if (this.container && this.config.autoZIndex !== false) {
            ZIndexUtils.clear(this.container);
        }

        if (this.config.modal !== false) {
            this.disableModality();
        }
        this.container = null;
    }

    close()
    {
        this.visible = false;
        this.cd.markForCheck();
    }

    hide() {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }

    restore() {
        this.minimized = false;
        this.onMinimize.emit({'minimized': this.minimized});
    }

    minimize() {
        this.minimized = true;
        this.dockService.appendDialog(this);
        this.onMinimize.emit({'minimized': this.minimized});
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
        if (this.config.closable !== false && this.config.dismissableMask) {
            this.maskClickListener = this.renderer.listen(this.wrapper, 'mousedown', (event: any) => {
                if (this.wrapper && this.wrapper.isSameNode(event.target)) {
                    this.hide();
                }
            });
        }

        if (this.config.modal !== false) {
            DomHandler.addClass(document.body, 'p-overflow-hidden');
        }
    }

    disableModality()
    {
        if (this.wrapper) {
            if (this.config.dismissableMask) {
                this.unbindMaskClickListener();
            }

            if (this.config.modal !== false) {
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }

            if (!(this.cd as ViewRef).destroyed) {
                this.cd.detectChanges();
            }
        }
    }

    onKeydown(event: KeyboardEvent)
    {
        if (event.which === 9) {
            event.preventDefault();

            let focusableElements = DomHandler.getFocusableElements(this.container);

            if (focusableElements && focusableElements.length > 0) {
                if (!focusableElements[0].ownerDocument.activeElement) {
                    focusableElements[0].focus();
                }
                else {
                    let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);

                    if (event.shiftKey) {
                        if (focusedIndex == -1 || focusedIndex === 0)
                            focusableElements[focusableElements.length - 1].focus();
                        else
                            focusableElements[focusedIndex - 1].focus();
                    }
                    else {
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
        let focusable = DomHandler.findSingle(this.container, '[autofocus]');
        if (focusable) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => focusable.focus(), 5);
            });
        }
    }

    bindGlobalListeners()
    {
        this.bindDocumentKeydownListener();

        if (this.config.closeOnEscape !== false && this.config.closable !== false) {
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
        this.zone.runOutsideAngular(() => {
            this.documentKeydownListener = this.onKeydown.bind(this);
            window.document.addEventListener('keydown', this.documentKeydownListener);
        });
    }

    unbindDocumentKeydownListener()
    {
        if (this.documentKeydownListener) {
            window.document.removeEventListener('keydown', this.documentKeydownListener);
            this.documentKeydownListener = null;
        }
    }

    bindDocumentEscapeListener()
    {
        const documentTarget: any = this.maskViewChild ? this.maskViewChild.nativeElement.ownerDocument : 'document';

        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt(this.container.style.zIndex) == ZIndexUtils.getCurrent()) {
					this.hide();
				}
            }
        });
    }

    unbindDocumentEscapeListener()
    {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }

    unbindMaskClickListener()
    {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }

    ngOnDestroy()
    {
		this.onContainerDestroy();

		if (this.componentRef) {
			this.componentRef.destroy();
		}

        this.overlayPanel?.kill();
    }
}

@NgModule({
    imports: [CommonModule, TooltipModule],
    declarations: [DynamicDialogComponent, DynamicDialogContent, DynamicDialogFooter]
})
export class DynamicDialogModule { }
