import { MenuItem } from 'primeng/api';
import { SmzMenuItem } from './conditional-menu-item';
import { SmzContentType, SmzIconContent } from './content-types';
import { SmzFilterType } from './filter-types';
import { SmzTableColumn } from './table-column';
import { SmzTableState } from './table-state';

export class SmzTableBuilder {
  public _state: SmzTableState = {
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

  public setTitle(title: string): SmzTableBuilder {
    this._state.caption.isVisible = true;
    this._state.caption.title = title;
    return this;
  }

  public enableGlobalFilter(): SmzTableBuilder {
    this._state.caption.isVisible = true;
    this._state.caption.globalFilter.isVisible = true;
    return this;
  }

  public enableColumnVisibility(): SmzTableBuilder {
    this._state.caption.isVisible = true;
    this._state.caption.columnVisibility.showButton = true;
    return this;
  }

  public enableClearFilters(label: string = 'Limpar Filtros'): SmzTableBuilder {
    this._state.caption.isVisible = true;
    this._state.caption.clearFilters.label = label;
    this._state.caption.clearFilters.isButtonVisible = true;
    return this;
  }

  public enableClearFiltersWithoutLabel(): SmzTableBuilder {
    this._state.caption.isVisible = true;
    this._state.caption.clearFilters.label = null;
    this._state.caption.clearFilters.isButtonVisible = true;
    return this;
  }

  public setClearFilterCallback(callback: () => void): SmzTableBuilder {
    if (!this._state.caption.clearFilters.isButtonVisible) {
      throw Error('You need to call \'useClearFilters\' before');
    }
    this._state.caption.clearFilters.callback = callback;
    return this;
  }

  public setToolbarAlignment(alignment: 'start' | 'end'): SmzTableBuilder {
    this._state.caption.isVisible = true;
    this._state.caption.toolbarAlignment = alignment;
    return this;
  }

  public allowDefaultMultiSelection(): SmzTableBuilder {
    this._state.caption.rowSelection.isEnabled = true;
    return this;
  }

  public allowUserMultiSelection(label: string = 'Seleção'): SmzTableBuilder {
    this._state.caption.rowSelection.isEnabled = true;
    this._state.caption.rowSelection.isButtonVisible = true;
    this._state.caption.rowSelection.label = label;
    this._state.caption.rowSelection.columnWidth = '3em';
    return this;
  }

  public setMultiSelectionCallback(callback: () => void): SmzTableBuilder {
    if (!this._state.caption.rowSelection.isButtonVisible) {
      throw Error('You need to call \'allowUserMultiSelection\' before');
    }
    this._state.caption.rowSelection.callback = callback;
    return this;
  }

  public setMultiSelectioncolumnWidth(width: string): SmzTableBuilder {
    if (!this._state.caption.rowSelection.isButtonVisible) {
      throw Error('You need to call \'allowUserMultiSelection\' before');
    }
    this._state.caption.rowSelection.columnWidth = width;
    return this;
  }

  public setSkeletonRowsCount(rows: number): SmzTableBuilder {
    this._state.initialState.skeleton.isEnabled = true;
    this._state.initialState.skeleton.rows = rows;
    return this;
  }

  public setEmptyFeedbackMessage(message: string): SmzTableBuilder {
    this._state.emptyFeedback.message = message;
    return this;
  }

  public setEmptyFeedbackExtraInfo(text: string): SmzTableBuilder {
    this._state.emptyFeedback.extraInfo = text;
    return this;
  }

  public addEmptyFeedbackButton(label: string, callback: () => void): SmzTableBuilder {
    this._state.emptyFeedback.actionButton = { callback, label };
    return this;
  }

  public setEmptyFeedbackImage(path: string): SmzTableBuilder {
    this._state.emptyFeedback.image = path;
    return this;
  }

  public usePagination(): SmzTableBuilder {
    this._state.pagination.isVisible = true;
    this._state.pagination.rows = 10;
    this._state.pagination.rowsPerPageOptions = [ 5, 10, 25, 50, 100 ];
    this._state.pagination.pageReport = {
      isVisible: true,
      template: 'Mostrando {first} a {last} de {totalRecords} itens'
    };
    return this;
  }

  public setPaginationDefaultRows(value: number): SmzTableBuilder {
    if (!this._state.pagination.isVisible) {
      throw Error('You need to call \'usePagination\' before');
    }
    this._state.pagination.rows = value;
    return this;
  }

  public setPaginationPageOptions(value: number[]): SmzTableBuilder {
    if (!this._state.pagination.isVisible) {
      throw Error('You need to call \'usePagination\' before');
    }
    this._state.pagination.rowsPerPageOptions = value;
    return this;
  }

  public hidePaginationReport(): SmzTableBuilder {
    if (!this._state.pagination.isVisible) {
      throw Error('You need to call \'usePagination\' before');
    }
    this._state.pagination.pageReport.isVisible = false;
    return this;
  }

  public setPaginationReportTemplateText(template: string): SmzTableBuilder {
    if (!this._state.pagination.isVisible) {
      throw Error('You need to call \'usePagination\' before');
    }
    this._state.pagination.pageReport.template = template;
    return this;
  }

  public setInitialSorting(field: string, order: 1 | -1): SmzTableBuilder {
    this._state.sort.field = field;
    this._state.sort.order = order;
    return this;
  }

  public setCustomInitialSorting(data: { field?: string, mode?: 'single' | 'multiple', order?: 1 | -1, multiSortMeta?: { field: string, order: 1 | -1 } [] }): SmzTableBuilder {
    this._state.sort = data;
    return this;
  }

  public useStrippedStyle(): SmzTableBuilder {
    this._state.styles.striped = true;
    return this;
  }

  public useCustomActions(columnWidth: string): SmzTableBuilder {
    this._state.actions.customActions.isVisible = true;
    this._state.actions.customActions.columnWidth = columnWidth;
    return this;
  }

  public disableRowHoverEffect(): SmzTableBuilder {
    this._state.actions.rowBehavior.hoverable = false;
    return this;
  }

  public setRowClickCallback<T>(callback: (event: T) => void): SmzTableBuilder {
    this._state.actions.rowBehavior.isClickable = true;
    this._state.actions.rowBehavior.clickCallback = callback;
    return this;
  }

  public menu(items: SmzMenuItem[] = null): SmzMenuBuilder {
    const menuBuilder = new SmzMenuBuilder(this);

    if (items != null) {
      this._state.actions.menu.isVisible = true;
      this._state.actions.menu.items = items;
    }

    return menuBuilder;
  }

  public columns(): SmzColumnCollectionBuilder {
    return new SmzColumnCollectionBuilder(this);
  }

  public build(): SmzTableState {
    return this._state;
  }
}

export abstract class SmzBaseColumnBuilder {

