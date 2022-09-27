import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DemoItem, DemoTreeNode } from '@models/demo';
import { SmzCardsState } from 'ngx-smz-ui';

@Component({
  selector: 'app-demo-cards',
  template: `
  <smz-ui-cards *ngIf="state != null" [state]="state"></smz-ui-cards>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoCardsComponent implements OnInit, OnChanges {
  @Input() public node: DemoTreeNode
  public state: SmzCardsState<unknown>;

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
  }
}