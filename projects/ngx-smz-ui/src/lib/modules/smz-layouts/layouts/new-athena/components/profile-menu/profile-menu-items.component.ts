import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MenuItem } from 'primeng/api';

@Component({
    selector: "[smz-ui-new-athena-profile-menu-items]",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @for (item of items | isVisible; track item; let index = $index) {
      <li [ngClass]="{ 'menuitem-active' : item.expanded }">
        @switch (item | hasChild) {
          @case (false) {
            <a menuItemAction [item]="item" [parent]="null" [breadcrumbs]="false" [tabindex]="index" class="clickable" (collapse)="collapse.emit()">
              @if (item.icon != null) {
                <i class="topbar-icon" [ngClass]="item.icon"></i>
              }
              <span class="topbar-item-name" [innerHtml]="item.label"></span>
              @if (item.badge != null) {
                <span class="topbar-badge">{{ item.badge }}</span>
              }
            </a>
          }
          @case (true) {
            <a [tabindex]="index" class="clickable" (click)="toogleOnly(item, item.items)">
              @if (item.icon != null) {
                <i class="topbar-icon" [ngClass]="item.icon"></i>
              }
              <span class="topbar-item-name" [innerHtml]="item.label"></span>
              @if (item.badge != null) {
                <span class="topbar-badge">{{ item.badge }}</span>
              }
            </a>
            @if (item.expanded) {
              <ul smz-ui-new-athena-profile-menu-items [items]="item.items"></ul>
            }
          }
        }
      </li>
    }
    `,
    standalone: false
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
