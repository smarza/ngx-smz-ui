import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DemoTreeNode } from '@models/demo';
import { SmzTreeNode, SmzTreeState } from 'ngx-smz-ui';
import { TreeNode } from 'primeng/api/treenode';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';

@Component({
  selector: 'app-demo-tree',
  template: `
  <div *ngIf="state != null" style="height: 675px;">
  <ng-container *ngClone="items$ | async as items">
    <smz-ui-tree #smzTree [items]="items" [state]="state" [selection]="selection" (selectedNodes)="selectionChanged($event)">

      <ng-template pTemplate="type:AuditTemplate" let-node>
        <span (click)="log(smzTree)">Template => {{ node.label }}</span>
      </ng-template>

      <ng-template pTemplate="type:disk" let-node>
        <span>disk => {{ node.label }}</span>
      </ng-template>

    </smz-ui-tree>
  </ng-container>
  </div>
`,
  changeDetection: ChangeDetectionStrategy.Default
})

export class DemoTreeComponent implements OnInit, OnChanges {
  public items$: Observable<any[]>;
  @Input() public node: DemoTreeNode;
  public selection: string[] = ['IsometricsWithoutTags'];
  public state: SmzTreeState;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.updateData(this.node);

    // setTimeout(() => {
    //   console.log('settimeout');
    //   this.items$ = this.store.select(DemoFeatureSelectors.nested);
    // }, 2000);
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

  public log(event: any): void {
    console.log(event);
  }

  public selectionChanged(node: SmzTreeNode[]): void {
    // console.log('selectionChanged', node);
  }
}