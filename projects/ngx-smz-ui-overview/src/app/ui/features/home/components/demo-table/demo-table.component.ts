import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LARGE_TABLE_DATA } from '@demos/data/large-table';
import { DemoItem, DemoTreeNode } from '@models/demo';
import { SmzTableState } from 'ngx-smz-ui';
import { delay, Observable, of } from 'rxjs';

@Component({
  selector: 'app-demo-table',
  template: `
  <button pButton type="button" label="RUN" class="p-button-rounded p-button-text" (click)="run()"></button>
<smz-ui-table *ngIf="state != null" [items]="items$ | async" [state]="state">
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
  public items$: Observable<DemoItem[]>;

  @Input() public node: DemoTreeNode
  public state: SmzTableState;

  constructor() { }

  ngOnInit() {
    this.updateData(this.node);
  }

  public run(): void {
    this.items$ = of(LARGE_TABLE_DATA) as any;
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