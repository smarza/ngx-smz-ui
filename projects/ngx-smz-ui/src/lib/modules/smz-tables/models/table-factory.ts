import { SmzMenuItem } from './conditional-menu-item';
import { SmzContentType, SmzIconContent } from './content-types';
import { SmzFilterType } from './filter-types';
import { SmzTableColumn } from './table-column';
import { SmzTableState } from './table-state';

export class SmzTableFactory {
  private _currentColumn: SmzTableColumn = null;
  private _state: SmzTableState = {
    columns: [],
    actions: {
      customActions: {
        columnWidth: '63px',
        isVisible: false,
      },
      menu: {
        isVisible: false,
        items: []
      },
      rowBehavior: {
        clickCallback: null,
        hoverable: true,
        isClickable: false,
      }
    },
    caption: {
      rowSelection: {
        isButtonVisible: false,
        isEnabled: false,
        callback: null,
        columnWidth: '3em',
        label: ''
      },
      clearFilters: {
        callback: null,
        isButtonVisible: false,
        label: '',
      },
      columnVisibility: {
        showButton: false,
      },
      globalFilter: {
        isVisible: true,
      },
      isVisible: false,
      title: null,
      toolbarAlignment: 'start'
    },
    emptyFeedback: {
      actionButton: null,
      extraInfo: null,
      image: 'assets/images/tables/empty.svg',
      message: 'Lista vazia'
    },
    initialState: {
      skeleton: {
        isEnabled: true,
        rows: 10,
      },
    },
    pagination: {
      isVisible: false,
      pageReport: {
        isVisible: false,
        template: ''
      },
      rows: 10,
      rowsPerPageOptions: [5, 10, 25, 50]
    },
    sort: {
      field: null,
      mode: 'single',
      multiSortMeta: null,
      order: 1
    },
    styles: {
      striped: false,
    }
  };

  public setTitle(title: string): SmzTableFactory {
    this._state.caption.isVisible = true;
    this._state.caption.title = title;
    return this;
  }

  public enableGlobalFilter(): SmzTableFactory {
    this._state.caption.isVisible = true;
    this._state.caption.globalFilter.isVisible = true;
    return this;
  }

  public enableColumnVisibility(): SmzTableFactory {
    this._state.caption.isVisible = true;
    this._state.caption.columnVisibility.showButton = true;
    return this;
  }

  public enableClearFilters(label: string = 'Limpar Filtros'): SmzTableFactory {
    this._state.caption.isVisible = true;
    this._state.caption.clearFilters.label = label;
    this._state.caption.clearFilters.isButtonVisible = true;
    return this;
  }

  public enableClearFiltersWithoutLabel(): SmzTableFactory {
    this._state.caption.isVisible = true;
    this._state.caption.clearFilters.label = null;
    this._state.caption.clearFilters.isButtonVisible = true;
    return this;
  }

  public setClearFilterCallback(callback: () => void): SmzTableFactory {
    if (!this._state.caption.clearFilters.isButtonVisible) {
      throw Error('You need to call \'useClearFilters\' before');
    }
    this._state.caption.clearFilters.callback = callback;
    return this;
  }

  public setToolbarAlignment(alignment: 'start' | 'end'): SmzTableFactory {
    this._state.caption.isVisible = true;
    this._state.caption.toolbarAlignment = alignment;
    return this;
  }

  public allowDefaultMultiSelection(): SmzTableFactory {
    this._state.caption.rowSelection.isEnabled = true;
    return this;
  }

  public allowUserMultiSelection(label: string = 'Seleção'): SmzTableFactory {
    this._state.caption.rowSelection.isEnabled = true;
    this._state.caption.rowSelection.isButtonVisible = true;
    this._state.caption.rowSelection.label = label;
    this._state.caption.rowSelection.columnWidth = '3em';
    return this;
  }

  public setMultiSelectionCallback(callback: () => void): SmzTableFactory {
    if (!this._state.caption.rowSelection.isButtonVisible) {
      throw Error('You need to call \'allowUserMultiSelection\' before');
    }
    this._state.caption.rowSelection.callback = callback;
    return this;
  }

