import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { DemoTreeNode } from '@models/demo';
import { SmzForm } from 'ngx-smz-ui';

@Component({
  selector: 'app-demo-form',
  template: `<smz-form-group *ngIf="form != null" [config]="form"></smz-form-group>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoFormComponent implements OnInit, OnChanges {
  @Input() public node: DemoTreeNode
  public form: SmzForm<any>;

  constructor() { }

  ngOnInit() {
    this.form = this.node.data() as any;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.node != null) {
      const node = changes.node.currentValue;
      this.form = node.data();
    }

  }
}