import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SmzNotification } from '../../../../core/models/notifications';

@Component({
  selector: "[smz-ui-hephaestus-notification-items]",
  host: { "(document:click)": "collapse($event)" },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li role="menuitem" *ngFor="let item of items; let index = index;">
      <a menuItemAction [item]="item" [parent]="null" [breadcrumbs]="false" [tabindex]="index">
        <i *ngIf="item.icon != null" class="pi" [ngClass]="item.icon"></i>
        <div class="notification-item">
          <div class="notification-summary">{{ item.summary }}</div>
          <div class="notification-detail" [innerHtml]="item.details"></div>
        </div>
      </a>
    </li>
  `,
})
export class HephaestusNotificationItemsComponent implements OnInit, AfterViewInit {
  @Input() public items: SmzNotification[];
  @Output() public onClose: EventEmitter<void> = new EventEmitter<void>();
  private isLoaded = false;
  constructor(private _eref: ElementRef) {}

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoaded = true;
    }, 0);
  }

  public collapse(event): void {
    if (this.isLoaded && !this._eref.nativeElement.contains(event.target)){
      this.onClose.emit();
    }
  }

}
