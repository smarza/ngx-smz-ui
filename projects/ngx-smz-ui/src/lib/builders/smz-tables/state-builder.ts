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

// SCROLL TRUE =>
//   MIN-WIDTH PODE TER PX
//   MIN-WIDTH NÃO PODE SER AUTO

// SCROLL FALSE =>
//   MIN-WIDTH PODE SER PX
//   MIN-WIDTH PODE SER AUTO

export class SmzTableBuilder {
  public _state: SmzTableState = {
    isValid: true,
    isDebug: false,
    columns: [],
    actions: {
      customActions: {
        columnWidth: 0,
        isVisible: false,
      },
      menu: {
        isVisible: false,
        items: [],
        styles: {
          icon: 'pi pi-bars',
          styleClass: '',
          buttonClass: ''
        }
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
        validationMode: 'none'
      },
      clearFilters: {
        callback: null,
        isButtonVisible: false,
      },
      columnVisibility: {
        showDropdownSelector: false,
        showColumnHideButton: false,
      },
      globalFilter: {
        isVisible: false,
        expanded: false,
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
        samples: null,
        maxWidth: null,
        behavior: 'min-width',
        estimateFontBase: 'bold 14px sans-serif',
        estimatePadding: 36 // Pouco mais do que 1 rem (padrão da lib) | 1 rem = 32 px
      },
      tableStyleClass: ''
    },
    frozen: {
      isEnabled: false,
      width: '300px'
    },
    viewport: {
      scrollable: false,
      scrollHeight: null,
      scrollDirection: 'vertical',
      resizableColumns: false,
      columnResizeMode: 'fit'
    },
    rowExpansion: {
      isButtonVisible: false,
      isEnabled: false,
      callback: null,
      columnWidth: '3em',
      label: '',
      sincronize: false
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

    this.setLocale('pt-BR');

  }

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

  public setLocale(language: 'pt-BR' | 'en-US'): SmzTableBuilder {

    switch (language) {
      case 'pt-BR':
        this._state.locale = {
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
        };

        break;

      case 'en-US':

        this._state.locale = {
          columnVisibility: {
            placeholder: 'Columns',
            selectedItemsLabel: '{0} visible columns',
            pTooltip: 'Choose the columns you want to view in the table.'
          },
          globalFilter: {
            placeholder: 'Global Search'
          },
          dropdownFilter: {
            placeholder: 'All'
          },
          clearFilters: {
            label: 'Clear Filters'
          },
          rowSelection: {
            label: 'Selection'
          },
          paginator: {
            template: 'Showing {first} to {last} of {totalRecords} items'
          }
        };

        break;

      default:
        break;
    }

    return this;
  }

  public enableClearFilters(): SmzTableBuilder {
    this._state.caption.isVisible = true;
    this._state.caption.clearFilters.isButtonVisible = true;
    return this;
  }

  // public enableClearFiltersWithoutLabel(): SmzTableBuilder {
  //   this._state.caption.isVisible = true;
  //   this._state.caption.clearFilters.isButtonVisible = true;
  //   return this;
  // }

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

  /**
   * Enables the checkbox for multiselection in the table
   * The user cannot disable this feature
   */
  public allowDefaultMultiSelection(): SmzTableBuilder {
    this._state.caption.rowSelection.isEnabled = true;
    return this;
  }

  /**
 * Enables the checkbox for multiselection in the table
 * and a creates a button to allow the user to disable the selection mode
 */
  public allowUserMultiSelection(initialState: 'enabled' | 'disabled' = 'enabled'): SmzTableBuilder {
    this._state.caption.rowSelection.isEnabled = initialState === 'enabled';
    this._state.caption.rowSelection.isButtonVisible = true;
    this._state.caption.rowSelection.columnWidth = '3em';
    return this;
  }

  /**
   * The table will emit a validation statement through the variable isValid
   * So that the Dialog can control the submit button based on that
   * If the user select one or more items the table will be valid
   * otherwise the table is always invalid.
   */
  public setSelectionAsRequired(): SmzTableBuilder {
    this._state.caption.rowSelection.validationMode = 'required';
    this._state.isValid = false;
    return this;
  }

  /**
   * This callback is called when the user click on the selection activation button
   * and everytime a selection changes
   */
  public setMultiSelectionCallback(callback: (selection: any[]) => void): SmzTableBuilder {
    if (!this._state.caption.rowSelection.isEnabled) {
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
    this._state.rowExpansion.sincronize = true;
    this._state.rowExpansion.highlightNewItems = true;
    this._state.rowExpansion.highlightLabel = 'NOVO';
    return this;
  }

  public allowRowExpansion(label: string = 'Seleção', initialState: 'enabled' | 'disabled' = 'enabled'): SmzTableBuilder {
    this._state.rowExpansion.isEnabled = initialState === 'enabled';
    this._state.rowExpansion.isButtonVisible = true;
    this._state.rowExpansion.label = label;
    this._state.rowExpansion.columnWidth = '3em';
    this._state.rowExpansion.sincronize = true;
    this._state.rowExpansion.highlightNewItems = true;
    this._state.rowExpansion.highlightLabel = 'NOVO';
    return this;
  }

  public disableRowExpansionSincronization(): SmzTableBuilder {
    if (!this._state.rowExpansion.isEnabled) {
      throw Error('You need to call \'allowDefaultRowExpansion or allowRowExpansion\' before');
    }
    this._state.rowExpansion.sincronize = false;
    return this;
  }

  public setNewItemsMessage(label: string): SmzTableBuilder {
    if (!this._state.rowExpansion.isEnabled) {
      throw Error('You need to call \'allowDefaultRowExpansion or allowRowExpansion\' before');
    }
    this._state.rowExpansion.label = label;
    return this;
  }

  public hideNewItemsMessage(): SmzTableBuilder {
    if (!this._state.rowExpansion.isEnabled) {
      throw Error('You need to call \'allowDefaultRowExpansion or allowRowExpansion\' before');
    }
    this._state.rowExpansion.highlightNewItems = false;
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
    this._state.pagination.rowsPerPageOptions = [5, 10, 25, 50, 100];
    this._state.pagination.pageReport = {
      isVisible: true,
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

  public setCustomInitialSorting(data: { field?: string, mode?: 'single' | 'multiple', order?: 1 | -1, multiSortMeta?: { field: string, order: 1 | -1 }[] }): SmzTableBuilder {
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

    switch (size) {
      case 'small':
        this._state.actions.menu.styles = { icon: 'fas fa-ellipsis-h', styleClass: 'p-button-text p-button-plain p-button-sm p-0 shadow-none hover:bg-inherit', buttonClass: 'p-0' };
        break;

      case 'regular':
        this._state.actions.menu.styles = { icon: 'fas fa-bars', styleClass: '', buttonClass: '' };
        break;

      case 'large':
        this._state.actions.menu.styles = { icon: 'fas fa-bars', styleClass: '', buttonClass: '' };
        break;
      default:
        break;
    }

    return this;
  }

  public useEstimatedColWidth(maxWidthPx?: number): SmzTableBuilder {

    this._state.viewport.scrollable = true;
    this._state.viewport.scrollHeight = 'flex';
    this._state.viewport.scrollDirection = 'both';

    this._state.styles.columnsWidth.estimate = true;
    this._state.styles.columnsWidth.samples = 50;
    this._state.styles.columnsWidth.behavior = 'min-width';
    this._state.styles.columnsWidth.maxWidth = maxWidthPx;

    return this;
  }

  public setEstimatedSamplesCount(samplesCount: number): SmzTableBuilder {

    if (!this._state.styles.columnsWidth.estimate) {
      throw Error('You need to call \'useEstimatedColWidth\' before');
    }

    this._state.styles.columnsWidth.samples = samplesCount;

    return this;
  }

  // public setColumnWidthBehavior(behavior: 'width' | 'min-width'): SmzTableBuilder {

  //   this._state.styles.columnsWidth.behavior = behavior;

  //   return this;
  // }

  public setEstimatedFontBase(fontBase: string): SmzTableBuilder {

    if (!this._state.styles.columnsWidth.estimate) {
      throw Error('You need to call \'useEstimatedColWidth\' before');
    }

    this._state.styles.columnsWidth.estimateFontBase = fontBase;

    return this;
  }

  public setEstimatedPadding(padding: number): SmzTableBuilder {

    if (!this._state.styles.columnsWidth.estimate) {
      throw Error('You need to call \'useEstimatedColWidth\' before');
    }

    this._state.styles.columnsWidth.estimatePadding = padding;

    return this;
  }

  public setTableStyleClass(styleClass: string): SmzTableBuilder {

    this._state.styles.tableStyleClass = styleClass;

    return this;
  }

  public reorder(...properties: string[]): SmzTableBuilder {
    this._state.columns = sortBy(this._state.columns, (c) => properties.indexOf(c.property) !== -1 ? properties.indexOf(c.property) : this._state.columns.length);
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

    this._state.actions.customActions.columnWidth += this._state.styles.size === 'small' ? 40 : 63;

    const menuBuilder = new SmzMenuTableBuilder(this);

    if (items != null) {
      this._state.actions.menu.isVisible = true;
      this._state.actions.menu.items = items;
    }

    return menuBuilder;
  }

  public dynamicMenu(callback: (row: any) => SmzMenuItem[]): SmzTableBuilder {

    if (this._state.actions.menu.items != null && this._state.actions.menu.items.length > 0) {
      throw Error('You can\'t call \'dynamicMenu\' if the menu items are already set');
    }

    this._state.actions.menu.isVisible = true;
    this._state.actions.customActions.columnWidth += this._state.styles.size === 'small' ? 40 : 63;
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

  public setScrollDirection(direction: 'vertical' | 'horizontal' | 'both' = 'vertical'): SmzTableBuilder {

    if (this._state.styles.columnsWidth.estimate) {
      throw Error('You can\'t use \'setScrollDirection\' while using \'useEstimatedColWidth\'');
    }

    this._state.viewport.scrollable = true;
    this._state.viewport.scrollHeight = 'flex';
    this._state.viewport.scrollDirection = direction;

    return this;
  }

  public useVerticalScrollHeight(height: string): SmzTableBuilder {

    if (this._state.styles.columnsWidth.estimate) {
      throw Error('You can\'t use \'useVerticalScrollHeight\' while using \'useEstimatedColWidth\'');
    }

    this._state.viewport.scrollable = true;
    this._state.viewport.scrollDirection = 'vertical';
    this._state.viewport.scrollHeight = height;

    return this;
  }

  // public enableResizableColumns(mode: 'fit' | 'expand' = 'fit'): SmzTableBuilder {

  //   if (!this._state.viewport.scrollable) {
  //     throw Error('You need to call \'useScrolling\' before');
  //   }

  //   this._state.viewport.resizableColumns = true;
  //   this._state.viewport.columnResizeMode = mode;

  //   return this;
  // }

  public debugMode(): SmzTableBuilder {
    this._state.isDebug = true;
    return this;
  }

  public columns(): SmzColumnCollectionBuilder {
    return new SmzColumnCollectionBuilder(this);
  }

  public build(): SmzTableState {

    this._state.columns.forEach(col => {

      col.content.ngStyle = applyTableContentNgStyle(this._state, null, col.width);

      if (this._state.isDebug) {
        col.headerStyleClass = col.headerStyleClass + ' border border-1 border-red-300';
      }

      if (this._state.viewport.scrollable && col.width?.includes('%')) {
        throw Error('You cannot set any column width with percentage while using scrollable table.');
      }

    });

    if (this._state.isDebug) {
      console.log(this._state);
    }

    return this._state;
  }
}

export function applyTableContentNgStyle(state: SmzTableState, size: number, finalWidth?: string): any {

  const behavior = state.styles.columnsWidth.behavior;
  const isScrollable = state.viewport.scrollable;
  const hasGlobalMaxWidth = state.styles.columnsWidth.maxWidth != null;
  const globalMaxWidth = state.styles.columnsWidth.maxWidth;
  const maxWidthStyle = `${state.styles.columnsWidth.maxWidth}px`;
  const sizeStyle = `${size}px`;

  if (state.isDebug) {
    console.log('___________________');
    console.log('applyTableContentNgStyle');
    console.log('behavior', behavior);
    console.log('isScrollable', isScrollable);
    console.log('hasMaxWidth', hasGlobalMaxWidth);
    console.log('width', size);
    console.log('global maxWidth', state.styles.columnsWidth.maxWidth);
  }

  let minWidth = '';
  let width = '';
  let maxWidth = '';

  if (finalWidth && !hasGlobalMaxWidth) {
    // Estimativa desligada
    // Valor máximo global não definido
    // Replicar igualmente o width da col definido para todos os parâmetros do html
    if (state.isDebug) console.log(0);
    minWidth = finalWidth;
    width = finalWidth;
    maxWidth = finalWidth;
  }
  else if (finalWidth && hasGlobalMaxWidth) {
    // Estimativa desligada
    // Valor máximo global definido
    // Se a col estiver com auto => todos os parametros serão iguais ao máximo
    // Se a col estiver com valores definidos => usar valores definidos
    if (state.isDebug) console.log(1);
    minWidth = finalWidth == 'auto' ? maxWidthStyle : finalWidth;
    width = finalWidth == 'auto' ? maxWidthStyle : finalWidth;
    maxWidth = finalWidth == 'auto' ? maxWidthStyle : finalWidth;
  }
  else if (isScrollable && hasGlobalMaxWidth) {
    if (state.isDebug) console.log(2);
    minWidth = size < globalMaxWidth ? sizeStyle : maxWidthStyle;
    width = size < globalMaxWidth ? sizeStyle : maxWidthStyle;
    maxWidth = size < globalMaxWidth ? sizeStyle: maxWidthStyle;
  }
  else if (isScrollable && !hasGlobalMaxWidth) {
    if (state.isDebug) console.log(3);
    minWidth = sizeStyle;
    width = sizeStyle;
    maxWidth = sizeStyle;
  }
  else if (!isScrollable && hasGlobalMaxWidth) {
    if (state.isDebug) console.log(4);
    minWidth = size < globalMaxWidth ? sizeStyle : maxWidthStyle;
    width = size < globalMaxWidth ? sizeStyle : maxWidthStyle;
    maxWidth = maxWidthStyle;
  }

  switch (behavior) {
    case 'min-width':
      return { 'min-width': minWidth, 'width': width, 'max-width': maxWidth };

    case 'width':
      return { 'width': width, 'max-width': maxWidth };
  }

}