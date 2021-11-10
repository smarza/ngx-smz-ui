import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SmzContentType, SmzTableState, SmzClipboardService, SmzFilterType, SmzTableBuilder } from 'ngx-smz-ui';
import { DemoTableDataService } from '../data-service/demo-tables-data-service';
import { Select, Store } from '@ngxs/store';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { DemoItem } from '@models/demo';
import { DemoFeatureActions } from '@states/demo/demo.actions'
import { SimpleNamedEntity } from 'ngx-smz-ui';

@Component({
  selector: 'app-demo-tables',
  templateUrl: './demo-tables.component.html',
  providers: [DemoTableDataService]
})

export class DemoTablesComponent implements OnInit {
  @Select(DemoFeatureSelectors.all) public items$: Observable<DemoItem[]>;

  public tableState: SmzTableState;
  public emptyData = [];
  public emptyTableState: SmzTableState;
  public loading = false;
  constructor(private clipboard: SmzClipboardService, private store: Store) {
    this.loadAll();
  }

  public ngOnInit(): void {
    this.setupTableWithFluent();
    // this.setupTableWithFluentFromUiDefinitions();
    // this.setupPaginationPersistence();

    this.emptyTableState = {
      emptyFeedback: {
        message: 'No itens to display',
        extraInfo: 'The database is empty, if you like, you could use the button bellow to start creating new items',
        image: 'assets/images/tables/empty.svg',
        actionButtons: [{
          label: 'New Foo',
          callback: () => { console.log('create new foo'); }
        }],
      },
      columns: [],
    };
  }

  public loadAll(): void {
    this.store.dispatch(new DemoFeatureActions.LoadAll());
  }

  public toggleVisibility(field: string): void
  {
    const matchIndex = this.tableState.columns.findIndex(x => x.field === field);

    if (matchIndex !== -1) {
      this.tableState.columns[matchIndex].isVisible = !this.tableState.columns[matchIndex].isVisible;

      this.tableState = { ...this.tableState };
    }
  }

  public setupTableWithFluentFromUiDefinitions(): void {
    this.tableState = new SmzTableBuilder('entity')
        .setTitle('Demo From Ui Definitions With Fluent')
        .enableClearFilters()
        .enableColumnVisibility()
        .setEmptyFeedbackMessage('Lista vazia')
        .setEmptyFeedbackExtraInfo('Clique abaixo para carregar novos dados.')
        .addEmptyFeedbackButton('Atualizar', () => console.log('---'))
        .usePagination()
        .setPaginationDefaultRows(50)
        .setCustomInitialSorting({ field: 'number', order: -1 })
        .useStrippedStyle()
        .menu()
          .item('Consultar')
            .setCallback((event: any) => console.log('---'))
            .menu
          .table
      .build();
  }

  public setupTableWithFluent(): void {

    this.tableState = new SmzTableBuilder()
      .setTitle('Demo With Fluent')
      .enableClearFilters()
      .enableColumnVisibility()
      .setEmptyFeedbackMessage('Lista vazia')
      .setEmptyFeedbackExtraInfo('Clique abaixo para carregar novos dados.')
      .addEmptyFeedbackButton('Atualizar', () => console.log('---'))
      .usePagination()
      .setPaginationDefaultRows(50)
      .setCustomInitialSorting({ field: 'number', order: -1 })
      .useStrippedStyle()
      .useAutoWidth()
      .menu()
        .item('Consultar')
          .setCallback((event: any) => console.log('---'))
          .menu
        .table
      .columns()
        .text('name', 'Name')
          .disableFilter()
          .columns
        // .text('company', 'Company')
        //   .disableFilter()
        //   .disableSort()
        //   .columns
        .text('country.name', 'Country')
          .setFilter(SmzFilterType.MULTI_SELECT)
          .disableSort()
          .columns
        .dataTransform('country.name.id', 'Super Country 2', (country: SimpleNamedEntity, row: any) => {
            // console.log('dataTransform', country, row);
            return `test: ${country?.name?.toUpperCase()}`;
          })
          .columns
        .dataTransform('country', 'Super Country', (country: SimpleNamedEntity, row: any) => {
            // console.log('dataTransform', country, row);
            return `super: ${country?.name?.toUpperCase()}`;
          })
          .setFilter(SmzFilterType.MULTI_SELECT)
          .columns
        .dataTransform('roles', 'Perfis', (roles: SimpleNamedEntity[], row: any) => { return roles.map(x => x.name).join(', '); })
          .setFilter(SmzFilterType.MULTI_SELECT_ARRAY)
          .columns
        .table
      .build();

      console.log(this.tableState);

  }

