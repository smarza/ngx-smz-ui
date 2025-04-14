import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SmzNotification } from '../../../../../core/models/notifications';

@Component({
    selector: "[smz-ui-new-athena-notification-items]",
    host: { "(document:click)": "collapse($event)" },
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./notification-items.component.scss'],
    template: `
    <li role="menuitem" *ngFor="let item of items; let index = index;">
      <a menuItemAction class="grid grid-nogutter items-center justify-start" style="display: flex;" [item]="item" [parent]="null" [breadcrumbs]="false" [tabindex]="index">
        <i *ngIf="item.icon != null" class="pi mr-3" [ngClass]="item.icon"></i>
        <div class="notification-item">
          <div class="notification-summary">{{ item.summary }}</div>
          <div class="notification-detail" [innerHtml]="item.details"></div>
        </div>
      </a>
    </li>
  `,
    standalone: false
})
export class NewAthenaNotificationItemsComponent implements OnInit, AfterViewInit {
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
