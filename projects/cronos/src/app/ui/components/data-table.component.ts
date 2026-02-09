import { Component, Input, OnInit } from '@angular/core';

import { NgxSmzTablesModule, SimpleNamedEntity, SmzTableBuilder, SmzTableState } from '@ngx-smz/core';
import { PanelModule } from 'primeng/panel';
import { SummaryPanel } from '@models/summary-panel';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [PanelModule, NgxSmzTablesModule],
  template: `
    <p-panel [toggleable]="true" >
      <ng-template pTemplate="header">
        <div class="flex align-items-center gap-2">
          <span class="font-bold">{{ data?.title ?? '' }}</span>
        </div>
      </ng-template>
      @if (tableState != null) {
        <smz-ui-table class="w-full" [items]="data.tableData.data" [state]="tableState"></smz-ui-table>
      } @else {
        <div class="w-full h-full flex justify-center items-center">
          <p>Nenhum dado.</p>
        </div>
      }
    </p-panel>
    `
})
export class DataTableComponent implements OnInit {
  @Input() public data: SummaryPanel;
  public tableState: SmzTableState;

  public ngOnInit(): void {
    this.tableState = new SmzTableBuilder()
      .useTableEmptyMessage()
      .setEmptyFeedbackMessage('Nenhum dado')
      .disableRowHoverEffect()
      .useStrippedStyle()
      .setSize('small')
      .if(this.data.tableData.data.length > 10)
        .usePagination()
        .setPaginationDefaultRows(5)
        .setPaginationPageOptions([5, 10, 50])
        .endIf
      .columns()
        .for(this.data.tableData.headers, (_, header: SimpleNamedEntity) =>
          _.text(header.id, header.name, 'auto')
            .disableFilter()
            .disableSort()
            .columns)
        .table
      .build();
  }

}