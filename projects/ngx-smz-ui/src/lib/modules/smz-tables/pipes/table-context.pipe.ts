import { Pipe, PipeTransform } from '@angular/core';
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

    if (inputState == null) return null;

    const globalFilter: string[] = [];
    const columns: SmzTableContextColumn[] = [];

    for (const column of inputState.columns.filter(c => c.isVisible || c.filter?.isGlobalFilterable)) {

      const contextColumn: SmzTableContextColumn = {
        ...column,
        width: column.width ?? 'auto',
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

      if (column.isVisible) {
        columns.push(contextColumn);
      }

    }

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
          showButton: false,
        },
        globalFilter: {
          isVisible: true,
        },
        rowSelection: {
          isButtonVisible: true,
          columnWidth: '3em',
          callback: null,
          isEnabled: false,
          label: 'Seleção'
        },
      },
      columns: [],
      emptyFeedback: inputState.emptyFeedback == null ? {
        message: 'Lista Vazia',
        extraInfo: null,
        actionButton: null,
        image: 'assets/images/tables/empty.svg',
      } : {
        message: inputState.emptyFeedback.message ?? 'Lista Vazia',
        extraInfo: inputState.emptyFeedback.message,
        actionButton: inputState.emptyFeedback.actionButton,
        image: inputState.emptyFeedback.image == null ? 'assets/images/tables/empty.svg' : inputState.emptyFeedback.image === '' ? null : inputState.emptyFeedback.image,
      },
      pagination: {
        isVisible: true,
        rows: 10,
        rowsPerPageOptions: [5, 10, 50, 100, 500],
        pageReport: {
          isVisible: true,
          template: 'Mostrando {first} a {last} de {totalRecords} itens'
        }
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
      }
    };

    return {
      globalFilter,
      columns,
      state: mergeDeep(state, inputState)
    };
  }
}