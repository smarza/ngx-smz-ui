import {NgModule,Component,Input,Output,OnInit,AfterViewInit,AfterContentInit,OnDestroy,ElementRef,ViewChild,EventEmitter,ContentChildren,QueryList,TemplateRef,ChangeDetectionStrategy, NgZone, ChangeDetectorRef, ViewEncapsulation, inject, AnimationCallbackEvent} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeTemplate,SharedModule} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {ObjectUtils, UniqueComponentId} from 'primeng/utils';
import {RippleModule} from 'primeng/ripple';
import {Subscription} from 'rxjs';
import { ZIndexUtils } from 'primeng/utils';
import {ProgressBarModule} from 'primeng/progressbar';
import { PrimeNG } from 'primeng/config';

export interface Message {
    severity?: string;
    summary?: string;
    detail?: string;
    id?: any;
    key?: string;
    life?: number;
    sticky?: boolean;
    closable?: boolean;
    data?: any;
    icon?: string;
    contentStyleClass?: string;
    styleClass?: string;
    closeIcon?: string;
}

@Component({
    selector: 'p-toastItem',
    template: `
        <div #container [attr.id]="message.id" [class]="message.styleClass" [ngClass]="['p-toast-message-' + message.severity, 'p-toast-message']"
          [style.--show-transform]="showTransformOptions" [style.--show-transition]="showTransitionOptions"
          [style.--hide-transform]="hideTransformOptions" [style.--hide-transition]="hideTransitionOptions"
          animate.enter="toast-item-enter" (animate.leave)="onLeave($event)"
          (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
          <div class="p-toast-message-content relative" role="alert" aria-live="assertive" aria-atomic="true"  [ngClass]="message.contentStyleClass">
            @if (!template) {
                    <span [class]="'p-toast-message-icon pi' + (message.icon ? ' ' + message.icon : '')" [ngClass]="{'pi-info-circle': message.severity == 'info', 'pi-exclamation-triangle': message.severity == 'warn',
                        'pi-times-circle': message.severity == 'error', 'pi-check' :message.severity == 'success'}"></span>
              <div class="p-toast-message-text">
                <div class="p-toast-summary">{{message.summary}}</div>
                <div class="p-toast-detail">{{message.detail}}</div>
              </div>
              @if (showProgress) {
                <div class="absolute bottom-2 left-2 right-3">
                  <p-progressBar [value]="progress" class="w-full" [ngClass]="[ 'toast-progress-' + message.severity ]" [showValue]="false"></p-progressBar>
                </div>
              }
            }
            <ng-container *ngTemplateOutlet="template; context: {$implicit: message}"></ng-container>
            @if (message.closable !== false) {
              <button type="button" class="p-toast-icon-close p-link" (click)="onCloseIconClick($event)" (keydown.enter)="onCloseIconClick($event)" pRipple>
                <span class="p-toast-icon-close-icon pi pi-times"></span>
              </button>
            }
          </div>
        </div>
        `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    host: {
        'class': 'p-element'
    },
    standalone: false
})
export class ToastItem implements AfterViewInit, OnDestroy {

    @Input() message: Message;

    @Input() index: number;

    @Input() template: TemplateRef<any>;

    @Input() showTransformOptions: string;

    @Input() hideTransformOptions: string;

    @Input() showTransitionOptions: string;

    @Input() hideTransitionOptions: string;

    @Input() showProgress: boolean = true;

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @Output() enterStart = new EventEmitter<void>();

    @Output() leaveDone = new EventEmitter<void>();

    @ViewChild('container') containerViewChild: ElementRef;

    timeout: any;
    timeoutValue = 0;
    progress: number = 0;
    progressTimer;
    tick = 100;
    add = 0;

    constructor(private zone: NgZone, public cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        this.enterStart.emit();
        this.initTimeout();

        this.tick = 150;
        this.timeoutValue = this.message.life || 3000;
        this.add = (100 * this.tick) / this.timeoutValue;
        this.progress = this.add;
    }

    onLeave(event: AnimationCallbackEvent) {
        const el = this.containerViewChild?.nativeElement as HTMLElement;
        if (!el) {
            event.animationComplete();
            return;
        }
        el.classList.add('toast-item-leave');
        const onEnd = () => {
            el.removeEventListener('animationend', onEnd);
            event.animationComplete();
            this.leaveDone.emit();
        };
        el.addEventListener('animationend', onEnd);
    }

    initTimeout() {

        if (!this.message.sticky) {
            this.zone.runOutsideAngular(() => {
                this.timeout = setTimeout(() => {
                }, this.timeoutValue);
            });

            this.cdr.markForCheck();

            this.progressTimer = setInterval(() => {
                this.progress = this.progress + this.add;
                this.cdr.markForCheck();
                if (this.progress >= 100) {
                    this.progress = 100;
                    clearInterval(this.progressTimer);
                    this.cdr.markForCheck();

                    this.onClose.emit({
                        index: this.index,
                        message: this.message
                    });
                }
            }, this.tick);
        }
    }

    clearTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
            clearInterval(this.progressTimer);
            this.cdr.markForCheck();
        }
    }

    onMouseEnter() {
        this.clearTimeout();
        clearInterval(this.progressTimer);
    }

    onMouseLeave() {
        this.initTimeout();
    }

    onCloseIconClick(event) {
        this.clearTimeout();

        this.onClose.emit({
            index: this.index,
            message: this.message
        });

        event.preventDefault();
    }

    ngOnDestroy() {
        this.clearTimeout();
    }
}

