import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { GlobalInjector, SimpleNamedEntity, SmzFilterType, SmzTableBuilder } from 'ngx-smz-ui';
import { of } from 'rxjs';
import { convertorTasks } from './../data/conversor-tasks';
import { Observable } from 'rxjs/internal/Observable';
import { DemoFeatureActions } from '@states/demo/demo.actions';
import { LARGE_TABLE_DATA } from '../data/large-table';
import { EditableTablePartialData, EditableTablePartialLevels } from '../data/tables/editable-table-partial-data';

const store = GlobalInjector.instance.get(Store);

export const TablesDemo: { [key: string]: { items$: Observable<any[]>, code: () => void } } = {
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
          .table
      .build()
  }
  },

  [DemoKeys.TABLE_MULTI_LANGUAGES]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder('entity')
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
          .item('Consultar')
            .setCallback((event: any) => console.log('---'))
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
      .setTitle('Demo With Fluent')
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
          .disableFilter()
          .columns
        .text('country.name', 'Country')
          .setFilter(SmzFilterType.MULTI_SELECT)
          .disableSort()
          .columns
        .dataTransform('country.name', 'Super Country 2', (country: SimpleNamedEntity, row: any) => `test: ${row.country?.name?.toUpperCase()}`)
          .columns
        .dataTransform('country', 'Super Country', (country: SimpleNamedEntity, row: any) => `super: ${country?.name?.toUpperCase()}`)
          .setFilter(SmzFilterType.MULTI_SELECT)
          .columns
        .dataTransform('roles', 'Perfis', (roles: SimpleNamedEntity[], row: any) => { return roles.map(x => x.name).join(', '); })
          .setFilter(SmzFilterType.MULTI_SELECT_ARRAY)
          .columns
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
    items$: of(convertorTasks),
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
          .columns
        .text('plantDesign.name', 'Plant Design', '7em')
          .setFilter(SmzFilterType.MULTI_SELECT)
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
          .ignoreOnGlobalFilter()
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
        .setRowClickCallback((event) => { store.dispatch(new DemoFeatureActions.Create({name: 'test', company: 'test2', countryId: '3fb9838e-2f62-42a3-9ebc-09f236bc3c12'}));})
        .setEmptyFeedbackMessage('Lista vazia')
        .setEmptyFeedbackExtraInfo('Clique abaixo para carregar novos dados.')
        .addEmptyFeedbackButton('Atualizar', () => console.log('---'))
        .usePagination()
        .setPaginationDefaultRows(50)
        .setCustomInitialSorting({ field: 'number', order: -1 })
        .useStrippedStyle()
        .allowDefaultRowExpansion()
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
  [DemoKeys.TABLE_AUTO_SIZED_COLUMNS]: {
    items$: of(LARGE_TABLE_DATA),
    code: () => {
    return new SmzTableBuilder()
        .setTitle('Auto Sized Columns with Large Data')
        .enableGlobalFilter()
        .setLocale('en-US')
        .enableClearFilters()
        .usePagination()
        .setEmptyFeedbackMessage('Sem Resultados')
        .setEmptyFeedbackImage('assets/images/tables/empty-dark.svg')
        .enableColumnVisibility(false)
        .setPaginationDefaultRows(25)
        .setPaginationPageOptions([10, 25, 50, 100, 200])
        .useEstimatedColWidth()
        .useGridStyle()
        .useStrippedStyle()
        .disableRowHoverEffect()
        .menu()
          .item('Consultar')
            .setCallback((event: any) => console.log('---'))
            .menu
          .table
        .columns()
          .text('tag', 'tag', 'auto').columns
          .text('plant', 'plant', 'auto').columns
          .text('area', 'area', 'auto').columns
          .text('unit', 'unit', 'auto').columns
          .text('status', 'status', 'auto').columns
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
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder()
      .setTitle('Export to Excel Demo')
      .enableGlobalFilter()
      .useTableEmptyMessage()
      .usePagination()
      .setPaginationDefaultRows(10)
      .setCustomInitialSorting({ field: 'number', order: -1 })
      .useStrippedStyle()
      .enableExportToExcel()
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
  [DemoKeys.TABLE_EDITABLE]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTableBuilder()
      .debugMode()
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
      .setTitle('Amostragens')
      .enableGlobalFilter()
      .useTableEmptyMessage()
      .setEmptyFeedbackMessage('<b>Nenhuma amostragem localizada.</b><br><div class="text-sm mt-2">Refine sua busca para filtrar as amostragens.</div>')
      .usePagination()
      .setPaginationDefaultRows(10)
      .setCustomInitialSorting({ field: 'number', order: -1 })
      .useStrippedStyle()
      .disableRowHoverEffect()
      .editable()
        .setUpdateAction(DemoFeatureActions.Update)
        .useFlattenResults()
        .addMappingResults((data: any) => {
          console.log('customizing', data);
          return data;
        })
        .table
      .columns()
        .text('module', 'Módulo', '12em')
          .columns
        .text('section', 'Seção', '12em')
          .columns
        .text('system', 'Sistema', '16em')
          .columns
        .text('function.name', 'Função', '16em')
          .setFilter(SmzFilterType.MULTI_SELECT)
          .columns
        .dataTransform('value', 'Corrosão', (value) => `<strong>${value.toFixed(2)} %</strong>`, '12em')
          .disableFilter()
          .editable()
            .text()
            .column
          .columns
        .dataTransform('level.name', 'Característica', (value) => `<strong>${value}</strong>`, '16m')
          .setFilter(SmzFilterType.MULTI_SELECT)
          .editable()
            .dropdown('level')
            .setOptions(EditableTablePartialLevels)
            .column
          .columns
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
            .setCallback((event: any) => console.log('---'))
            .menu
          .table
      .build()
    }
  },
}