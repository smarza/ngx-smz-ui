import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DemoTreeNode } from '../../../../../models/demo';
import { SmzTimelineState } from 'ngx-smz-ui';

@Component({
  standalone: false,
  selector: 'app-demo-timeline',
  template: `
  <smz-ui-timeline *ngIf="state != null" [state]="state">

  <ng-template pTemplate="header" let-node>
    <span>teste</span>
  </ng-template>

  </smz-ui-timeline>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoTimelineComponent implements OnInit, OnChanges {
  @Input() public node: DemoTreeNode
  public state: SmzTimelineState<unknown>;

  constructor() { }

  ngOnInit() {
    this.updateData(this.node);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['node'] != null) {
      const node = changes['node'].currentValue;
      this.updateData(node);
    }
  }

  updateData(node: any): void {
    const event = node.data;
    this.state = event.code();
  }
}