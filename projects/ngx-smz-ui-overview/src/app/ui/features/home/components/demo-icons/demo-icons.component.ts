import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { DemoItem, DemoTreeNode } from '@models/demo';
import { SmzTableState } from 'ngx-smz-ui';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-demo-icons',
  template: `<smz-ui-table *ngIf="state != null" [items]="items$ | async" [state]="state"></smz-ui-table>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoIconsComponent implements OnInit, OnChanges {
  public items$: Observable<DemoItem[]>;

  @Input() public node: DemoTreeNode
  public state: SmzTableState;

  constructor() { }

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
    this.items$ = event.items$;
  }
}