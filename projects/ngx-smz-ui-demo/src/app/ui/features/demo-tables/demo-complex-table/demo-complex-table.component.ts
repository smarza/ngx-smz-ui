import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SmzContentType, SmzFilterType, SmzTableBuilder, SmzTableColumn, SmzTableComponent, SmzTableState } from 'ngx-smz-ui';
import { CustomerService } from '../data-service/customer.service';

@Component({
    templateUrl: './demo-complex-table.component.html',
    styleUrls: ['./demo-complex-table.component.scss'],
    providers: [CustomerService]
})
export class DemoComplexTableComponent implements OnInit {

    @ViewChild(SmzTableComponent) public smzUiTable: SmzTableComponent;
    public tableState: SmzTableState;
    public results: any[];
    public isDataReady = false;

    constructor(private cdf: ChangeDetectorRef, private http: HttpClient) {

        this.tableState = new SmzTableBuilder()
            .setTitle('Resultados')
            .enableGlobalFilter()
            .enableClearFilters()
            .usePagination()
            .setEmptyFeedbackMessage('Nenhum Resultado')
            .enableColumnVisibility(true)
            .enableResizableColumns('expand')
            .setScrolling('flex')
            .useGridStyle()
            .setSize('large')
            .useStrippedStyle()
            .disableRowHoverEffect()
            .build();
    }

    ngOnInit() {
        this.run();
    }

    public run(): void {

        this.http.get<any[]>('./assets/complex-data.json').subscribe(results => {

            this.results = results.slice(0, 50);
            console.log(results[0]);
            this.tableState.columns = this.buildColumns(results[0]);

            this.isDataReady = true;
          });

    }

    private buildColumns(element: any): SmzTableColumn[] {
        console.groupCollapsed('buildColumns', Object.keys(element).length);
        const columns: SmzTableColumn[] = [];
        for (const key of Object.keys(element)) {
          columns.push({
              field: key,
              property: key,
              filter: { isGlobalFilterable: true, type: SmzFilterType.TEXT },
              header: key,
              isVisible: true,
              content: { type: SmzContentType.TEXT, data: null },
              width: 'fit'
            });
          console.log(key, columns[columns.length - 1]);
        }

        console.groupEnd();

        return columns;
      }
}