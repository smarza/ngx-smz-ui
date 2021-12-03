import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SmzMenuItem } from './models/smz-menu-item';

@Component({
  selector: 'smz-menu',
  templateUrl: 'smz-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SmzMenuComponent {
  @Input() public items: SmzMenuItem[];
  @Input() public data: any;

}