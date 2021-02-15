import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MenuItem } from 'primeng/api';

@Component({
  selector: "[smz-ui-diamond-profile-menu-items]",
  host: { "(document:click)": "collapse($event)" },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li *ngFor="let item of items">
      <a  menuItemAction [item]="item" [tabindex]="index">
      <i *ngIf="item.icon != null" class="pi" [ngClass]="item.icon"></i>
        <span>{{ item.label }}</span>
      </a>
    </li>
  `,
})
export class DiamondProfileMenuItemsComponent implements OnInit, AfterViewInit {

  @Input() public items: MenuItem[];
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
