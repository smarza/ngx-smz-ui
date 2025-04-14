import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DemoTreeNode } from '../../../../../models/demo';
import { SmzMenuItem } from 'ngx-smz-ui';

@Component({
  standalone: false,
  selector: 'app-demo-menu',
  template: `<smz-menu [items]="menuItems" [data]="data"></smz-menu>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoMenuComponent implements OnInit, OnChanges {

  @Input() public node: DemoTreeNode
  public menuItems: SmzMenuItem[];
  public data = { id: 'test', name: 'test' };

  constructor() { }

  ngOnInit() {
    this.menuItems = this.node.data() as any;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['node'] != null) {
      const node = changes['node'].currentValue;
      this.menuItems = node.data();
    }

  }
}