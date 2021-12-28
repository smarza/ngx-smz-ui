import { Pipe, PipeTransform } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { mergeDeep } from '../../../common/utils/deep-merge';
import { SmzContentType } from '../models/content-types';
import { SmzFilterType } from '../models/filter-types';
import { SmzTableContextColumn } from '../models/table-column';
import { SmzTableState, SmzTableContext } from '../models/table-state';

@Pipe({
  name: 'tableContext'
})

export class SmzTableContextPipe implements PipeTransform {
  transform(inputState: SmzTableState): SmzTableContext {
    // console.log('pipe', inputState);
    if (inputState == null) return null;

    const globalFilter: string[] = [];
    const columns: SmzTableContextColumn[] = [];

    let baseWidthIncrement = 0;

    for (const column of inputState.columns) {

      baseWidthIncrement = inputState.caption.columnVisibility?.showColumnHideButton ? 30 : 0;
      baseWidthIncrement += column.filter.type !== SmzFilterType.NONE ? 30 : 0;
      const width = column.width == null ? 'auto' : (column.width !== 'fit' ? column.width : `${(column.header.length * 15) + baseWidthIncrement}px`);

      // console.log(column.field, column.width, width);

      const contextColumn: SmzTableContextColumn = {
        ...column,
        width,
        content: column.content ?? { type: SmzContentType.TEXT, data: { } },
        filter: column.filter ?? { type: SmzFilterType.NONE, isGlobalFilterable: false }
      };

      if (column.content != null) {
        switch (column.content.type) {
          case SmzContentType.CALENDAR:
            if (column.content.data == null || !Reflect.has(column.content.data, 'format')) {
              Reflect.set(contextColumn.content.data, 'format', 'short');
            }

            break;
          case SmzContentType.CURRENCY:

            break;

          case SmzContentType.ICON:

            break;
          default:
            break;
        }
      }

      if (column.filter.isGlobalFilterable) {
        globalFilter.push(column.field);
      }

      columns.push(contextColumn);

    }

    const visibleColumns = columns.filter(x => x.isVisible === true && !x?.isFrozen) ?? [];
    const frozenColumns = columns.filter(x => x.isVisible === true && x?.isFrozen === true) ?? [];
    const hideableColumns = columns.map(x => ({ ...x, disabled: x?.isFrozen })) ?? [];

    const state: SmzTableState = {
      actions: {
        customActions: {
          isVisible: false,
          columnWidth: 63,
        },
        menu: {
          isVisible: false,
          items: []
        },
        batchActions: {
          isVisible: false,
          items: []
        },
        rowBehavior: {
          isClickable: false,
          clickCallback: null,
          hoverable: false,
        }
      },
      caption: {
        isVisible: false,
        title: '',
        toolbarAlignment: 'start',
        clearFilters: {
          isButtonVisible: true,
          callback: null,
          label: 'Limpar Filtro',
        },
        columnVisibility: {
          showDropdownSelector: false,
          showColumnHideButton: false
        },
        globalFilter: {
          isVisible: true,
          expanded: false,
          placeholder: 'Pesquisa Global'
        },
        rowSelection: {
          isButtonVisible: true,
          columnWidth: '3em',
          callback: null,
          isEnabled: false,
          label: 'Seleção'
        },
      },
      header: {
        isVisible: true
      },
      columns: [],
      emptyFeedback: inputState.emptyFeedback == null ? {
        message: 'Lista Vazia',
        extraInfo: null,
        actionButtons: [],
        image: 'assets/images/tables/empty.svg',
        isFeatured: true
      } : {
        message: inputState.emptyFeedback.message ?? 'Lista Vazia',
        extraInfo: inputState.emptyFeedback.message,
        actionButtons: inputState.emptyFeedback.actionButtons,
        image: inputState.emptyFeedback.image == null ? 'assets/images/tables/empty.svg' : inputState.emptyFeedback.image === '' ? null : inputState.emptyFeedback.image,
      },
      pagination: {
        isVisible: true,
        rows: 10,
        rowsPerPageOptions: [5, 10, 50, 100, 500],
        pageReport: {
          isVisible: true,
          template: 'Mostrando {first} a {last} de {totalRecords} itens'
        },
        state: { first: 0, rows: 10 }
      },
      sort: {
        field: null,
        mode: 'single',
        order: 1,
        multiSortMeta: null
      },
      initialState: {
        skeleton: {
          isEnabled: true,
          rows: 10
        }
      },
      styles: inputState.styles ?? {
        striped: false
      },
      frozen: {
        isEnabled: false,
      },
      rowExpansion: {
        isButtonVisible: true,
        columnWidth: '3em',
        callback: null,
        isEnabled: false,
        label: 'Seleção'
      },
    };

    const context: SmzTableContext = {
      globalFilter,
      columns,
      hideableColumns: cloneDeep(hideableColumns),
      visibleColumns: cloneDeep(visibleColumns),
      frozenColumns: frozenColumns?.length === 0 ? null : cloneDeep(frozenColumns),
      state: mergeDeep(state, inputState)
    };

    context.state.frozen.isEnabled = frozenColumns?.length > 0;

    // console.log('pipe context', context);

    return context;
  }
}