import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Menu } from './components/menu';
import { SmzMenuItem } from './models/smz-menu-item';
import { SmzMenuPipe } from './pipes/smz-menu.pipe';

@Component({
  selector: 'smz-menu',
  templateUrl: 'smz-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SmzMenuComponent {
  @Input() public items: SmzMenuItem[];
  @Input() public callback: (data: any) => SmzMenuItem[];
  @Input() public data: any;
  @Input() public buttonClass: string = '';
  @Input() public styleClass: string = '';
  @Input() public icon: string = 'pi pi-bars';
  @Input() public behavior: 'overlay' | 'inline' = 'overlay';
  public menuItems: any[] = [];
  public toggle(event: any, actionMenu: Menu): void {
    const items = this.callback != null ? this.callback(this.data) : this.items;
    this.menuItems = new SmzMenuPipe().transform(items, this.data);


    actionMenu.toggle(event, this.data);
  }

}