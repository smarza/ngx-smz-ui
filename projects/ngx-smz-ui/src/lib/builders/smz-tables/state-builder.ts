import { Store } from '@ngxs/store';
import { flatten, sortBy } from 'lodash-es';
import { GlobalInjector } from '../../../lib/common/services/global-injector';
import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { defaultMapResults, EditableChanges } from '../../modules/smz-tables/models/editable-model';
import { SmzTableState } from '../../modules/smz-tables/models/table-state';
import { StateBuilderFunctions } from './state-builder-functions';
import { SmzColumnCollectionBuilder } from './column-builder';
import { SmzMenuTableBuilder } from './menu-builder';
import { SmzForm } from '../../modules/smz-forms/models/smz-forms';
import { SmzControlTypes } from '../../modules/smz-forms/models/control-types';
import { convertFormFeature } from '../smz-dialogs/dialog-input-conversion';
import { UiDefinitionsDbSelectors } from '../../state/database/ui-definitions/ui-definitions.selectors';
import { SmzBatchMenuBuilder } from './batch-menu-builder';

export class SmzTableBuilder {
  public _state: SmzTableState = {
    columns: [],
    actions: {
      customActions: {
        columnWidth: 0,
        isVisible: false,
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
        clickCallback: null,
        hoverable: true,
        isClickable: false,
        highlights: { ids: [] }
      }
    },
    editable: {
      isEditable: false,
      update: {
        isButtonVisible: false,
        isButtonDisabled: false,
        accessClaim: null
      },
      creation: {
        isButtonVisible: false,
        isButtonDisabled: false,
        buttonLabel: 'Criar',
        accessClaim: null
      },
      remove: {
        isButtonVisible: false,
        isButtonDisabled: false,
        accessClaim: null,
        overrideActionDataCallback: null
      },
      actions:
      {
        update: null,
        creation: null,
        remove: null,
      },
      mapResults: (data, changes: EditableChanges<any>) => defaultMapResults(data, changes)
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
        showDropdownSelector: false,
        showColumnHideButton: false,
      },
      globalFilter: {
        isVisible: false,
        expanded: false,
        placeholder: 'Pesquisa Global'
      },
      isVisible: false,
      title: null,
      toolbarAlignment: 'start'
    },
    header: {
      isVisible: true
    },
    emptyFeedback: {
      actionButtons: [],
      extraInfo: null,
      image: 'assets/images/tables/empty.svg',
      message: 'Lista vazia',
      isFeatured: true
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
      rowsPerPageOptions: [5, 10, 25, 50],
      state: { first: 0, rows: 10 }
    },
    sort: {
      field: null,
      mode: 'single',
      multiSortMeta: null,
      order: 1
    },
    styles: {
      striped: false,
      showGrid: false,
      size: 'regular',
      columnsWidth: {
        estimate: false,
        samples: null
      }
    },
    frozen: {
      isEnabled: false,
      width: '300px'
    },
    viewport: {
      scrollable: false,
      scrollHeight: null,
      resizableColumns: false,
      columnResizeMode: 'fit'
    },
    rowExpansion: {
      isButtonVisible: false,
      isEnabled: false,
      callback: null,
      columnWidth: '3em',
      label: ''
    },
  };

  constructor(uiDefinitionName?: string) {

    if (uiDefinitionName) {
      const preferredUiModel = 'create';
      const store = GlobalInjector.instance.get(Store);

      const uiDefinition = store.selectSnapshot(UiDefinitionsDbSelectors.single(uiDefinitionName, preferredUiModel));

      if (uiDefinition == null) {
        throw Error(`You need to supply a valid ui-definitions. There is no ${uiDefinitionName} in the store`);
      }

      const inputConfigs = flatten(uiDefinition.map(x => flatten(x.controls)));

      if (inputConfigs?.length === 0) {
        throw Error(`There are no elements in ui-definitions ${preferredUiModel}`);
      }

      const formFeature: SmzForm<any> = convertFormFeature(uiDefinitionName, store, null).data as SmzForm<any>;

      const children: SmzControlTypes[] = flatten(formFeature.groups.map(g => g.children));

      StateBuilderFunctions.createColumnsFromInputControls(this._state, inputConfigs, children);
    }

  }

  public setTitle(title: string): SmzTableBuilder {
    this._state.caption.isVisible = true;
    this._state.caption.title = title;
    return this;
  }

  public enableGlobalFilter(placeholder?: string): SmzTableBuilder {
    this._state.caption.isVisible = true;
    this._state.caption.globalFilter.isVisible = true;

    if (placeholder != null) this._state.caption.globalFilter.placeholder = placeholder;
    return this;
  }

  public expandGlobalFilterInput(): SmzTableBuilder {

    if (!this._state.caption.globalFilter.isVisible) {
      throw Error('You need to call \'enableGlobalFilter\' before');
    }

    this._state.caption.globalFilter.expanded = true;
    return this;
  }

  public enableColumnVisibility(showColumnHideButton: boolean = false): SmzTableBuilder {
    this._state.caption.isVisible = true;
    this._state.caption.columnVisibility.showDropdownSelector = true;
    this._state.caption.columnVisibility.showColumnHideButton = showColumnHideButton;
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
      throw Error('You need to call \'enableClearFilters\' before');
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

  public allowUserMultiSelection(label: string = 'Seleção', initialState: 'enabled' | 'disabled' = 'enabled'): SmzTableBuilder {
    this._state.caption.rowSelection.isEnabled = initialState === 'enabled';
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


  public allowDefaultRowExpansion(): SmzTableBuilder {
    this._state.rowExpansion.isEnabled = true;
    return this;
  }

  public allowRowExpansion(label: string = 'Seleção', initialState: 'enabled' | 'disabled' = 'enabled'): SmzTableBuilder {
    this._state.rowExpansion.isEnabled = initialState === 'enabled';
    this._state.rowExpansion.isButtonVisible = true;
    this._state.rowExpansion.label = label;
    this._state.rowExpansion.columnWidth = '3em';
    return this;
  }

  public setRowExpansionCallback(callback: () => void): SmzTableBuilder {
    if (!this._state.rowExpansion.isButtonVisible) {
      throw Error('You need to call \'allowRowExpansion\' before');
    }
    this._state.rowExpansion.callback = callback;
    return this;
  }

  public setRowExpansionColumnWidth(width: string): SmzTableBuilder {
    if (!this._state.rowExpansion.isButtonVisible) {
      throw Error('You need to call \'allowRowExpansion\' before');
    }
    this._state.rowExpansion.columnWidth = width;
    return this;
  }

  public hideHeader(): SmzTableBuilder {
    this._state.header.isVisible = false;
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

  public useTableEmptyMessage(): SmzTableBuilder {
    this._state.emptyFeedback.isFeatured = false;
    return this;
  }

  public setEmptyFeedbackExtraInfo(text: string): SmzTableBuilder {
    if (!this._state.emptyFeedback.isFeatured) {
      throw Error('This feature is not compatible with \'useTableEmptyMessage\'');
    }

    this._state.emptyFeedback.extraInfo = text;
    return this;
  }

  public addEmptyFeedbackButton(label: string, callback: () => void, icon: string = null): SmzTableBuilder {
    if (!this._state.emptyFeedback.isFeatured) {
      throw Error('This feature is not compatible with \'useTableEmptyMessage\'');
    }

    this._state.emptyFeedback.actionButtons.push({ callback, label, icon });
    return this;
  }

  public setEmptyFeedbackImage(path: string): SmzTableBuilder {
    if (!this._state.emptyFeedback.isFeatured) {
      throw Error('This feature is not compatible with \'useTableEmptyMessage\'');
    }

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
    this._state.pagination.state.rows = this._state.pagination.rows;
    return this;
  }

  public setPaginationDefaultRows(value: number): SmzTableBuilder {
    if (!this._state.pagination.isVisible) {
      throw Error('You need to call \'usePagination\' before');
    }
    this._state.pagination.rows = value;
    this._state.pagination.state.rows = value;
    return this;
  }

  public setPaginationPageOptions(value: number[]): SmzTableBuilder {
    if (!this._state.pagination.isVisible) {
      throw Error('You need to call \'usePagination\' before');
    }
    this._state.pagination.rowsPerPageOptions = value;
    return this;
  }

  public setPaginationInitialPage(page: number): SmzTableBuilder {
    if (!this._state.pagination.isVisible) {
      throw Error('You need to call \'usePagination\' before');
    }

    if (page <= 0) {
      throw Error('You need to provide a \'page number\' bigger then 0');
    }

    this._state.pagination.state.first = page - 1;
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

  public useGridStyle(): SmzTableBuilder {
    this._state.styles.showGrid = true;
    return this;
  }

  public setSize(size: 'small' | 'regular' | 'large'): SmzTableBuilder {
    this._state.styles.size = size;
    return this;
  }

  public useAutoWidth(samplesCount?: number): SmzTableBuilder {
    this._state.styles.columnsWidth.estimate = true;
    this._state.styles.columnsWidth.samples = samplesCount;
    return this;
  }

  public reorder(...properties: string[]): SmzTableBuilder {
    this._state.columns = sortBy(this._state.columns, (c) => properties.indexOf(c.property) !== -1? properties.indexOf(c.property) : this._state.columns.length);
    return this;
  }

  public relabel(...operations: { property: string, header: string }[]): SmzTableBuilder {
    operations.forEach(o => {
      const column = this._state.columns.find(x => x.property === o.property);

      if (column == null) {
        throw Error(`There is no column with the property ${o.property}`);
      }

      column.header = o.header;
    });
    return this;
  }

  public resize(...operations: { property: string, width: string }[]): SmzTableBuilder {
    operations.forEach(o => {
      const column = this._state.columns.find(x => x.property === o.property);

      if (column == null) {
        throw Error(`There is no column with the property ${o.property}`);
      }

      column.width = o.width;
    });
    return this;
  }

  public useCustomActions(columnWidthPixels: number): SmzTableBuilder {
    this._state.actions.customActions.isVisible = true;
    this._state.actions.customActions.columnWidth += columnWidthPixels;
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

  public setHighlightedRows(ids: string[]): SmzTableBuilder {
    this._state.actions.rowBehavior.highlights.ids = ids;
    return this;
  }

  public menu(items: SmzMenuItem[] = null): SmzMenuTableBuilder {
    const menuBuilder = new SmzMenuTableBuilder(this);

    if (items != null) {
      this._state.actions.menu.isVisible = true;
      this._state.actions.customActions.columnWidth += 63;
      this._state.actions.menu.items = items;
    }

    return menuBuilder;
  }

  public dynamicMenu(callback: (row: any) => SmzMenuItem[]): SmzTableBuilder {

    if (this._state.actions.menu.items != null && this._state.actions.menu.items.length > 0) {
      throw Error('You can\'t call \'dynamicMenu\' if the menu items are already set');
    }

    this._state.actions.menu.isVisible = true;
    this._state.actions.customActions.columnWidth += 63;
    this._state.actions.menu.callback = callback;
    this._state.actions.menu.items = null;

    return this;
  }

  public batchMenu(items: SmzMenuItem[] = null): SmzBatchMenuBuilder {

    if (!this._state.caption.rowSelection.isEnabled) {
      throw Error('You need to call \'allowDefaultMultiSelection\' or \'allowUserMultiSelection\' before');
    }

    const batchMenuBuilder = new SmzBatchMenuBuilder(this);

    if (items != null) {
      this._state.actions.batchActions.isVisible = true;
      this._state.actions.batchActions.items = items;
    }

    return batchMenuBuilder;
  }

  public customizeEditableResults<T>(mapFunction: (data: T, changeS: EditableChanges<T>) => any): SmzTableBuilder {
    this._state.editable.mapResults = mapFunction;

    return this;
  }

  public setUpdateAction(action: any, claim?: string): SmzTableBuilder {

    if (!this._state.editable.isEditable) this._state.actions.customActions.columnWidth += 150;

    this._state.editable.actions.update = action;
    this._state.editable.update.isButtonVisible = true;
    this._state.editable.update.accessClaim = claim;
    this._state.editable.isEditable = true;

    return this;
  }

  public setCreationAction(action: any, claim?: string): SmzTableBuilder {

    if (!this._state.editable.isEditable) this._state.actions.customActions.columnWidth += 150;

    this._state.editable.actions.creation = action;
    this._state.editable.creation.isButtonVisible = true;
    this._state.editable.creation.accessClaim = claim;
    this._state.editable.isEditable = true;

    return this;
  }

  public setRemoveAction(action: any, claim?: string, overrideActionData?: (row: any) => any): SmzTableBuilder {

    if (!this._state.editable.isEditable) this._state.actions.customActions.columnWidth += 150;

    this._state.editable.actions.remove = action;
    this._state.editable.remove.isButtonVisible = true;
    this._state.editable.remove.accessClaim = claim;
    this._state.editable.remove.overrideActionDataCallback = overrideActionData;
    this._state.editable.isEditable = true;

    return this;
  }

  public useScrolling(): SmzTableBuilder {

    this._state.viewport.scrollable = true;
    this._state.viewport.scrollHeight = 'flex';

    return this;
  }

  public setVerticalScrollHeight(height: string): SmzTableBuilder {

    if (!this._state.viewport.scrollable) {
      throw Error('You need to call \'useScrolling\' before');
    }

    this._state.viewport.scrollHeight = height;

    return this;
  }

  public enableResizableColumns(mode: 'fit' | 'expand' = 'fit'): SmzTableBuilder {

    if (!this._state.viewport.scrollable) {
      throw Error('You need to call \'useScrolling\' before');
    }

    this._state.viewport.resizableColumns = true;
    this._state.viewport.columnResizeMode = mode;

    return this;
  }

  public columns(): SmzColumnCollectionBuilder {
    return new SmzColumnCollectionBuilder(this);
  }

  public build(): SmzTableState {
    return this._state;
  }
}