import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MenuItem } from 'primeng/api';

@Component({
  selector: "[smz-ui-new-athena-profile-menu-items]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li *ngFor="let item of items | isVisible; let index = index" [ngClass]="{ 'menuitem-active' : item.expanded }">

      <ng-container [ngSwitch]="item | hasChild">

        <ng-container *ngSwitchCase="false">
          <a menuItemAction [item]="item" [parent]="null" [breadcrumbs]="false" [tabindex]="index" class="clickable" (collapse)="collapse.emit()">
            <i *ngIf="item.icon != null" class="topbar-icon" [ngClass]="item.icon"></i>
            <span class="topbar-item-name" [innerHtml]="item.label"></span>
            <span *ngIf="item.badge != null" class="topbar-badge">{{ item.badge }}</span>
          </a>
        </ng-container>

        <ng-container *ngSwitchCase="true">
          <a [tabindex]="index" class="clickable" (click)="toogleOnly(item, item.items)">
            <i *ngIf="item.icon != null" class="topbar-icon" [ngClass]="item.icon"></i>
            <span class="topbar-item-name" [innerHtml]="item.label"></span>
            <span *ngIf="item.badge != null" class="topbar-badge">{{ item.badge }}</span>
          </a>
          <ul *ngIf="item.expanded" smz-ui-new-athena-profile-menu-items [items]="item.items"></ul>
        </ng-container>

      </ng-container>

    </li>
  `,
})
export class NewAthenaProfileMenuItemsComponent implements OnInit, AfterViewInit {

  @Input() public items: MenuItem[];
  @Output() public collapse: EventEmitter<void> = new EventEmitter<void>();
  private isLoaded = false;
  public isAnyMenuExpanded = false;
  constructor(private _eref: ElementRef) {}

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoaded = true;
    }, 0);
  }

  public toogleOnly(item: MenuItem, menu: MenuItem[]): void
  {
    this.collapseAll(menu);

    item.expanded = !item.expanded;
    this.isAnyMenuExpanded = item.expanded;
  }

  public collapseAll(menu: MenuItem[]): void
  {
    menu.forEach(x =>
    {
      x.expanded = false;
      if (x.items != null && x.items.length > 0)
      {
        this.collapseAll(x.items);
      }
    });

    this.isAnyMenuExpanded = false;
  }

}
