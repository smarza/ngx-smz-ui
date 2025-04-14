import {
  NgModule,
  Component,
  ElementRef,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  Renderer2,
  ViewChild,
  Inject,
  forwardRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ViewRef,
  inject,
} from "@angular/core";
import {
  trigger,
  style,
  transition,
  animate,
  AnimationEvent,
} from "@angular/animations";
import { CommonModule } from "@angular/common";
import { DomHandler, ConnectedOverlayScrollHandler } from "primeng/dom";
import { MenuItem, OverlayService } from "primeng/api";
import { ZIndexUtils } from "primeng/utils";
import { RouterModule } from "@angular/router";
import { RippleModule } from "primeng/ripple";
import { TooltipModule } from "primeng/tooltip";
import { SmzMenuItem } from '../models/smz-menu-item';
import { ConfirmableFunction, CriticalConfirmableFunction } from '../../smz-dialogs/decorators/confirmable.decorator';
import { PrimeNG } from 'primeng/config';

@Component({
    selector: "[smzMenuItemContent]",
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./menu-item-content.html",
    host: {
        class: "p-element",
    },
    standalone: false
})
export class MenuItemContent {
  @Input("smzMenuItemContent") item: MenuItem;

  menu: Menu;

  constructor(@Inject(forwardRef(() => Menu)) menu) {
    this.menu = menu as Menu;
  }

  onItemKeyDown(event) {
    let listItem = event.currentTarget.parentElement;

    switch (event.code) {
      case "ArrowDown":
        var nextItem = this.findNextItem(listItem);
        if (nextItem) {
          nextItem.children[0].focus();
        }

        event.preventDefault();
        break;

      case "ArrowUp":
        var prevItem = this.findPrevItem(listItem);
        if (prevItem) {
          prevItem.children[0].focus();
        }

        event.preventDefault();
        break;

      case "Space":
      case "Enter":
        if (listItem && !DomHandler.hasClass(listItem, "p-disabled")) {
          listItem.children[0].click();
        }

        event.preventDefault();
        break;

      default:
        break;
    }
  }

  findNextItem(item) {
    let nextItem = item.nextElementSibling;

    if (nextItem)
      return DomHandler.hasClass(nextItem, "p-disabled") ||
        !DomHandler.hasClass(nextItem, "p-menuitem")
        ? this.findNextItem(nextItem)
        : nextItem;
    else return null;
  }

  findPrevItem(item) {
    let prevItem = item.previousElementSibling;

    if (prevItem)
      return DomHandler.hasClass(prevItem, "p-disabled") ||
        !DomHandler.hasClass(prevItem, "p-menuitem")
        ? this.findPrevItem(prevItem)
        : prevItem;
    else return null;
  }
}

