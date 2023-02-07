import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { LARGE_TABLE_DATA } from '@demos/data/large-table';
import { DemoItem, DemoTreeNode } from '@models/demo';
import { Store } from '@ngxs/store';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { SmzTableComponent, SmzTableState } from 'ngx-smz-ui';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-demo-table',
  template: `
  <button pButton label="Extract Viewport" (click)="getViewport()" class="p-button-ghost"></button>
<smz-ui-table table [items]="items$ | async" [state]="state">
  <ng-template pTemplate="rowContent" let-item>
    <div class="grid grid-nogutter justify-start items-start">
      <div>Row Expanded</div>
      <div>{{ item | json }}</div>
    </div>
  </ng-template>
    <!-- CONTEÚDOS COM OVERRIDE -->
    <ng-template pTemplate="content" let-item let-col="col">

    <ng-container [ngSwitch]="col.field">

      <ng-container *ngSwitchCase="'status.name'">
        <div class="px-3 py-1 text-sm text-slate-800 rounded text-center" [ngClass]="item.status.background"><strong>{{ item.status.name }}</strong></div>
      </ng-container>

    </ng-container>

    </ng-template>
</smz-ui-table>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoTableComponent implements OnInit, OnChanges {
  @ViewChild(SmzTableComponent) public table: SmzTableComponent;
  @Input() public node: DemoTreeNode
  public items$: Observable<DemoItem[]>;
  public items = LARGE_TABLE_DATA;
  public state: SmzTableState;

  constructor(private cdr: ChangeDetectorRef, private store: Store) { }

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
    this.items$ = event.items$;
    this.state = event.code();

    // setTimeout(() => {
    //   this.state = event.code();
    //   this.cdr.markForCheck();
    // }, 3000);
  }

  public getViewport(): void {
    const viewport = this.table.extractViewportState();
    console.log(JSON.stringify(viewport));
  }
}