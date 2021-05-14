import { Pipe, PipeTransform } from '@angular/core';
import { mergeDeep } from '../../../common/utils/deep-merge';
import { SmzContentType } from '../models/content-types';
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

    for (const column of inputState.columns.filter(c => c.isVisible)) {

      const contextColumn: SmzTableContextColumn = {
        ...column,
        width: column.width ?? 'auto',
        contentType: column.contentType ?? SmzContentType.TEXT,
        contentData: column.contentData ?? { useTemplate: false }
      };

      switch (column.contentType) {
        case SmzContentType.CALENDAR:
          if (column.contentData == null || !Reflect.has(column.contentData, 'format')) {
            Reflect.set(contextColumn.contentData, 'format', 'short');
          }

          break;
        case SmzContentType.CURRENCY:

          break;

        case SmzContentType.ICON:

          break;
        default:
          break;
      }

      if (column.isGlobalFilterable) {
        globalFilter.push(column.field);
      }

      columns.push(contextColumn);

    }

    const state: SmzTableState = {
      actions: {
        customActions: {
          isVisible: false,
          columnWidth: '63px',
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
      emptyFeedback: inputState.emptyFeedback ?? {
        message: 'Lista Vazia',
        extraInfo: null,
        actionButton: null,
        image: 'assets/images/tables/empty.svg',
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
      }
    };

    return {
      globalFilter,
      columns,
      state: mergeDeep(state, inputState)
    };
  }
}