  public setMultiSelectioncolumnWidth(width: string): SmzTableFactory {
    if (!this._state.caption.rowSelection.isButtonVisible) {
      throw Error('You need to call \'allowUserMultiSelection\' before');
    }
    this._state.caption.rowSelection.columnWidth = width;
    return this;
  }

  public setSkeletonRowsCount(rows: number): SmzTableFactory {
    this._state.initialState.skeleton.isEnabled = true;
    this._state.initialState.skeleton.rows = rows;
    return this;
  }

  public setEmptyFeedbackMessage(message: string): SmzTableFactory {
    this._state.emptyFeedback.message = message;
    return this;
  }

  public setEmptyFeedbackExtraInfo(text: string): SmzTableFactory {
    this._state.emptyFeedback.extraInfo = text;
    return this;
  }

  public addEmptyFeedbackButton(label: string, callback: () => void): SmzTableFactory {
    this._state.emptyFeedback.actionButton = { callback, label };
    return this;
  }

  public setEmptyFeedbackImage(path: string): SmzTableFactory {
    this._state.emptyFeedback.image = path;
    return this;
  }

  public usePagination(): SmzTableFactory {
    this._state.pagination.isVisible = true;
    this._state.pagination.rows = 10;
    this._state.pagination.rowsPerPageOptions = [ 5, 10, 25, 50, 100 ];
    this._state.pagination.pageReport = {
      isVisible: true,
      template: 'Mostrando {first} a {last} de {totalRecords} itens'
    };
    return this;
  }

  public setPaginationDefaultRows(value: number): SmzTableFactory {
    if (!this._state.pagination.isVisible) {
      throw Error('You need to call \'usePagination\' before');
    }
    this._state.pagination.rows = value;
    return this;
  }

  public setPaginationPageOptions(value: number[]): SmzTableFactory {
    if (!this._state.pagination.isVisible) {
      throw Error('You need to call \'usePagination\' before');
    }
    this._state.pagination.rowsPerPageOptions = value;
    return this;
  }

  public hidePaginationReport(): SmzTableFactory {
    if (!this._state.pagination.isVisible) {
      throw Error('You need to call \'usePagination\' before');
    }
    this._state.pagination.pageReport.isVisible = false;
    return this;
  }

  public setPaginationReportTemplateText(template: string): SmzTableFactory {
    if (!this._state.pagination.isVisible) {
      throw Error('You need to call \'usePagination\' before');
    }
    this._state.pagination.pageReport.template = template;
    return this;
  }

  public setInitialSorting(field: string, order: 1 | -1): SmzTableFactory {
    this._state.sort.field = field;
    this._state.sort.order = order;
    return this;
  }

  public setCustomInitialSorting(data: { field?: string, mode?: 'single' | 'multiple', order?: 1 | -1, multiSortMeta?: { field: string, order: 1 | -1 } [] }): SmzTableFactory {
    this._state.sort = data;
    return this;
  }

  public useStrippedStyle(): SmzTableFactory {
    this._state.styles.striped = true;
    return this;
  }

  public useCustomActions(columnWidth: string): SmzTableFactory {
    this._state.actions.customActions.isVisible = true;
    this._state.actions.customActions.columnWidth = columnWidth;
    return this;
  }

  public disableRowHoverEffect(): SmzTableFactory {
    this._state.actions.rowBehavior.hoverable = false;
    return this;
  }

  public setRowClickCallback<T>(callback: (event: T) => void): SmzTableFactory {
    this._state.actions.rowBehavior.isClickable = true;
    this._state.actions.rowBehavior.clickCallback = callback;
    return this;
  }

  public addMenuItem(item: SmzMenuItem): SmzTableFactory {
    this._state.actions.menu.isVisible = true;
    this._state.actions.menu.items.push(item);
    return this;
  }

  public setMenus(items: SmzMenuItem[]): SmzTableFactory {
    this._state.actions.menu.isVisible = true;
    this._state.actions.menu.items = items;
    return this;
  }

