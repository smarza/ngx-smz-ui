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
      isDebug: false,
      isValid: true,
      rowExpansion: null,
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
      .useEstimatedColWidth()
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