@Component({
    selector: "smz-menu-items",
    templateUrl: "./menu.html",
    animations: [
        trigger("overlayAnimation", [
            transition(":enter", [
                style({ opacity: 0, transform: "scaleY(0.8)" }),
                animate("{{showTransitionParams}}"),
            ]),
            transition(":leave", [
                animate("{{hideTransitionParams}}", style({ opacity: 0 })),
            ]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./menu.css"],
    host: {
        class: "p-element",
    },
    standalone: false
})
export class Menu implements OnDestroy {
  private readonly primeConfig = inject(PrimeNG);

  @Input() model: MenuItem[];

  @Input() popup: boolean;

  @Input() style: any;

  @Input() styleClass: string;

  @Input() appendTo: any;

  @Input() autoZIndex: boolean = true;

  @Input() baseZIndex: number = 0;

  @Input() showTransitionOptions: string = ".12s cubic-bezier(0, 0, 0.2, 1)";

  @Input() hideTransitionOptions: string = ".1s linear";

  @ViewChild("container") containerViewChild: ElementRef;

  @Output() onShow: EventEmitter<any> = new EventEmitter();

  @Output() onHide: EventEmitter<any> = new EventEmitter();

  container: HTMLDivElement;

  scrollHandler: any;

  documentClickListener: any;

  documentResizeListener: any;

  preventDocumentDefault: boolean;

  target: any;

  visible: boolean;

  relativeAlign: boolean;
  rowData: any;

  constructor(
    public el: ElementRef,
    public renderer: Renderer2,
    private cd: ChangeDetectorRef,
    public overlayService: OverlayService
  ) {}

  toggle(event, rowData) {
    this.rowData = rowData;
    if (this.visible) this.hide();
    else this.show(event);

    this.preventDocumentDefault = true;
  }

  show(event) {
    this.target = event.currentTarget;
    this.relativeAlign = event.relativeAlign;
    this.visible = true;
    this.preventDocumentDefault = true;
    this.cd.markForCheck();
  }

  onOverlayAnimationStart(event: AnimationEvent) {
    switch (event.toState) {
      case "visible":
        if (this.popup) {
          this.container = event.element;
          this.moveOnTop();
          this.onShow.emit({});
          this.appendOverlay();
          this.alignOverlay();
          this.bindDocumentClickListener();
          this.bindDocumentResizeListener();
          this.bindScrollListener();
        }
        break;

      case "void":
        this.onOverlayHide();
        this.onHide.emit({});
        break;
    }
  }

  onOverlayAnimationEnd(event: AnimationEvent) {
    switch (event.toState) {
      case "void":
        if (this.autoZIndex) {
          ZIndexUtils.clear(event.element);
        }
        break;
    }
  }

  alignOverlay() {
    if (this.relativeAlign)
      DomHandler.relativePosition(this.container, this.target);
    else DomHandler.absolutePosition(this.container, this.target);
  }

  appendOverlay() {
    if (this.appendTo) {
      if (this.appendTo === "body") document.body.appendChild(this.container);
      else DomHandler.appendChild(this.container, this.appendTo);
    }
  }

  restoreOverlayAppend() {
    if (this.container && this.appendTo) {
      this.el.nativeElement.appendChild(this.container);
    }
  }

  moveOnTop() {
    if (this.autoZIndex) {
      ZIndexUtils.set(
        "menu",
        this.container,
        this.baseZIndex + this.primeConfig.zIndex.menu
      );
    }
  }

  hide() {
    this.visible = false;
    this.relativeAlign = false;
    this.cd.markForCheck();
  }

  onWindowResize() {
    this.hide();
  }

  itemClick(event: MouseEvent, item: SmzMenuItem) {

    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (!item.url && !item.routerLink) {
      event.preventDefault();
    }

    if (item.command) {

      if (item.confirmable?.isCritical) {
        CriticalConfirmableFunction(item.confirmable.title, item.confirmable.message, () => { this.resolveCommand(this.rowData, item) })
      }
      else if (item.confirmable != null && item.confirmable.isCritical === false) {
        ConfirmableFunction(item.confirmable.title, item.confirmable.message, () => { this.resolveCommand(this.rowData, item) })
      }
      else {
        this.resolveCommand(this.rowData, item)
      }

    }

    if (this.popup) {
      this.hide();
    }
  }

  public resolveCommand(data: any, item: SmzMenuItem): void {
    if (item.dataMap != null) {
      // Caso o menu tenha uma função para remapear o data
      const mappedData = item.dataMap(data);
      item.command(mappedData);
  }
  else {
      item.command(data);
  }
}

  onOverlayClick(event) {
    if (this.popup) {
      this.overlayService.add({
        originalEvent: event,
        target: this.el.nativeElement,
      });
    }

    this.preventDocumentDefault = true;
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      const documentTarget: any = this.el
        ? this.el.nativeElement.ownerDocument
        : "document";

      this.documentClickListener = this.renderer.listen(
        documentTarget,
        "click",
        () => {
          if (!this.preventDocumentDefault) {
            this.hide();
          }

          this.preventDocumentDefault = false;
        }
      );
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  bindDocumentResizeListener() {
    this.documentResizeListener = this.onWindowResize.bind(this);
    window.addEventListener("resize", this.documentResizeListener);
  }

  unbindDocumentResizeListener() {
    if (this.documentResizeListener) {
      window.removeEventListener("resize", this.documentResizeListener);
      this.documentResizeListener = null;
    }
  }

  bindScrollListener() {
    if (!this.scrollHandler) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(
        this.target,
        () => {
          if (this.visible) {
            this.hide();
          }
        }
      );
    }

    this.scrollHandler.bindScrollListener();
  }

  unbindScrollListener() {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener();
    }
  }

  onOverlayHide() {
    this.unbindDocumentClickListener();
    this.unbindDocumentResizeListener();
    this.unbindScrollListener();
    this.preventDocumentDefault = false;

    if (!(this.cd as ViewRef).destroyed) {
      this.target = null;
    }
  }

  ngOnDestroy() {
    if (this.popup) {
      if (this.scrollHandler) {
        this.scrollHandler.destroy();
        this.scrollHandler = null;
      }

      if (this.container && this.autoZIndex) {
        ZIndexUtils.clear(this.container);
      }

      this.restoreOverlayAppend();
      this.onOverlayHide();
    }
  }

  hasSubMenu(): boolean {
    if (this.model) {
      for (var item of this.model) {
        if (item.items?.length > 0) {
          return true;
        }
      }
    }
    return false;
  }
}

@NgModule({
  imports: [CommonModule, RouterModule, RippleModule, TooltipModule],
  exports: [Menu, RouterModule],
  declarations: [Menu, MenuItemContent],
})
export class SmzMenuModule {}