  public setupPaginationPersistence(): void {

    this.tableState = new SmzTableBuilder('entity')
      .setTitle('Demo - Pagination Persistence')
      .usePagination()
      .setPaginationDefaultRows(1)
      .setPaginationPageOptions([1, 2, 10])
      .setPaginationInitialPage(2)
      .menu()
        .item('Abrir Detalhes')
          .setCallback((event: any) => console.log(event))
          .menu
        .item('Rastrear mercadorias')
          .addChild('child')
            .setCallback((event: any) => console.log(event))
            .setActivationRule(() => true)
            .applyChild()
          .addChild('child2')
            .setCallback((event: any) => console.log(event))
            .applyChild()
          .menu
        .table
      .build();

      console.log(this.tableState);
  }

  public setupTableWithObject(): void {

    this.tableState = {
      actions: {
        customActions: {
          isVisible: true,
          columnWidth: 60,
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
        title: 'State criado com Objeto',
        toolbarAlignment: 'start',
        clearFilters: {
          isButtonVisible: true,
          callback: null,
          label: 'Limpar Filtro',
        },
        columnVisibility: {
          showDropdownSelector: true,
          showColumnHideButton: true
        },
        globalFilter: {
          isVisible: true,
          expanded: false,
          placeholder: 'Pesquisa Global'
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
        actionButtons: [{
          label: 'Ação',
          callback: () => { console.log('ação'); }
        }],
        image: 'assets/images/tables/empty.svg',
      },
      pagination: {
        isVisible: true,
        rows: 10,
        rowsPerPageOptions: [5, 10, 50, 100, 500],
        pageReport: {
          isVisible: true,
          template: 'Showing items {first} to {last} of a total of {totalRecords} items'
        },
        state: { first: 0, rows: 10 }
      },
      sort: {
        field: null,
        mode: 'single',
        order: 1,
        multiSortMeta: null
      },
      styles: {
        striped: true
      },
      columns: [
        {
          field: 'isActive',
          property: 'isActive',
          header: 'Situação',
          isOrderable: false,
          width: '8em',
          isVisible: true,
          content: {
            type: SmzContentType.ICON,
            data: { matches: [ { icon: 'fas fa-check', class: 'green-text darken-3', value: true }, { icon: 'fas fa-times', class: 'red-text darken-2', value: false } ] }
          },
          filter: {
            type: SmzFilterType.BOOLEAN,
            isGlobalFilterable: false
          },
        },
        {
          field: 'number',
          property: 'number',
          header: 'Número',
          isOrderable: false,
          width: '8em',
          isVisible: true,
          content: {
            type: SmzContentType.TEXT,
          },
          filter: {
            type: SmzFilterType.TEXT,
            isGlobalFilterable: true
          },
        },
        {
          field: 'plant.name',
          property: 'plant',
          header: 'Planta',
          isOrderable: true,
          width: '8em',
          isVisible: true,
          content: {
            type: SmzContentType.TEXT,
          },
          filter: {
            type: SmzFilterType.DROPDOWN,
            isGlobalFilterable: true
          },
        },
        {
          field: 'campaign.name',
          property: 'campaign',
          header: 'Campanha',
          isOrderable: true,
          isVisible: true,
          content: {
            type: SmzContentType.TEXT,
          },
          filter: {
            type: SmzFilterType.MULTI_SELECT,
            isGlobalFilterable: true
          },
        },
        {
          field: 'description',
          property: 'description',
          header: 'Descrição',
          isOrderable: true,
          isVisible: true,
          content: {
            type: SmzContentType.TEXT,
          },
          filter: {
            type: SmzFilterType.NONE,
            isGlobalFilterable: true
          },
        },
        {
          field: 'date',
          property: 'date',
          header: 'Data',
          isOrderable: true,
          width: '8em',
          isVisible: true,
          content: {
            type: SmzContentType.CALENDAR,
            data: { format: 'shortTime' }
          },
          filter: {
            type: SmzFilterType.DATE,
            isGlobalFilterable: true
          },
        },
      ],
    };

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

}