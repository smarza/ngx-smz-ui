import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { DemoItem, DemoTreeNode } from '@models/demo';
import { Select } from '@ngxs/store';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { SmzTableState } from 'ngx-smz-ui';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-demo-table',
  template: `<smz-ui-table *ngIf="state != null" [items]="items$ | async" [state]="state"></smz-ui-table>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoTableComponent implements OnInit, OnChanges {
  @Select(DemoFeatureSelectors.all) public items$: Observable<DemoItem[]>;

  @Input() public node: DemoTreeNode
  public state: SmzTableState;

  constructor() { }

  ngOnInit() {
    this.state = this.node.data() as any;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.node != null) {
      const node = changes.node.currentValue;
      this.state = node.data();
    }

  }
}