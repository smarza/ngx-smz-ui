import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DemoTreeNode } from '../../../../../models/demo';
import { Store } from '@ngxs/store';
import { DemoFeatureSelectors } from '../../../../../state/demo/demo.selectors';
import { SmzDocumentState } from 'ngx-smz-ui';

@Component({
  standalone: false,
  selector: 'app-demo-document',
  template: `<smz-ui-document *ngIf="state != null" [state]="state"></smz-ui-document>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoDocumentComponent implements OnInit, OnChanges {
  public items$ = inject(Store).select(DemoFeatureSelectors.all);

  @Input() public node: DemoTreeNode
  public state: SmzDocumentState;

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