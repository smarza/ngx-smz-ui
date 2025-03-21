import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { GlobalInjector, SimpleNamedEntity, SmzExportableContentType, SmzFilterType, SmzTableBuilder, SmzTableState, namesof } from 'ngx-smz-ui';
import { of } from 'rxjs';
import { convertorTasks } from './../data/conversor-tasks';
import { Observable } from 'rxjs/internal/Observable';
import { DemoFeatureActions } from '@states/demo/demo.actions';
import { LARGE_TABLE_DATA } from '../data/large-table';
import { EditableTablePartialData, EditableTablePartialLevels, Levels } from '../data/tables/editable-table-partial-data';
import { DemoItem } from '@models/demo';
import moment from 'moment';

const store = GlobalInjector.instance.get(Store);

export const TablesDemo: { [key: string]: { items$: Observable<any[]>, code: () => SmzTableState } } = {
  //
  [DemoKeys.TABLE_UI_DEFINITIONS]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder('entity')
        .setTitle('Demo From Ui Definitions With Fluent')
        .enableClearFilters()
        .enableColumnVisibility()
        .enableGlobalFilter()
        .useGridStyle()
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
          .for(['Button A', 'Button B'], (_, item: string) =>
            _
            .item(item)
            .setCallback((event: any) => console.log('---'))
            .menu
          )
          .table
      .build()
  }
  },

  [DemoKeys.TABLE_MULTI_LANGUAGES]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder<DemoItem>('entity')
        .setTitle('Demo Table With Multilanguage en-US')
        .enableClearFilters()
        .enableColumnVisibility()
        .enableGlobalFilter()
        .setEmptyFeedbackMessage('Lista vazia')
        .setEmptyFeedbackExtraInfo('Clique abaixo para carregar novos dados.')
        .addEmptyFeedbackButton('Atualizar', () => console.log('---'))
        .usePagination()
        .setPaginationDefaultRows(50)
        .setCustomInitialSorting({ field: 'number', order: -1 })
        .useStrippedStyle()
        .setLocale('en-US')
        .menu()
          .item()
            .addChild('Ver Histórico')
              .setCallback((data) => console.log(data))
              .applyChild()
            .for(['Button A', 'Button B'], (_, item) =>
              _
              .addChild(item)
                .setCallback((data) => console.log(data))
                .applyChild()
            )
            .menu
          .table
      .build()
  }
  },
  //
  [DemoKeys.TABLE_BASIC]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder()
      .setTitle('Demo Basic')
      .enableClearFilters()
      .enableColumnVisibility()
      .enableGlobalFilter()
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
      .columns()
        .text('name', 'Name', '300px')
          .ignoreOnGlobalFilter()
          .headerActions()
            .add('fa-solid fa-print', (item: any) => { console.log('print', item); })
              .setStyleClass('text-sky-500')
              .setTooltip(() => `Teste 1`)
              .action
            .add('fa-solid fa-print', (item: any) => { console.log('print', item); })
              .setStyleClass('text-green-500')
              .setTooltip(() => `Teste 2`)
              .action
            .column
          .disableFilter()
          .columns
        .date('date', 'Data', '200px')
          .columns
        .custom('country.name', 'Country')
          .overrideGlobalFilter('country.name')
          .overrideFilter('country')
          .setFilter(SmzFilterType.MULTI_SELECT)
          .disableSort()
          .columns
        // .dataTransform('country.name', 'Super Country 2', (country: SimpleNamedEntity, row: any) => `test: ${row.country?.name?.toUpperCase()}`)
        //   .overrideGlobalFilter('country.name')
        //   .overrideFilter('country')
        //   .setFilter(SmzFilterType.MULTI_SELECT)
        //   .disableSort()
        //   .columns
        // .dataTransform('country', 'Super Country', (country: SimpleNamedEntity, row: any) => `super: ${country?.name?.toUpperCase()}`)
        //   .setFilter(SmzFilterType.MULTI_SELECT)
        //   .columns
        // .dataTransform('roles', 'Perfis', (roles: SimpleNamedEntity[], row: any) => { return roles.map(x => x.name).join(', '); })
        //   .setFilter(SmzFilterType.MULTI_SELECT_ARRAY)
        //   .columns
        .table
      .build()
    }
  },
  //
  [DemoKeys.TABLE_LAYOUT_VANILA]: {
    items$: store.select(DemoFeatureSelectors.allWithHtmlTags),
    code: () => {
    return new SmzTableBuilder()
      .debugMode()
      .setTitle('Vanila')

      // -----------------------------------------------------------------------------------
      // Exemplo: padrão
      // -----------------------------------------------------------------------------------
      // - A largura da tabela ocupará sempre 100% do container.
      // - Colunas com valores definidos serão respeitadas, exceto se a tabela precisar de espaço para ocupar a largura completa.
      // - Colunas com largura 'auto' ocuparão o espaço disponível de acordo com as regras do navegador
      // - Recomenda-se que pelo menos uma coluna seja definida como 'auto', caso contrário as colunas definidas poderão ser distorcidas.
      // ---> default
      // Sem métodos

      .useTableEmptyMessage()
      .useStrippedStyle()
      .menu()
        .item('Consultar')
          .setCallback((event: any) => console.log('---'))
          .menu
        .table
      .columns()
        .text('country.name', 'Auto', 'auto')
          .setFilter(SmzFilterType.MULTI_SELECT)
          .disableSort()
          .columns
        .dataTransform('name', 'Auto', (data: any, row: any) => `123456789`, 'auto')
          .columns
        .dataTransform('country', 'Auto', (country: SimpleNamedEntity, row: any) => (`Super duper: ${country?.name?.toUpperCase()}`))
          .columns
        .dataTransform('html', '300px', (data: any, row: any) => `123456789123456789`, '300px')
          .columns
        .dataTransform('html2', '200px', (data: any, row: any) => `123456789123456789`, '200px')
          .columns
        .dataTransform('roles', '100px', (data: any, row: any) => `123456789`, '100px')
          .columns
        .table
      .build()
    }
  },
  //
  [DemoKeys.TABLE_LAYOUT_ESTIMATING]: {
    items$: store.select(DemoFeatureSelectors.allWithHtmlTags),
    code: () => {
    return new SmzTableBuilder()
      .debugMode()
      .setTitle('Estimating')

      // -----------------------------------------------------------------------------------
      // Exemplo: utilizando estimativa de largura baseada em amostragem do conteúdo real
      // -----------------------------------------------------------------------------------
      // - A largura da tabela poderá ser menor ou maior que o container.
      // - Se a soma das larguras das colunas ultrapassarem a largura do container a tabela entrará em scroll horizontal.
      // - Colunas com largura 'auto' serão estimadas.
      // - Colunas com largura definida não serão estimadas.
      // ---> useEstimatedColWidth(null)
      .useEstimatedColWidth()

      .useTableEmptyMessage()
      .useStrippedStyle()
      .menu()
        .item('Consultar')
          .setCallback((event: any) => console.log('---'))
          .menu
        .table
      .columns()
        .text('country.name', 'Estimated (no max)', 'auto')
            .setFilter(SmzFilterType.MULTI_SELECT)
            .disableSort()
          .columns
        .dataTransform('name', 'Estimated (no max)', (data: any, row: any) => `123456789`, 'auto')
          .columns
        .dataTransform('country', 'Estimated (no max)', (country: SimpleNamedEntity, row: any) => (`Super duper: ${country?.name?.toUpperCase()}`))
          .columns
        .dataTransform('html', '300px', (data: any, row: any) => `123456789123456789`, '300px')
          .columns
        .dataTransform('html2', '200px', (data: any, row: any) => `123456789123456789`, '200px')
          .columns
        .dataTransform('roles', '100px', (data: any, row: any) => `123456789`, '100px')
          .columns
        .table
      .build()
    }
  },
  //
  [DemoKeys.TABLE_LAYOUT_ESTIMATING_WITH_MAX_WIDTH]: {
    items$: store.select(DemoFeatureSelectors.allWithHtmlTags),
    code: () => {
    return new SmzTableBuilder()
      .debugMode()
      .setTitle('Estimating With Max Width')

      // -----------------------------------------------------------------------------------
      // Exemplo: utilizando estimativa de largura baseada em amostragem do conteúdo real e tamanho máximo de coluna
      // -----------------------------------------------------------------------------------
      // - A largura da tabela poderá ser menor ou maior que o container.
      // - Se a soma das larguras das colunas ultrapassarem a largura do container a tabela entrará em scroll horizontal.
      // - Colunas com largura 'auto' serão estimadas mas não ultrapassarão o valor máximo global.
      // - Colunas com largura definida não serão estimadas, nem respeitarão o valor máximo global.
      // // ---> useEstimatedColWidth(maxWidthPx: number)
      .useEstimatedColWidth(200)

      .useTableEmptyMessage()
      .useStrippedStyle()
      .menu()
        .item('Consultar')
          .setCallback((event: any) => console.log('---'))
          .menu
        .table
      .columns()
        .text('country.name', 'Estimated', 'auto')
            .setFilter(SmzFilterType.MULTI_SELECT)
            .disableSort()
          .columns
        .dataTransform('name', 'Estimated', (data: any, row: any) => `123456789`, 'auto')
          .columns
        .dataTransform('country', 'Estimated (max 200px)', (country: SimpleNamedEntity, row: any) => (`Super duper mega power blast: ${country?.name?.toUpperCase()}`))
          .columns
        .dataTransform('html', '300px', (data: any, row: any) => `123456789123456789`, '300px')
          .columns
        .dataTransform('html2', '200px', (data: any, row: any) => `123456789123456789`, '200px')
          .columns
        .dataTransform('roles', '100px', (data: any, row: any) => `123456789`, '100px')
          .columns
        .table
      .build()
    }
  },
  //
  [DemoKeys.TABLE_ESTIMATIVE_WIDTH]: {
    // items$: of([]),
    items$: store.select(DemoFeatureSelectors.allWithHtmlTags),
    code: () => {
    return new SmzTableBuilder()
      .debugMode()
      .setTitle('')
      .useEstimatedColWidth(500)
      .useTableEmptyMessage()
      .useStrippedStyle()
      .menu()
        .item('Consultar')
          .setCallback((event: any) => console.log('---'))
          .menu
        .table
      .columns()
        .dataTransform('name', 'auto', (data: any, row: any) => `123456789`, 'auto')
          .columns
        .dataTransform('country', 'Auto', (country: SimpleNamedEntity, row: any) => (`super: ${country?.name?.toUpperCase()}`))
          .columns
        .dataTransform('html', '300px', (data: any, row: any) => `123456789123456789`, '300px')
          .columns
        .dataTransform('html2', '200px', (data: any, row: any) => `123456789123456789`, '200px')
          .columns
        .dataTransform('roles', '100px', (data: any, row: any) => `123456789`, '100px')
          .columns
        .table
      .build()
    }
  },
  //
  [DemoKeys.TABLE_ARRAY_FILTER]: {
    items$: of(convertorTasks.map(x => {
      const createdAt = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
      console.log('createdAt: ', createdAt);
      return {...x, createdAt}
    })),
    code: () => {
    return new SmzTableBuilder()
      .setTitle('Array Filter Demo')
      .enableClearFilters()
      .enableColumnVisibility()
      .enableGlobalFilter()
      .setEmptyFeedbackMessage('Lista vazia')
      .setEmptyFeedbackExtraInfo('Clique abaixo para carregar novos dados.')
      .usePagination()
      .setPaginationPageOptions([5, 10, 50, 100, 500])
      .setPaginationDefaultRows(500)
      .useStrippedStyle()
      .useCustomActions(60)
      .columns()
        .text('name', 'Nome', '8em')
          .setFilter(SmzFilterType.MULTI_SELECT_STRING)
          .columns
        .date('createdAt', 'Data de criação', '10em')
          .columns
        // .dataTransform('createdAt', 'Data de criação', (createdAt: Date) => (moment(createdAt).format('DD/MM/YYYY HH:mm:ss')), '10em')
        //   .overrideGlobalFilter('createdAt')
        //   .columns
        .dataTransform('plantDesign', 'Plant Design', (plantDesign: any) => (plantDesign.name), '10em')
          .setFilter(SmzFilterType.MULTI_SELECT_ARRAY)
          .overrideGlobalFilter('plantDesign.name')
          .columns
        .text('files', 'Arquivos', '4em')
          .setFilter(SmzFilterType.NUMERIC)
          .columns
        .dataTransform('converters', 'Conversores', (converters) => (converters.map(x => x.name).join(', ')), '10em')
          .setFilter(SmzFilterType.MULTI_SELECT_ARRAY)
          .columns
        .icon('isAutoTask', 'Gerenciamento', '6em')
          .addIconConfiguration('fas fa-lock', true, 'red-text', 'Tarefa com gerenciamento automático (edição parcialmente bloqueada)')
          .addIconConfiguration('fas fa-lock-open', false, 'green-text', 'Tarefa criada manualmente (edição permitida)')
          .columns
        .table
      .build()
    }
  },
  //
  [DemoKeys.TABLE_IF]: {
    items$: of(convertorTasks),
    code: () => {
    return new SmzTableBuilder()
      .setTitle('Table with conditional columns')
      .enableClearFilters()
      .enableColumnVisibility()
      .setEmptyFeedbackMessage('Lista vazia')
      .setEmptyFeedbackExtraInfo('Clique abaixo para carregar novos dados.')
      .usePagination()
      .setPaginationPageOptions([5, 10, 50, 100, 500])
      .setPaginationDefaultRows(500)
      .useStrippedStyle()
      .useCustomActions(60)
      .columns()
        .text('name', 'Outside if', '8em')
          .columns
        .if(false)
          .text('plantDesign.name', 'Inside if 1', '7em')
            .setFilter(SmzFilterType.MULTI_SELECT)
            .columns
          .endIf
        .if(true)
          .text('files', 'Inside if 2', '4em')
            .setFilter(SmzFilterType.NUMERIC)
            .columns
          .endIf
        .table
      .build()
    }
  },
  //
  [DemoKeys.TABLE_ROW_EXPANSION]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder('entity')
        .setTitle('Demo Row Expansion')
        .enableClearFilters()
        .enableColumnVisibility()
        .enableGlobalFilter()
        // .setRowClickCallback((event) => { store.dispatch(new DemoFeatureActions.Create({name: 'test', company: 'test2', countryId: '3fb9838e-2f62-42a3-9ebc-09f236bc3c12'}));})
        .setEmptyFeedbackMessage('Lista vazia')
        .setEmptyFeedbackExtraInfo('Clique abaixo para carregar novos dados.')
        .addEmptyFeedbackButton('Atualizar', () => console.log('---'))
        .usePagination()
        .setPaginationDefaultRows(50)
        .setCustomInitialSorting({ field: 'number', order: -1 })
        .useStrippedStyle()
        .allowDefaultRowExpansion()
        .expandOnRowClick()
        .setSize('small')
        .menu()
          .item('Consultar')
            .setCallback((event: any) => console.log('---'))
            .menu
          .table
      .build()
  }
  },
  //
  [DemoKeys.TABLE_DYNAMIC_MENU]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder('entity')
        .setTitle('Demo Dynamic Menu')
        .enableClearFilters()
        .enableColumnVisibility()
        .enableGlobalFilter()
        .setEmptyFeedbackMessage('Lista vazia')
        .setEmptyFeedbackExtraInfo('Clique abaixo para carregar novos dados.')
        .addEmptyFeedbackButton('Atualizar', () => console.log('---'))
        .usePagination()
        .setPaginationDefaultRows(50)
        .setCustomInitialSorting({ field: 'number', order: -1 })
        .useStrippedStyle()
        .allowDefaultRowExpansion()
        .dynamicMenu((row: any) => {
          return [
            { label: 'Test 1', icon: 'fa-solid fa-biohazard', command: (event) => console.log('test1', event) },
            { label: 'Test 2', icon: 'fa-solid fa-candy-cane', command: (event) => console.log('test2', event) },
          ];
        })
      .build()
  }
  },
  //
  [DemoKeys.TABLE_MENU_OVERLAY]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder('entity')
        .setTitle('Demo Overlay Menu')
        .menu()
          .item('Consulta A')
            .setCallback((event: any) => console.log('---', event))
            .setIcon('fa-solid fa-star')
            .menu
          .item('Consulta B')
            .setCallback((event: any) => console.log('---', event))
            .setIcon('fa-solid fa-home')
            .menu
          .table
      .build()
  }
  },
  //
  [DemoKeys.TABLE_MENU_INLINE]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder<any>('entity')
        .setTitle('Demo Inline Menu')
        .menu()
          .useInline('300px')
          .item()
            .setCallback((event: any) => console.log('---', event))
            .setActivationRule((data) => data.name !== 'Coyote')
            .setIcon('fa-solid fa-face-dizzy')
            .setStyles('p-button-help')
            .menu
          .item()
            .setCallback((event: any) => console.log('---', event))
            .setVisibilityRule((data) => data.name !== 'Coyote')
            .setIcon('fa-solid fa-star')
            .setStyles('p-button-info')
            .menu
          .item()
            .askForCriticalConfirmation('Atenção', 'Tem certeza de que deseja fazer isso ?')
            .setCallback((event: any) => console.log('---', event))
            .setIcon('fa-solid fa-face-angry')
            .setStyles('p-button-danger')
            .menu
          .item()
            .askForCriticalConfirmation('Atenção', 'Tem certeza de que deseja fazer isso ?')
            .setCallback((event: any) => console.log('---', event))
            .setIcon('fa-solid fa-face-angry')
            .setStyles('p-button-danger')
            .menu
          .item()
            .askForCriticalConfirmation('Atenção', 'Tem certeza de que deseja fazer isso ?')
            .setCallback((event: any) => console.log('---', event))
            .setIcon('fa-solid fa-face-angry')
            .setStyles('p-button-danger')
            .menu
          .table
        .columns()
          .dataTransform('company1', 'Teste 1', (country: SimpleNamedEntity, row: any) => (row.company))
            .disableFilter()
            .columns
          .dataTransform('company2', 'Teste 2', (country: SimpleNamedEntity, row: any) => (row.company))
            .disableFilter()
            .columns
          .dataTransform('company3', 'Teste 3', (country: SimpleNamedEntity, row: any) => (row.company))
            .disableFilter()
            .columns
          .dataTransform('company4', 'Teste 4', (country: SimpleNamedEntity, row: any) => (`${row.company} > ${row.company} > ${row.company}`))
            .disableFilter()
            .columns
          .dataTransform('company5', 'Teste 5', (country: SimpleNamedEntity, row: any) => (row.company))
            .disableFilter()
            .columns
          .table
      .build()
  }
  },
  //
  [DemoKeys.TABLE_AUTO_SIZED_COLUMNS]: {
    items$: of(LARGE_TABLE_DATA),
    code: () => {
    return new SmzTableBuilder()
        .setTitle('Auto Sized Columns with Large Data')
        .enableGlobalFilter()
        .enableClearFilters()
        .setEmptyFeedbackMessage('Nenhuma inconsistência encontrada')
        .setEmptyFeedbackImage('assets/images/server-checkmark.svg')
        .enableColumnVisibility(true)
        .usePagination()
        .setPaginationPageOptions([10, 15, 25, 100, 200])
        .setPaginationDefaultRows(10)
        .useEstimatedColWidth(400)
        .useGridStyle()
        .setSize('small')
        .useStrippedStyle()
        .disableRowHoverEffect()
        .excel()
          .excel
        .menu()
          .item('Consultar')
            .setCallback((event: any) => console.log('---'))
            .menu
          .table
        .columns()
          .text('tag', 'tag', 'auto').columns
          .text('plant', 'plant', 'auto').columns
          .text('area', 'area', 'auto').hide().columns
          .text('unit', 'unit', 'auto').columns
          .text('status.name', 'status', 'auto').columns
          .text('service', 'service', 'auto').columns
          .text('description', 'description', 'auto').columns
          .text('location', 'location', 'auto').columns
          .text('type', 'type', 'auto').columns
          .text('panel', 'panel', 'auto').columns
          .text('rack', 'rack', 'auto').columns
          .text('slot', 'slot', 'auto').columns
          .text('card', 'card', 'auto').columns
          .text('channel', 'channel', 'auto').columns
          .table
        .resizeIgnoringCheck(
            { property: 'plant', width: '12em'},
          )
      .build()
  }
  },
  //
  [DemoKeys.TABLE_MULTI_SELECTION]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder()
      .setTitle('MOEDAS')
      .setEmptyFeedbackMessage('Nenhum histórico encontrado')
      .setEmptyFeedbackImage('')
      .enableGlobalFilter()
      .useStrippedStyle()
      .allowDefaultMultiSelection()
      .setMultiSelectionCallback((selection: any[]) => {console.log('setMultiSelectionCallback', selection) })
      .menu()
        .item('Editar', 'pi pi-fw pi-pencil')
          .setCallback((item: any): void => console.log(item))
          .menu
        .table
      .columns()
        .text('company', 'Código', '16em')
          .disableFilter()
          .columns
        .text('name', 'Nome')
          .disableFilter()
          .columns
        .table
      .build()
  }
  },
  //
  [DemoKeys.TABLE_EXPORT_PDF]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder()
      .setTitle('Export to PDF Demo')
      .enableGlobalFilter()
      .useTableEmptyMessage()
      .usePagination()
      .setPaginationDefaultRows(10)
      .setCustomInitialSorting({ field: 'number', order: -1 })
      .useStrippedStyle()
      .enableExportToPdf()
      .columns()
        .text('name', 'Name', '40em')
          .disableFilter()
          .columns
        .text('country.name', 'Country')
          .setFilter(SmzFilterType.MULTI_SELECT)
          .disableSort()
          .columns
        .dataTransform('country.id', 'Super Country 2', (country: SimpleNamedEntity, row: any) => (`test: ${row.country?.name?.toUpperCase()}`))
          .columns
        .dataTransform('country', 'Super Country', (country: SimpleNamedEntity, row: any) => (`super: ${country?.name?.toUpperCase()}`))
          .setFilter(SmzFilterType.MULTI_SELECT)
          .columns
        .dataTransform('roles', 'Perfis', (roles: SimpleNamedEntity[], row: any) => { return roles.map(x => x.name).join(', '); })
          .setFilter(SmzFilterType.MULTI_SELECT_ARRAY)
          .ignoreOnExport()
          .columns
        .table
      .build()
    }
  },
  //
  [DemoKeys.TABLE_EXPORT_EXCEL]: {
    items$: store.select(DemoFeatureSelectors.excelDemo),
    code: () => {
    return new SmzTableBuilder()
      .debugMode()
      .setTitle('Export to Excel Demo')
      .enableGlobalFilter()
      .enableColumnVisibility()
      .useTableEmptyMessage()
      .usePagination()
      .setPaginationDefaultRows(2)
      .setCustomInitialSorting({ field: 'number', order: -1 })
      .useStrippedStyle()
      .excel()
        .excel
      .columns()
        .dataTransform('isActive', 'Atividade', (data, row) => data ? 'Sim' : 'Não')
          .exportAs(SmzExportableContentType.BOOLEAN)
          .ignoreTransformOnExport()
          .columns
        .icon('isAutoTask', 'Disponibilidade')
          .addIconConfiguration('fas fa-lock', false, 'red-text', 'Tarefa com gerenciamento automático (edição parcialmente bloqueada)')
          .addIconConfiguration('fas fa-lock-open', true, 'green-text', 'Tarefa criada manualmente (edição permitida)')
          .exportAs(SmzExportableContentType.TEXT)
          .setExportTransform(x => x ? 'Ok' : 'No')
          .columns
        .text('name', 'Name', '20em')
          .columns
        .custom('status.name', 'Status', '10em')
          .setFilter(SmzFilterType.TEXT)
          .exportAs(SmzExportableContentType.TEXT)
          .setExportTransform(x => x.name)
          .columns
        .text('country.name', 'Country')
          .setFilter(SmzFilterType.MULTI_SELECT)
          .columns
        .currency('price', 'Preço')
          .columns
        .dataTransform('roles', 'Permissões', (roles: SimpleNamedEntity[], row: any) => { return roles.map(x => x.name).join(', '); })
          .setFilter(SmzFilterType.MULTI_SELECT_ARRAY)
          .exportAs(SmzExportableContentType.TEXT)
          .setExportTransform(x => x.length > 0 ? `Contém ${x.length} permissões` : `Nenhuma permissão`)
          .columns
        .text('html', 'Link')
          .exportAs(SmzExportableContentType.HYPERLINK)
          .columns
        .text('htmls', 'Links')
          .exportAs(SmzExportableContentType.AUTODETECT)
          .columns
        .table
      .build()
    }
  },
  //
  [DemoKeys.TABLE_EDITABLE]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder()
      // .debugMode()
      .setTitle('Editable Table')
      .enableGlobalFilter()
      .useTableEmptyMessage()
      .usePagination()
      .setPaginationDefaultRows(10)
      .setCustomInitialSorting({ field: 'number', order: -1 })
      .useStrippedStyle()
      .editable()
        .setUpdateAction(DemoFeatureActions.Update)
        .setCreationAction(DemoFeatureActions.Create)
        .setRemoveAction(DemoFeatureActions.Remove)
        .useFlattenResults()
        .addMappingResults((data: any) => {
          console.log('customizing', data);
          return data;
        })
        .table
      .columns()
        .text('name', 'Name', '16em')
          .disableFilter()
          .editable()
            .text()
            .column
          .columns
        .text('company', 'Company', '30em')
          .disableFilter()
          .editable()
            .text()
            .column
          .columns
        .text('price', 'Price', '15em')
          .disableFilter()
          .editable()
            .number()
              .setDecimal(2)
            .column
          .columns
        .text('country.name', 'Country')
          .setFilter(SmzFilterType.MULTI_SELECT)
          .disableSort()
          .editable()
            .dropdown('country')
            .setSelector(DemoFeatureSelectors.countries)
            .column
          .columns
        .table
      .build()
    }
  },
  //
  [DemoKeys.TABLE_EDITABLE_PARTIAL]: {
    items$: of(EditableTablePartialData),
    code: () => {
    return new SmzTableBuilder()
      // .debugMode()
      .setTitle('Amostragens')
      .enableGlobalFilter()
      .useTableEmptyMessage()
      .setEmptyFeedbackMessage('<b>Nenhuma amostragem localizada.</b><br><div class="text-sm mt-2">Refine sua busca para filtrar as amostragens.</div>')
      .usePagination()
      .setPaginationDefaultRows(10)
      .setPaginatorTemplate('')
      .setCustomInitialSorting({ field: 'number', order: -1 })
      .useStrippedStyle()
      .disableRowHoverEffect()
      .enableColumnVisibility()
      .viewport()
        .usePersistenceByUser('TABLE_EDITABLE_PARTIAL')
        .saveTriggerOnChange()
        .table
      .editable()
        .setUpdateAction(DemoFeatureActions.Update)
        .setUpdateActionCondition((item: any) => item.isNotApplicable == false)
        .useFlattenResults()
        .addMappingResults((data: any) => {
          console.log('customizing', data);
          return data;
        })
        .table
      .menu()
        .item('Consultar')
          .setCallback((event: any) => console.log('---', event))
          .setIcon('fa-solid fa-star')
          .menu
        .table
      .columns()
        .text('module', 'Módulo', '10em')
          .columns
        .text('section', 'Seção', '10em')
          .columns
        .text('system', 'Sistema', 'auto')
          .actions()
            .placeAtBeginning()
            .if(true)
              .add('fa-regular fa-copy', (item: any) => { console.log('copy', item); })
                .setStyleClass('text-red-500')
                .action
              .endIf
            .add('fa-solid fa-print', (item: any) => { console.log('print', item); })
              .setStyleClass('text-sky-500')
              .action
            .column
          .columns
        .text('function.name', 'Função', '16em')
          .setFilter(SmzFilterType.MULTI_SELECT)
          .columns
        .dataTransform('value', 'Corrosão', (value, item) => item.isNotApplicable ? 'N/A' : `<strong>${value.toFixed(2)} %</strong>`, '10em')
          .setFilter(SmzFilterType.MULTI_SELECT_STRING)
          .editable()
            .text()
            .column
          .columns
        .dataTransform('level.name', 'Característica', (value, item) => item.isNotApplicable ? 'N/A' : `<strong>${value}</strong>`, '16m')
          .setFilter(SmzFilterType.MULTI_SELECT)
          .editable()
            .dropdown('level')
            .setOptions(EditableTablePartialLevels)
            .column
          .columns
        .dataTransform('levelId', 'Level Id', (value: string, item) => value ? `<strong>${Levels[value]}</strong>` : '', '10em')
          .setFilter(SmzFilterType.MULTI_SELECT_STRING)
          .setFilterableData((value: string, item) => value ? `${Levels[value]}` : '')
          .columns
        .table
      .build()
    }
  },
  //
  [DemoKeys.TABLE_LAYOUT_SIZE_EXTRA_SMALL]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder('entity')
        .setTitle('Table size: extra small')
        .enableClearFilters()
        .enableColumnVisibility()
        .enableGlobalFilter()
        .useGridStyle()
        .setSize('extra-small')
        .setCustomInitialSorting({ field: 'number', order: -1 })
        .useStrippedStyle()
        .menu()
          .item('Consultar')
            .setCallback((event: any) => console.log('---'))
            .menu
          .table
      .build()
    }
  },
  //
  [DemoKeys.TABLE_LAYOUT_SIZE_SMALL]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder('entity')
        .setTitle('Table size: small')
        .enableClearFilters()
        .enableColumnVisibility()
        .enableGlobalFilter()
        .useGridStyle()
        .setSize('small')
        .setCustomInitialSorting({ field: 'number', order: -1 })
        .useStrippedStyle()
        .menu()
          .item('Consultar')
            .setCallback((event: any) => console.log('---'))
            .menu
          .table
      .build()
    }
  },
  //
  [DemoKeys.TABLE_LAYOUT_SIZE_REGULAR]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder('entity')
        .setTitle('Table size: regular')
        .enableClearFilters()
        .enableColumnVisibility()
        .enableGlobalFilter()
        .useGridStyle()
        .setSize('regular')
        .setCustomInitialSorting({ field: 'number', order: -1 })
        .useStrippedStyle()
        .menu()
          .item('Consultar')
            .setCallback((event: any) => console.log('---'))
            .menu
          .table
      .build()
    }
  },
  //
  [DemoKeys.TABLE_LAYOUT_SIZE_LARGE]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder('entity')
        .setTitle('Table size: large')
        .enableClearFilters()
        .enableColumnVisibility()
        .enableGlobalFilter()
        .useGridStyle()
        .setSize('large')
        .setCustomInitialSorting({ field: 'number', order: -1 })
        .useStrippedStyle()
        .menu()
          .item('Consultar')
            .setCallback((event: any) => console.log('---', event))
            .menu
          .table
      .build()
    }
  },
  //
  [DemoKeys.TABLE_VIEWPORT_PERSISTENCE]: {
    items$: of([
      { name: 'name 1', company: 'company D' },
      { name: 'name 2', company: 'company A' },
      { name: 'name 2', company: 'company B' },
      { name: 'name 2', company: 'company C' },
      { name: 'name 3', company: 'company E' }
    ]),
    // items$: of([]),
    code: () => {
    return new SmzTableBuilder()
      .setTitle('Filter Persistence')
      .enableClearFilters()
      .enableColumnVisibility()
      .enableGlobalFilter()
      .useTableEmptyMessage()
      .useGridStyle()
      .setSize('large')
      .setCustomInitialSorting({ field: 'number', order: -1 })
      .useStrippedStyle()
      .columns()
        .text('name', 'Name', '40em')
          .addTooltip((item) => `item ${item.name}`)
          .columns
        .text('company', 'Company')
          .setFilter(SmzFilterType.MULTI_SELECT_STRING)
          .columns
        .dataTransform('company', 'Company', (data: string) => `${data} (OK)`)
          .setFilter(SmzFilterType.MULTI_SELECT_STRING)
          .setFilterableData((data: string) => `${data} (XX)`)
          .columns
        .table
      .viewport()
        .usePersistenceByUser('TABLE_VIEWPORT_PERSISTENCE')
        .saveTriggerOnChange()
        .table
    .build();
    }
  },
  //
  [DemoKeys.TABLE_PLAYGROUND]: {
    items$: of([
      { name: 'name 1', modelFile: { size: '10', date: new Date(), projectDate: new Date() } },
      { name: 'name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_name_', modelFile: { size: '11', date: new Date(), projectDate: new Date() } },
      { name: 'name 2', modelFile: { size: '12', date: new Date(), projectDate: new Date() } },
      { name: 'name 2', modelFile: { size: '13', date: new Date(), projectDate: new Date() } },
      { name: 'name 3', modelFile: { size: '14', date: new Date(), projectDate: new Date() } }
    ]),
    code: () => {
    return new SmzTableBuilder()
      .setTitle('Playground')
      .enableClearFilters()
      .enableColumnVisibility()
      .enableGlobalFilter()
      .useTableEmptyMessage()
      .useGridStyle()
      .setSize('large')
      .setCustomInitialSorting({ field: 'number', order: -1 })
      .useStrippedStyle()
      .columns()
        .text('name', 'Name', '10em')
          .addStyles('break-all')
          .columns
        .dataTransform(namesof<any, any>('modelFile', 'size'), 'Tamanho', (data: string) => data == null ? '-' : data)
          .columns
        .date(namesof<any, any>('modelFile', 'date'), 'Data')
          .setFilter(SmzFilterType.DATE_TIME)
          .columns
        // .dataTransform(namesof<any, any>('modelFile', 'date'), 'Data', (data: Date) => data == null ? '-' : moment(data).format('L HH:mm'))
        //   .setFilter(SmzFilterType.DATE_TIME)
        //   .columns
        .dataTransform(namesof<any, any>('modelFile', 'projectDate'), 'Data de Projeto', (data: Date) => data == null ? '-' : moment(data).format('L'))
          .columns
        .table
    .build();
    }
  },
}