@Component({
    selector: 'p-toast',
    template: `
        <div #container [ngClass]="'p-toast p-component p-toast-' + position" [ngStyle]="style" [class]="styleClass">
          @for (msg of messages; track msg; let i = $index) {
            <p-toastItem [message]="msg" [index]="i" (onClose)="onMessageClose($event)"
              [template]="template" (enterStart)="onAnimationStart()" (leaveDone)="onAnimationEnd()"
              [showTransformOptions]="showTransformOptions" [hideTransformOptions]="hideTransformOptions"
            [showTransitionOptions]="showTransitionOptions" [hideTransitionOptions]="hideTransitionOptions"></p-toastItem>
          }
        </div>
        `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./toast.css'],
    host: {
        'class': 'p-element'
    },
    standalone: false
})
export class Toast implements OnInit,AfterContentInit,OnDestroy {

    private readonly primeConfig = inject(PrimeNG);

    @Input() key: string;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() position: string = 'top-right';

    @Input() preventOpenDuplicates: boolean = false;

    @Input() preventDuplicates: boolean = false;

    @Input() showTransformOptions: string = 'translateY(100%)';

    @Input() hideTransformOptions: string = 'translateY(-100%)';

    @Input() showTransitionOptions: string = '300ms ease-out';

    @Input() hideTransitionOptions: string = '250ms ease-in';

    @Input() breakpoints: any;

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @ViewChild('container') containerViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    messageSubscription: Subscription;

    clearSubscription: Subscription;

    messages: Message[];

    messagesArchieve: Message[];

    template: TemplateRef<any>;

    constructor(public messageService: MessageService, private cd: ChangeDetectorRef) {}

    styleElement: any;

    id: string = UniqueComponentId();

    ngOnInit() {
        this.messageSubscription = this.messageService.messageObserver.subscribe(messages => {
            if (messages) {
                if (messages instanceof Array) {
                    const filteredMessages = messages.filter(m => this.canAdd(m));
                    this.add(filteredMessages);
                }
                else if (this.canAdd(messages)) {
                    this.add([messages]);
                }
            }
        });

        this.clearSubscription = this.messageService.clearObserver.subscribe(key => {
            if (key) {
                if (this.key === key) {
                    this.messages = null;
                }
            }
            else {
                this.messages = null;
            }

            this.cd.markForCheck();
        });
    }

    ngAfterViewInit() {
        if (this.breakpoints) {
            this.createStyle();
        }
    }

    add(messages: Message[]): void {
        this.messages = this.messages ? [...this.messages, ...messages] : [...messages];

        if (this.preventDuplicates) {
            this.messagesArchieve = this.messagesArchieve ? [...this.messagesArchieve, ...messages] : [...messages];
        }

        this.cd.markForCheck();
    }

    canAdd(message: Message): boolean {
        let allow = this.key === message.key;

        if (allow && this.preventOpenDuplicates) {
            allow = !this.containsMessage(this.messages, message);
        }

        if (allow && this.preventDuplicates) {
            allow = !this.containsMessage(this.messagesArchieve, message);
        }

        return allow;
    }

    containsMessage(collection: Message[], message: Message): boolean {
        if (!collection) {
            return false;
        }

        return collection.find(m => {
           return ((m.summary === message.summary) && (m.detail == message.detail) && (m.severity === message.severity));
        }) != null;
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'message':
                    this.template = item.template;
                break;

                default:
                    this.template = item.template;
                break;
            }
        });
    }

    onMessageClose(event) {
        this.messages.splice(event.index, 1);

        this.onClose.emit({
            message: event.message
        });

        this.cd.detectChanges();
    }

    onAnimationStart() {
        this.containerViewChild.nativeElement.setAttribute(this.id, '');
        if (this.autoZIndex && this.containerViewChild.nativeElement.style.zIndex === '') {
            ZIndexUtils.set('modal', this.containerViewChild.nativeElement, this.baseZIndex || this.primeConfig.zIndex.modal);
        }
    }

    onAnimationEnd() {
        if (this.autoZIndex && ObjectUtils.isEmpty(this.messages)) {
            ZIndexUtils.clear(this.containerViewChild.nativeElement);
        }
    }

    createStyle() {
        if (!this.styleElement) {
            this.styleElement = document.createElement('style');
            this.styleElement.type = 'text/css';
            document.head.appendChild(this.styleElement);
            let innerHTML = '';
            for (let breakpoint in this.breakpoints) {
                let breakpointStyle = '';
                for (let styleProp in this.breakpoints[breakpoint]) {
                    breakpointStyle += styleProp + ':' + this.breakpoints[breakpoint][styleProp] + ' !important;';
                }
                innerHTML += `
                    @media screen and (max-width: ${breakpoint}) {
                        .p-toast[${this.id}] {
                           ${breakpointStyle}
                        }
                    }
                `
            }

            this.styleElement.innerHTML = innerHTML;
        }
    }

    destroyStyle() {
        if (this.styleElement) {
            document.head.removeChild(this.styleElement);
            this.styleElement = null;
        }
    }

    ngOnDestroy() {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }

        if (this.containerViewChild && this.autoZIndex) {
            ZIndexUtils.clear(this.containerViewChild.nativeElement);
        }

        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }

        this.destroyStyle();
    }
}

@NgModule({
    imports: [CommonModule,RippleModule, ProgressBarModule],
    exports: [Toast,SharedModule],
    declarations: [Toast,ToastItem]
})
export class SmzToastModule { }