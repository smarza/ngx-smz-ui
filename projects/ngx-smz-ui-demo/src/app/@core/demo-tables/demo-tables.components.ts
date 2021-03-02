import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SmzTableConfig } from 'ngx-smz-ui';
import { SmzControlType } from 'ngx-smz-dialogs';
import { DemoTableDataService } from './data-service/demo-tables-data-service';
import { fixDates } from 'ngx-rbk-utils';

const jsonData = '[{"id":"6eaed794-e6ba-4d61-9c2c-08d8da43305f","number":"PT-0001","description":"Permissão de trabalho de exemplo 1","plant":{"id":"2d164cb8-c7e2-4aba-2433-08d8da432fcf","name":"P-76"},"campaign":{"id":"f2f9690a-198d-4209-613f-08d8da433018","name":"Parada de Produção de P76"},"price":1923.23,"date":"2021-03-02T13:35:49.278Z"},{"id":"80d2a15a-d3e9-4fde-9c2e-08d8da43305f","number":"PT-0002","description":"Permissão de trabalho de exemplo 2","plant":{"id":"2d164cb8-c7e2-4aba-2433-08d8da432fcf","name":"P-76"},"campaign":{"id":"f2f9690a-198d-4209-613f-08d8da433018","name":"Parada de Produção de P76"},"price":2000.1,"date":"2021-02-15T13:35:49.278Z"},{"id":"6eaed794-e6ba-4d61-9c2c-08d8da433058","number":"PT-0003","description":"Permissão de trabalho de exemplo 3","plant":{"id":"2d164cb8-c7e2-4aba-2433-08d8da432fcy","name":"P-74"},"campaign":{"id":"f2f9690a-198d-4209-613f-08d8da433016","name":"Parada de Produção de P74"},"price":23467.92,"date":"2021-04-20T13:35:49.278Z"}]';

@Component({
  selector: 'app-demo-tables',
  templateUrl: './demo-tables.component.html',
  providers: [DemoTableDataService]
})

export class DemoTablesComponent implements OnInit {
  public items$: Observable<any[]>;
  public config: SmzTableConfig;
  public loading = false;
  constructor(private dataService: DemoTableDataService) {
    const items = JSON.parse(jsonData);
    this.items$ = of([...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items]).pipe(fixDates());
  }

  ngOnInit() {
    this.setupTableConfig();
  }

  public test(event: any): void {
    console.log('test', event);
  }

  public toogleIsSelectable(): void {
    this.config = { ...this.config, isSelectable: !this.config.isSelectable }
  }

  public setupTableConfig(): void {
    this.config = {
      currentPageReportTemplate: 'Mostrando {first} a {last} de {totalRecords} itens',
      isSelectable: true,
      rowHover: true,
      rows: 5,
      rowsPerPageOptions: [5, 10, 50, 100, 500],
      showActions: true,
      showCaption: true,
      showCurrentPageReport: true,
      showGlobalFilter: true,
      showPaginator: true,
      title: 'Permissões de Trabalho',
      useCustomActions: false,
      menu: [
        { label: 'Editar', icon: 'pi pi-fw pi-plus', command: (event) => this.test(event) },
        { separator: true },
        { label: 'Apagar', icon: 'pi pi-fw pi-download', command: (event) => this.test(event) },
      ],
      columns: [
        {
          contentType: SmzControlType.TEXT,
          field: 'number',
          filterControlType: SmzControlType.TEXT,
          header: 'Número',
          isGlobalFilterable: true,
          isOrderable: false,
          isSimpleNamed: false,
          overrideContent: false,
          showFilter: true,
          width: '8em',
          isVisible: true,
        },
        {
          contentType: SmzControlType.TEXT,
          field: 'plant',
          filterControlType: SmzControlType.TEXT,
          header: 'Planta',
          isGlobalFilterable: true,
          isOrderable: true,
          isSimpleNamed: true,
          overrideContent: false,
          showFilter: true,
          width: '8em',
          isVisible: true,
        },
        {
          contentType: SmzControlType.TEXT,
          field: 'campaign',
          filterControlType: SmzControlType.MULTI_SELECT,
          header: 'Campanha',
          isGlobalFilterable: true,
          isOrderable: true,
          isSimpleNamed: true,
          overrideContent: false,
          showFilter: true,
          isVisible: true,
        },
        {
          contentType: SmzControlType.TEXT,
          field: 'description',
          filterControlType: SmzControlType.TEXT,
          header: 'Descrição',
          isGlobalFilterable: true,
          isOrderable: true,
          isSimpleNamed: false,
          overrideContent: false,
          showFilter: true,
          isVisible: true,
        },
        {
          contentType: SmzControlType.CURRENCY,
          field: 'price',
          filterControlType: SmzControlType.CURRENCY,
          header: 'Preço',
          isGlobalFilterable: true,
          isOrderable: true,
          isSimpleNamed: false,
          overrideContent: false,
          showFilter: true,
          width: '8em',
          isVisible: true,
        },
        {
          contentType: SmzControlType.CALENDAR,
          field: 'date',
          filterControlType: SmzControlType.CALENDAR,
          header: 'Data',
          isGlobalFilterable: true,
          isOrderable: true,
          isSimpleNamed: false,
          overrideContent: false,
          showFilter: true,
          width: '8em',
          isVisible: true,
        },
      ]
    };
  }

}