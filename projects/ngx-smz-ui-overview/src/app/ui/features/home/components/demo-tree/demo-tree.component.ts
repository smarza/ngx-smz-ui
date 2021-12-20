import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DemoTreeNode } from '@models/demo';
import { SmzTreeState } from 'ngx-smz-ui';
import { TreeNode } from 'primeng/api/treenode';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-demo-tree',
  template: `
  <div *ngIf="state != null" style="height: 675px;">
  <ng-container *ngClone="items$ | async as items">
    <smz-ui-tree #smzTree [items]="items" [state]="state">

      <!-- <ng-template pTemplate="type:folder" let-node>
        <span>folder => {{ node.label }}</span>
      </ng-template>

      <ng-template pTemplate="type:disk" let-node>
        <span>disk => {{ node.label }}</span>
      </ng-template> -->

    </smz-ui-tree>
  </ng-container>
  </div>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoTreeComponent implements OnInit, OnChanges {
  public items$: Observable<TreeNode[]>;
  @Input() public node: DemoTreeNode
  public state: SmzTreeState;

  constructor(private http: HttpClient) {
    this.items$ = this.http.get<{data: TreeNode[]}>('assets/files.json').pipe(map(x => x.data));
  }

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