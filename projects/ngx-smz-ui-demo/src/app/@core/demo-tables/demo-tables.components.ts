import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SmzContentType, SmzTableConfig } from 'ngx-smz-ui';
import { DemoTableDataService } from './data-service/demo-tables-data-service';
import { SmzFilterType } from 'projects/ngx-smz-ui/src/public-api';

const jsonData = '[{"id":"6eaed794-e6ba-4d61-9c2c-08d8da43305f","number":"PT-0001","isActive":true,"description":"Permissão de trabalho de exemplo 1","plant":{"id":"2d164cb8-c7e2-4aba-2433-08d8da432fcf","name":"P-76"},"campaign":{"id":"f2f9690a-198d-4209-613f-08d8da433018","name":"Parada de Produção de P76"},"price":1923.23,"date":"2021-03-02T13:35:49.278Z"},{"id":"80d2a15a-d3e9-4fde-9c2e-08d8da43305f","number":"PT-0002","isActive":false,"description":"Permissão de trabalho de exemplo 2","plant":{"id":"2d164cb8-c7e2-4aba-2433-08d8da432fcf","name":"P-76"},"campaign":{"id":"f2f9690a-198d-4209-613f-08d8da433018","name":"Parada de Produção de P76"},"price":2000.1,"date":"2021-02-15T13:35:49.278Z"},{"id":"6eaed794-e6ba-4d61-9c2c-08d8da433058","number":"PT-0003","isActive":false,"description":"Permissão de trabalho de exemplo 3","plant":{"id":"2d164cb8-c7e2-4aba-2433-08d8da432fcy","name":"P-74"},"campaign":{"id":"f2f9690a-198d-4209-613f-08d8da433016","name":"Parada de Produção de P74"},"price":23467.92,"date":"2021-04-20T13:35:49.278Z"}]';

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

    this.loadItems();
    // this.items$ = of([]);
  }

  ngOnInit() {
    this.setupTableConfig();

    // setTimeout(() => {
    //   this.config = null;
    //   setTimeout(() => {
    //     this.setupTableConfig();
    //   }, 2000);
    // }, 2000);
  }

  public toggleVisibility(field: string): void
  {
    const matchIndex = this.config.columns.findIndex(x => x.field === field);

    if (matchIndex !== -1) {
      this.config.columns[matchIndex].isVisible = !this.config.columns[matchIndex].isVisible;

      this.config = { ...this.config };
    }
  }

  public test(event: any): void {
    console.log('selection change', event);
  }

  public loadItems(): void {
    const items = JSON.parse(jsonData);
    this.items$ = of([...items]);
  }

  public toogleIsSelectable(): void {
    this.config = { ...this.config, isSelectable: !this.config.isSelectable };
  }

  public setupTableConfig(): void {
    this.config = {
      currentPageReportTemplate: 'Mostrando {first} a {last} de {totalRecords} itens',
      isSelectable: true,
      selectBoxWidth: '3em',
      rowHover: true,
      rows: 5,
      rowsPerPageOptions: [5, 10, 50, 100, 500],
      showActions: true,
      showCaption: true,
      showCurrentPageReport: true,
      showGlobalFilter: true,
      showPaginator: false,
      showClearFilter: true,
      title: 'Permissões de Trabalho',
      useCustomActions: false,
      customActionWidth: '5em',
      emptyMessage: 'Lista vazia',
      customEmptyMessage: {
        message: 'Lista vazia',
        callbackLabel: 'Atualizar',
        callbackInfo: 'Clique abaixo para carregar novos dados.',
        callback: () => { console.log('atualizando...'); },
        image: null,
      },
      isRowClickable: true,
      rowClickCallback: (event) => { console.log('click...', event); },
      menu: [
        { label: 'Editar', icon: 'pi pi-fw pi-plus', command: (event) => this.test(event) },
        { separator: true },
        { label: 'Apagar', icon: 'pi pi-fw pi-download', command: (event) => this.test(event) },
        { label: 'Teste', command: (event) => { this.toggleVisibility('plant.name'); } }
      ],
      columns: [
        {
          contentType: SmzContentType.ICON,
          contentData: { useTemplate: false, matches: [ { icon: 'fas fa-check', class: 'green-text darken-3', value: true }, { icon: 'fas fa-times', class: 'red-text darken-2', value: false } ] },
          field: 'isActive',
          filterType: SmzFilterType.BOOLEAN,
          header: 'Situação',
          isGlobalFilterable: false,
          isOrderable: false,
          showFilter: true,
          width: '8em',
          isVisible: true,
        },
        {
          contentType: SmzContentType.TEXT,
          contentData: { useTemplate: false },
          field: 'number',
          filterType: SmzFilterType.TEXT,
          header: 'Número',
          isGlobalFilterable: true,
          isOrderable: false,
          showFilter: true,
          width: '8em',
          isVisible: true,
        },
        {
          contentType: SmzContentType.TEXT,
          contentData: { useTemplate: false },
          field: 'plant.name',
          filterType: SmzFilterType.DROPDOWN,
          header: 'Planta',
          isGlobalFilterable: true,
          isOrderable: true,
          showFilter: true,
          width: '8em',
          isVisible: true,
        },
        {
          contentType: SmzContentType.TEXT,
          contentData: { useTemplate: false },
          field: 'campaign.name',
          filterType: SmzFilterType.MULTI_SELECT,
          header: 'Campanha',
          isGlobalFilterable: true,
          isOrderable: true,
          showFilter: true,
          isVisible: true,
        },
        {
          contentType: SmzContentType.TEXT,
          contentData: { useTemplate: false },
          field: 'description',
          filterType: SmzFilterType.TEXT,
          header: 'Descrição',
          isGlobalFilterable: true,
          isOrderable: true,
          showFilter: true,
          isVisible: true,
        },
        // {
        //   contentType: SmzContentType.CURRENCY,
        //   contentData: { useTemplate: true },
        //   field: 'price',
        //   filterType: SmzFilterType.CURRENCY,
        //   header: 'Preço',
        //   isGlobalFilterable: true,
        //   isOrderable: true,
        //   showFilter: true,
        //   width: '8em',
        //   isVisible: true,
        // },
        {
          contentType: SmzContentType.CALENDAR,
          contentData: { useTemplate: false, format: 'shortDate' },
          field: 'date',
          filterType: SmzFilterType.DATE,
          header: 'Data',
          isGlobalFilterable: true,
          isOrderable: true,
          showFilter: true,
          width: '8em',
          isVisible: true,
        },
      ]
    };
  }

}