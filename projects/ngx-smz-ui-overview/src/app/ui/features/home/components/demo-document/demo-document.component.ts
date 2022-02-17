import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { DemoItem, DemoTreeNode } from '@models/demo';
import { Select } from '@ngxs/store';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { SmzDocumentState } from 'ngx-smz-ui';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-demo-document',
  template: `<smz-ui-document *ngIf="state != null" [state]="state"></smz-ui-document>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoDocumentComponent implements OnInit, OnChanges {
  @Select(DemoFeatureSelectors.all) public items$: Observable<DemoItem[]>;

  @Input() public node: DemoTreeNode
  public state: SmzDocumentState;

  constructor() { }

  ngOnInit() {
    this.state = this.node.data() as any;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.node != null) {
      const node = changes.node.currentValue;
      this.state = node.data();
      console.log(this.state);
    }

  }
}