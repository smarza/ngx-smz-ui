import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { DemoTreeNode } from '../../../../../models/demo';
import { SmzCommentsState } from '@ngx-smz/core';

@Component({
  standalone: false,
  selector: 'app-demo-comments',
  template: `@if (state != null) {<smz-comments-section [state]="state"></smz-comments-section>}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoCommentsComponent implements OnInit, OnChanges {
  @Input() public node: DemoTreeNode
  public state: SmzCommentsState;

  constructor() { }

  ngOnInit() {
    this.state = this.node.data() as any;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['node'] != null) {
      const node = changes['node'].currentValue;
      this.state = node.data();
    }

  }
}