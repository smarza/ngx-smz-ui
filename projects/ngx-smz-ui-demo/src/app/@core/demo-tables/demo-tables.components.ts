import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SmzContentType, SmzTableState, SmzClipboardService, SmzFilterType } from 'ngx-smz-ui';
import { DemoTableDataService } from './data-service/demo-tables-data-service';

const jsonData = '[{"id":"6eaed794-e6ba-4d61-9c2c-08d8da43305f","number":"PT-0001","isActive":true,"description":"Permissão de trabalho de exemplo 1","plant":{"id":"2d164cb8-c7e2-4aba-2433-08d8da432fcf","name":"P-76"},"campaign":{"id":"f2f9690a-198d-4209-613f-08d8da433018","name":"Parada de Produção de P76"},"price":1923.23,"date":"2021-03-02T13:35:49.278Z"},{"id":"80d2a15a-d3e9-4fde-9c2e-08d8da43305f","number":"PT-0002","isActive":false,"description":"Permissão de trabalho de exemplo 2","plant":{"id":"2d164cb8-c7e2-4aba-2433-08d8da432fcf","name":"P-76"},"campaign":{"id":"f2f9690a-198d-4209-613f-08d8da433018","name":"Parada de Produção de P76"},"price":2000.1,"date":"2021-02-15T13:35:49.278Z"},{"id":"6eaed794-e6ba-4d61-9c2c-08d8da433058","number":"PT-0003","isActive":false,"description":"Permissão de trabalho de exemplo 3","plant":{"id":"2d164cb8-c7e2-4aba-2433-08d8da432fcy","name":"P-74"},"campaign":{"id":"f2f9690a-198d-4209-613f-08d8da433016","name":"Parada de Produção de P74"},"price":23467.92,"date":"2021-04-20T13:35:49.278Z"}]';

@Component({
  selector: 'app-demo-tables',
  templateUrl: './demo-tables.component.html',
  providers: [DemoTableDataService]
})

export class DemoTablesComponent implements OnInit {
  public items$: Observable<any[]>;
  public tableState: SmzTableState;
  public emptyData = [];
  public emptyTableState: SmzTableState;
  public loading = false;
  constructor(private clipboard: SmzClipboardService) {

    // this.loadItems();
    this.items$ = of(null);

    setTimeout(() => {
      this.loadItems();
      // this.items$ = of([]);
    }, 5000);
  }

  ngOnInit() {
    this.setupTable();

    // setTimeout(() => {
    //   this.tableState = null;
    //   setTimeout(() => {
    //     this.setupTable();
    //   }, 2000);
    // }, 2000);
  }

  public toggleVisibility(field: string): void
  {
    const matchIndex = this.tableState.columns.findIndex(x => x.field === field);

    if (matchIndex !== -1) {
      this.tableState.columns[matchIndex].isVisible = !this.tableState.columns[matchIndex].isVisible;

      this.tableState = { ...this.tableState };
    }
  }

  public test(event: any): void {
    console.log('selection change', event);
  }

  public copy(event: string): void {
    console.log('copy', event);

    this.clipboard.copy(event);
  }

  public tableLog(smzTable: any, primeTable: any): void {
    console.log('smzTable', smzTable);
    console.log('primeTable', primeTable);
  }

  public loadItems(): void {
    const items = JSON.parse(jsonData);
    this.items$ = of([...items]);
  }