  protected _column: SmzTableColumn = null;

  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, type: SmzContentType, field: string, header: string, width: string = 'auto') {
    this._column = {
      field: field,
      header: header,
      content: {
        type: type,
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
  }

  public disableSort(): SmzBaseColumnBuilder {
    this._column.isOrderable = false;
    return this;
  }

  public hide(): SmzBaseColumnBuilder {
    this._column.isVisible = false;
    return this;
  }

  public ignoreOnGlobalFilter(): SmzBaseColumnBuilder {
    this._column.filter.isGlobalFilterable = false;
    return this;
  }

  public disableFilter(): SmzBaseColumnBuilder {
    this._column.filter.type = SmzFilterType.NONE;
    return this;
  }

  public setFilter(type: SmzFilterType): SmzBaseColumnBuilder {
    this._column.filter.type = type;
    return this;
  }

  public get columns(): SmzColumnCollectionBuilder {
    return this._parent;
  }
}

export class SmzDateColumnBuilder extends SmzBaseColumnBuilder {
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.CALENDAR, field, header, width);
  }

  public setDateFormat(format: 'shortDate' | 'short' | 'medium' | 'long' | 'mediumDate' | 'longDate' | 'shortTime'): SmzBaseColumnBuilder {
    if (this._column.content.type !== SmzContentType.CALENDAR) throw new Error('You can set the date for Calendar columns only');
    this._column.content.data = { format };
    return this;
  }
}

