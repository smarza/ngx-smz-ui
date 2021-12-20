import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { GlobalInjector, SimpleNamedEntity, SmzFilterType, SmzTableBuilder } from 'ngx-smz-ui';
import { of } from 'rxjs';
import { convertorTasks } from './../data/conversor-tasks';
import { Observable } from 'rxjs/internal/Observable';

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
      .useAutoWidth()
      .menu()
        .item('Consultar')
          .setCallback((event: any) => console.log('---'))
          .menu
        .table
      .columns()
        .text('name', 'Name', '40em')
          .disableFilter()
          .columns
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
      .build()
    }
  },
  //
  [DemoKeys.TABLE_ARRAY_FILTER]: {
    items$: of(convertorTasks),
    code: () => {
    return new SmzTableBuilder()
      .setTitle('Tarefas')
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
}