  public addTextColumn(field: string, header: string, width: string = 'auto'): SmzTableFactory {
    this._currentColumn = {
      field: field,
      header: header,
      content: {
        type: SmzContentType.TEXT,
        data: { matches: [] }
      },
      isOrderable: true,
      filter: {
        isGlobalFilterable: true,
        type: SmzFilterType.TEXT
      },
      isVisible: true,
      width: width
    };
    this._state.columns.push(this._currentColumn);
    return this;
  }

  public addCustomColumn(field: string, header: string, width: string = 'auto'): SmzTableFactory {
    this.addTextColumn(field, header);
    this.setColumnWidth(width);
    this.setColumnContentType(SmzContentType.CUSTOM);
    return this;
  }

  public addIconColumn(field: string, header: string, width: string = 'auto'): SmzTableFactory {
    this.addTextColumn(field, header);
    this.setColumnWidth(width);
    this.setColumnContentType(SmzContentType.ICON);
    return this;
  }

  public addDateColumn(field: string, header: string, width: string = 'auto'): SmzTableFactory {
    this.addTextColumn(field, header);
    this.setColumnWidth(width);
    this.setColumnContentType(SmzContentType.CALENDAR);
    return this;
  }

  public addCurrencyeColumn(field: string, header: string, width: string = 'auto'): SmzTableFactory {
    this.addTextColumn(field, header);
    this.setColumnWidth(width);
    this.setColumnContentType(SmzContentType.CURRENCY);
    return this;
  }

  public disableColumnOrdering(): SmzTableFactory {
    if (this._currentColumn == null) throw new Error('You need to add a column first');
    this._currentColumn.isOrderable = false;
    return this;
  }

  public setColumnContentType(type: SmzContentType, data: any = null): SmzTableFactory {
    if (this._currentColumn == null) throw new Error('You need to add a column first');
    this._currentColumn.content.type = type;
    this._currentColumn.content.data = data;
    return this;
  }

  public hideColumn(): SmzTableFactory {
    if (this._currentColumn == null) throw new Error('You need to add a column first');
    this._currentColumn.isVisible = false;
    return this;
  }

  public setColumnWidth(width: string): SmzTableFactory {
    if (this._currentColumn == null) throw new Error('You need to add a column first');
    this._currentColumn.width = width;
    return this;
  }

  public setColumnFilterType(type: SmzFilterType): SmzTableFactory {
    if (this._currentColumn == null) throw new Error('You need to add a column first');
    this._currentColumn.filter.type = type;
    return this;
  }

  public removeColumnFromGlobalFilter(): SmzTableFactory {
    if (this._currentColumn == null) throw new Error('You need to add a column first');
    this._currentColumn.filter.isGlobalFilterable = false;
    return this;
  }

  public setDateFormat(format: 'shortDate' | 'short' | 'medium' | 'long' | 'mediumDate' | 'longDate' | 'shortTime'): SmzTableFactory {
    if (this._currentColumn == null) throw new Error('You need to add a column first');
    if (this._currentColumn.content.type !== SmzContentType.CALENDAR) throw new Error('You can set the date for Calendar columns only');
    this._currentColumn.content.data = { format };
    return this;
  }

  public addColumnIconConfiguration(icon: string, value: any, styleClass: string = null, tooltip: string = null): SmzTableFactory {
    if (this._currentColumn == null) throw new Error('You need to add a column first');
    if (this._currentColumn.content.type !== SmzContentType.ICON) throw new Error('You can use this option for Icon columns only');
    (this._currentColumn.content.data as SmzIconContent).matches.push({ icon, value, class: styleClass, tooltip });
    return this;
  }

  public disableColumnFilter(): SmzTableFactory {
    if (this._currentColumn == null) throw new Error('You need to add a column first');
    this._currentColumn.filter.type = SmzFilterType.NONE;
    return this;
  }

  public setFilterType(type: SmzFilterType): SmzTableFactory {
    if (this._currentColumn == null) throw new Error('You need to add a column first');
    this._currentColumn.filter.type = type;
    return this;
  }

  public addMenuSeparator(): SmzTableFactory {
    this._state.actions.menu.items.push({ separator: true });
    return this;
  }

  public build(): SmzTableState {
    return this._state;
  }
}