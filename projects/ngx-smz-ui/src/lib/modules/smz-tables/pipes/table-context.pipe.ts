import { Pipe, PipeTransform } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { mergeDeep } from '../../../common/utils/deep-merge';
import { SmzContentType, SmzExportableContentSource } from '../models/content-types';
import { SmzFilterType } from '../models/filter-types';
import { SmzTableContextColumn } from '../models/table-column';
import { SmzTableState, SmzTableContext } from '../models/table-state';

@Pipe({
  name: 'tableContext'
})

export class SmzTableContextPipe implements PipeTransform {
  transform(inputState: SmzTableState): SmzTableContext {
    // console.log('-------------------------- SmzTableContextPipe', inputState);
    if (inputState == null) return null;

    const globalFilter: string[] = [];
    const columns: SmzTableContextColumn[] = [];

    let baseWidthIncrement = 0;

    for (const column of inputState.columns) {

      baseWidthIncrement = inputState.caption.columnVisibility?.showColumnHideButton ? 30 : 0;
      baseWidthIncrement += column.filter.type !== SmzFilterType.NONE ? 30 : 0;

      const width = column.width == null ? 'auto' : (column.width !== 'fit' ? column.width : `${(column.header.length * 15) + baseWidthIncrement}px`);

      // console.log(`${column.field} >> type: ${column.width}; baseWidthIncrement: ${baseWidthIncrement}; width: ${width};`);

      const contextColumn: SmzTableContextColumn = {
        ...column,
        width,
        content: column.content ?? { type: SmzContentType.TEXT, styleClass: '', data: { }, ngStyle: {} },
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
      isValid: true,
      isDebug: false,
      actions: {
        customActions: {
          isVisible: false,
          columnWidth: 63,
          ngStyle: null
        },
        menu: {
          isVisible: false,
          items: [],
          styles: {
            icon: 'fa-solid fa-bars',
            buttonClass: '',
            styleClass: ''
          }
        },
        batchActions: {
          isVisible: false,
          items: [],
          ngStyle: null
        },
        rowBehavior: {
          isClickable: false,
          clickCallback: null,
          hoverable: false,
        }
      },
      locale: {
        language: 'pt-BR',
        columnVisibility: {
          placeholder: 'Colunas',
          selectedItemsLabel: '{0} colunas visíveis',
          pTooltip: 'Escolha as colunas que deseja visualizar na tabela.'
        },
        globalFilter: {
          placeholder: 'Pesquisa Global'
        },
        dropdownFilter: {
          placeholder: 'Todos'
        },
        clearFilters: {
          label: 'Limpar Filtros'
        },
        rowSelection: {
          label: 'Seleção'
        },
        paginator: {
          template: 'Mostrando {first} a {last} de {totalRecords} itens'
        }
      },
      caption: {
        isVisible: false,
        title: '',
        toolbarAlignment: 'start',
        clearFilters: {
          isButtonVisible: true,
          callback: null
        },
        columnVisibility: {
          showDropdownSelector: false,
          showColumnHideButton: false,
        },
        globalFilter: {
          isVisible: true,
          expanded: false,
        },
        rowSelection: {
          isButtonVisible: true,
          columnWidth: '3em',
          callback: null,
          isEnabled: false,
          validationMode: 'none',
          ngStyle: null
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
        striped: false,
        tableStyleClass: ''
      },
      frozen: {
        isEnabled: false,
      },
      rowExpansion: {
        isButtonVisible: true,
        columnWidth: 75,
        callback: null,
        isEnabled: false,
        label: 'Seleção',
        sincronize: false,
        highlightNewItems: false,
        highlightLabel: 'NOVO',
        ngStyle: null
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

    if (context.state.isDebug) {
      console.log('Table context', context);
    }

    return context;
  }
}