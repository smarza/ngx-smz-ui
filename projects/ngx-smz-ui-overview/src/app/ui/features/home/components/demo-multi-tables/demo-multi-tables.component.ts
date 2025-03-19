import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DemoTreeNode } from '@models/demo';
import { Store } from '@ngxs/store';
import { SmzMultiTablesState } from 'ngx-smz-ui';

@Component({
    selector: 'app-demo-multi-tables',
    template: `
  <smz-ui-multi-tables [state]="state"></smz-ui-multi-tables>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class DemoMultiTablesComponent implements OnInit, OnChanges {
  @Input() public node: DemoTreeNode
  public state: SmzMultiTablesState;

  constructor(private cdr: ChangeDetectorRef, private store: Store) { }

  ngOnInit() {
    this.updateData(this.node);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.node != null) {
      const node = changes.node.currentValue;
      this.updateData(node);
    }
  }

  updateData(node: any): void {
    const event = node.data;
    this.state = event.code();
  }

}