  public setupTable(): void {

    this.tableState = {
      actions: {
        customActions: {
          isVisible: true,
          columnWidth: '8em',
        },
        menu: {
          isVisible: true,
          items: [
            {
              conditional: { condition: (item: any) => (item.plant.name === 'P-76'), property: 'visible' },
              label: 'Básico',
              items: [
                {
                  label: 'Estado',
                  // conditional: { condition: (item: any) => (item.isActive), property: 'visible' },
                  transforms: [
                    (item: any) => (item.isActive ?
                      { icon: 'fas fa-lightbulb green-text', command: (event) => { console.log('Desabilitar', event); } } :
                      { icon: 'far fa-lightbulb grey-text', command: (event) => { console.log('Habilitar', event); } })
                  ],
                },
                { label: 'Editar', icon: 'fas fa-biohazard', command: (event) => this.test(event) },
                { label: 'Apagar', icon: 'fas fa-candy-cane', command: (event) => this.test(event) },
                { label: 'Teste', icon: 'fab fa-cloudversify', command: (event) => { this.toggleVisibility('plant.name'); } },
                { label: 'Copy Description', icon: 'far fa-copy', command: (event) => {
                  this.copy(`O processo de merge para o arquivo Task1_Proj1.env falhou. Erro desconhecido. ExitCode: 1
                  Saída:
                  Total of 2 file(s).
                  Listing files: Only root's files.
                  1) Merging file C:/Users/carlo/Desktop/projetos/tecgraf/temp/conversor-proteus/back/ProteusConverter.Hangfire/bin/Debug/net5.0/@@models_temp/REFINO/GASLUB/Task1_Proj1/Environ/temp\Review-SE-1230-CIV.env
                  Error: Decompressing Error
                  C:/projects/environ2/environInstaller/converter/envmerger/sources/main.cpp(246)
                  Error decompressing file: C:/Users/carlo/AppData/Local/Temp/sn08..env3d

                  Usage: C:\Users\carlo\Desktop\projetos\tecgraf\temp\conversor-proteus\back\ProteusConverter.Hangfire\bin\Debug\net5.0\Environ_Converter\envmerger.exe [options]

                  Options:
                    -?, -h, --help                   Displays this help.
                    --input, -i <file/folder name>   Input file(s) or folder(s). Each one should
                                                     be passed after this option flag.
                    --output, -o <output file name>  Output file.
                    --group, -g                      Group files without changing the hierarchy.
                    --PDS, -P                        Merge files according to PDS rules. The
                                                     final hierarchy will be changed.
                    --SP3D, -S                       Merge files according to SP3D rules. The
                                                     final hierarchy will be changed.
                    --subdivide-equipment, -s        If --PDS flag is set this flag to subdivide
                                                     equipments into individual components.
                    --recursive, -r                  Uses all '.env'' files in subfolders too. If
                                                     this parameter is not set, then it will merge
                                                     only '.env' files in root directory.
                    --proteusId, --pmid <ProteusId>  Id do modelo no proteus para verificar a
                                                     existΩncia de um modelo mais atual.



                  `);
                }}
              ]
            },
            {
              label: 'Avançado',
              items: [
                { label: 'Avançado 1', icon: 'fas fa-charging-station', command: (event) => { console.log('Avançado 1'); } },
                {
                  label: 'Avançado (P-74)',
                  conditional: { condition: (item: any) => (item.plant.name !== 'P-74'), property: 'disabled' },
                  command: (event) => { console.log('Condicional 3', event); },
                  transforms: [
                    (item: any) => (item.plant.name !== 'P-74' ?
                      { icon: 'far fa-angry' } :
                      { icon: 'fal fa-grin-tongue-wink' })
                  ],},
              ]
            },
          ],
        },
        rowBehavior: {
          isClickable: false,
          // clickCallback: (event) => { console.log('click...', event); },
          hoverable: false,
        }
      },
      caption: {
        isVisible: true,
        title: 'Título da Tabela de Demo',
        toolbarAlignment: 'start',
        clearFilters: {
          isButtonVisible: true,
          callback: null,
          label: 'Limpar Filtro',
        },
        columnVisibility: {
          showButton: false,
        },
        globalFilter: {
          isVisible: true,
        },
        rowSelection: {
          isButtonVisible: true,
          columnWidth: '3em',
          callback: () => console.log('test'),
          isEnabled: false,
          label: 'Seleção'
        },
      },
      emptyFeedback: {
        message: 'Lista Vazia',
        extraInfo: 'extraInfo',
        actionButton: {
          label: 'Ação',
          callback: () => { console.log('ação'); }
        },
        image: 'assets/images/tables/empty.svg',
      },
      pagination: {
        isVisible: true,
        rows: 10,
        rowsPerPageOptions: [5, 10, 50, 100, 500],
        pageReport: {
          isVisible: true,
          template: 'Showing items {first} to {last} of a total of {totalRecords} items'
        }
      },
      sort: {
        field: null,
        mode: 'single',
        order: 1,
        multiSortMeta: null
      },
      columns: [
        {
          contentType: SmzContentType.ICON,
          contentData: { useTemplate: false, matches: [ { icon: 'fas fa-check', class: 'green-text darken-3', value: true }, { icon: 'fas fa-times', class: 'red-text darken-2', value: false } ] },
          field: 'isActive',
          filterType: SmzFilterType.BOOLEAN,
          header: 'Situação',
          isGlobalFilterable: false,
          isOrderable: false,
          showFilter: false,
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
      ],
    };

    this.emptyTableState = {
      emptyFeedback: {
        message: 'No itens to display',
        extraInfo: 'The database is empty, if you like, you could use the button bellow to start creating new items',
        image: 'assets/images/tables/empty.svg',
        actionButton: {
          label: 'New Foo',
          callback: () => { console.log('create new foo'); }
        },
      },
      columns: [],
    };
  }

}