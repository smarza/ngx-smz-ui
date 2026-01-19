import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { NgxSmzTablesModule, SimpleNamedEntity, SmzTableBuilder, SmzTableState } from '@ngx-smz/core';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { VisualizationPanel } from '@models/visualization-panel';
import { DataChartComponent } from './data-chart.component';

@Component({
  selector: 'app-data-visualization',
  standalone: true,
  imports: [CommonModule, PanelModule, NgxSmzTablesModule, SelectButtonModule, FormsModule, DataChartComponent],
  template: `
    <p-panel [toggleable]="true">
      <ng-template pTemplate="header">
        <div class="flex align-items-center gap-2">
            <span class="font-bold">{{ data?.title ?? '' }}</span>
        </div>
      </ng-template>
      <ng-template pTemplate="icons">
        <p-selectButton [options]="panelViews" [(ngModel)]="panelView" optionLabel="icon" optionValue="value" allowEmpty="false" (onChange)="togglePanelView($event)">
          <ng-template #item let-item>
            <i [class]="item.icon"></i>
          </ng-template>
        </p-selectButton>
      </ng-template>

      <ng-container *ngIf="panelView === 'table'">
        <ng-container *ngIf="tableState != null; else emptyTable">
          <smz-ui-table class="w-full" [items]="data.tableData.data" [state]="tableState"></smz-ui-table>
        </ng-container>
        <ng-template #emptyTable>
          <div class="w-full h-full flex justify-center items-center">
            <p>Nenhum dado.</p>
          </div>
        </ng-template>
      </ng-container>

      <ng-container *ngIf="panelView === 'chart'">
        <app-data-chart [data]="data.chartData" [maintainAspectRatio]="maintainAspectRatio" [aspectRatio]="aspectRatio"></app-data-chart>
      </ng-container>
    </p-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DataVisualizationComponent implements OnInit {
  @Input() public data: VisualizationPanel;
  @Input() public maintainAspectRatio = true;
  @Input() public aspectRatio = 2;
  public tableState: SmzTableState;
  public panelView = 'chart';
  public panelViews: { label: string, icon: string, value: string }[] = [
    { label: 'Table', icon: 'fa-solid fa-table', value: 'table' },
    { label: 'Chart', icon: 'fa-solid fa-chart-column', value: 'chart' }
  ];

  public togglePanelView(event: SelectButtonChangeEvent): void {
    this.panelView = event.value;
  }

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