export class SmzCurrencyColumnBuilder extends SmzBaseColumnBuilder {
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.CURRENCY, field, header, width);
  }
}

export class SmzTextColumnBuilder extends SmzBaseColumnBuilder {
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.TEXT, field, header, width);
  }
}

export class SmzCustomColumnBuilder extends SmzBaseColumnBuilder {
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.CUSTOM, field, header, width);
  }
}

export class SmzIconColumnBuilder extends SmzBaseColumnBuilder {
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.ICON, field, header, width);
  }

  public addIconConfiguration(icon: string, value: any, styleClass: string = null, tooltip: string = null): SmzBaseColumnBuilder {
    if (this._column.content.type !== SmzContentType.ICON) throw new Error('You can use this option for Icon columns only');
    (this._column.content.data as SmzIconContent).matches.push({ icon, value, class: styleClass, tooltip });
    return this;
  }
}

export class SmzColumnCollectionBuilder {
  constructor(private _tableBuilder: SmzTableBuilder) {

  }

  public text(field: string, header: string, width: string = 'auto'): SmzTextColumnBuilder {
    return new SmzTextColumnBuilder(this._tableBuilder, this, field, header, width);
  }

  public custom(field: string, header: string, width: string = 'auto'): SmzCustomColumnBuilder {
    return new SmzCustomColumnBuilder(this._tableBuilder, this, field, header, width);
  }

  public icon(field: string, header: string, width: string = 'auto'): SmzIconColumnBuilder {
    return new SmzIconColumnBuilder(this._tableBuilder, this, field, header, width);
  }

  public date(field: string, header: string, width: string = 'auto'): SmzDateColumnBuilder {
    return new SmzDateColumnBuilder(this._tableBuilder, this, field, header, width);
  }

  public currency(field: string, header: string, width: string = 'auto'): SmzCurrencyColumnBuilder {
    return new SmzCurrencyColumnBuilder(this._tableBuilder, this, field, header, width);
  }

  public get table(): SmzTableBuilder {
    return this._tableBuilder;
  }
}

export class SmzMenuBuilder {
  constructor(private _tableBuilder: SmzTableBuilder) {

  }

  public item(label: string, icon: string = null): SmzMenuItemBuilder {
    this._tableBuilder._state.actions.menu.isVisible = true;
    const item: SmzMenuItem = { label, icon, transforms: [] };
    this._tableBuilder._state.actions.menu.items.push(item);
    return new SmzMenuItemBuilder(this, null, item);
  }

  public separator(): SmzMenuBuilder {
    this._tableBuilder._state.actions.menu.items.push({ separator: true });
    return this;
  }

  public get table(): SmzTableBuilder {
    return this._tableBuilder;
  }

}

export class SmzMenuItemBuilder {
  constructor(private _menuBuilder: SmzMenuBuilder, private _parent: SmzMenuItemBuilder, private _item: SmzMenuItem) {

  }

  public addChild(label: string, icon: string = null): SmzMenuItemBuilder {
    if (this._item.items == null) {
      this._item.items = [];
    }
    const item: SmzMenuItem = { label, icon, transforms: [] };
    this._item.items.push(item);

    return new SmzMenuItemBuilder(this._menuBuilder, this, item);
  }

  public setCallback<T>(callback: (item: T) => void): SmzMenuItemBuilder {
    this._item.command = callback;
    return this;
  }

  public setRedirect(paths: string[]): SmzMenuItemBuilder {
    this._item.routerLink = paths;
    return this;
  }

  public setVisibilityRule<T>(callback: (item: T) => boolean): SmzMenuItemBuilder {
    this._item.conditional = { condition: callback, property: 'visible' };
    return this;
  }

  public setActivationRule<T>(callback: (item: T) => boolean): SmzMenuItemBuilder {
    this._item.conditional = { condition: callback, property: 'disabled' };
    return this;
  }

  public addTransformRule<T>(callback: (item: T) => Partial<MenuItem>): SmzMenuItemBuilder {
    this._item.transforms.push(callback);
    return this;
  }

  public get menu(): SmzMenuBuilder {
    return this._menuBuilder;
  }

  public applyChild(): SmzMenuItemBuilder {
    return this._parent;
  }

}