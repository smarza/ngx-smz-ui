import { Store } from '@ngxs/store';
import { flatten, sortBy } from 'lodash-es';
import { GlobalInjector } from '../../../lib/common/services/global-injector';
import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { SmzTableState, SmzTableViewportStateData } from '../../modules/smz-tables/models/table-state';
import { StateBuilderFunctions } from './state-builder-functions';
import { SmzColumnCollectionBuilder } from './column-builder';
import { SmzMenuTableBuilder } from './menu-builder';
import { SmzForm } from '../../modules/smz-forms/models/smz-forms';
import { SmzControlTypes } from '../../modules/smz-forms/models/control-types';
import { convertFormFeature } from '../smz-dialogs/dialog-input-conversion';
import { UiDefinitionsDbSelectors } from '../../state/database/ui-definitions/ui-definitions.selectors';
import { SmzBatchMenuBuilder } from './batch-menu-builder';
import { SmzEditableTableBuilder } from './editable-builder';
import { Observable, filter } from 'rxjs';
import { SmzTableExcelBuilder } from './excel-builder';
import { UUID } from 'angular2-uuid';
import { SmzTableViewportBuilder } from './viewport';
import { SmzCaptionButtonsBuilder } from './caption-buttons-builder';

// SCROLL TRUE =>
//   MIN-WIDTH PODE TER PX
//   MIN-WIDTH NÃO PODE SER AUTO

// SCROLL FALSE =>
//   MIN-WIDTH PODE SER PX
//   MIN-WIDTH PODE SER AUTO

export class SmzTableBuilder<TData> {
  public _state: SmzTableState = {
    isValid: true,
    isDebug: false,
    columns: [],
    source: {
      items$: null
    },
    actions: {
      customActions: {
        columnWidth: 0,
        isVisible: false,
        ngStyle: null
      },
      menu: {
        isVisible: false,
        items: [],
        styles: {
          icon: 'pi pi-bars',
          styleClass: '',
          buttonClass: ''
        },
        behavior: 'overlay',
        minWidth: null
      },
      batchActions: {
        isVisible: false,
        items: [],
        ngStyle: null
      },
      rowBehavior: {
        clickCallback: null,
        hoverable: true,
        isClickable: false,
        expandRowOnClick: false,
        highlights: { ids: [] }
      }
    },
    editable: {
      isEditable: false,
      update: {
        isButtonVisible: false,
        isButtonDisabled: false,
        accessClaim: null,
        overrideActionPayloadCallback: null,
        onInit: () => {}
      },
      creation: {
        isButtonVisible: false,
        isButtonDisabled: false,
        buttonLabel: 'Criar',
        accessClaim: null,
        overrideActionPayloadCallback: null,
        onInit: () => {}
      },
      remove: {
        isButtonVisible: false,
        isButtonDisabled: false,
        accessClaim: null,
        overrideActionPayloadCallback: null,
        onInit: () => {}
      },
      actions:
      {
        update: null,
        creation: null,
        remove: null,
      },
      mapResults: [],
      ngStyle: null
    },
    caption: {
      rowSelection: {
        isButtonVisible: false,
        isEnabled: false,
        callback: null,
        columnWidth: '3em',
        validationMode: 'none',
        ngStyle: null
      },
      exportToPdf: {
        isButtonVisible: false,
      },
      exportToExcel: {
        isButtonVisible: false,
        exportHyperLinkAsHtml: false,
        globalDateFormat: null,
        filename: '',
        maxFilenameLength: 100,
        maxFilenameShortenSuffix: '(...)',
        includeUserAsAuthor: false
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
      toolbarAlignment: 'start',
      buttons: []
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
      columnResizeMode: 'fit',
      state: {
        isEnabled: false,
        persistance: 'none',
        saveTrigger: 'onDestroy',
        auto: {
          key: UUID.UUID(),
        },
        manual: {
          loadCallback: null,
          saveCallback: () => {}
        },
        onChangeCallback: () => {},
        data: null
      }
    },
    rowExpansion: {
      isButtonVisible: false,
      isEnabled: false,
      callback: null,
      columnWidth: 75,
      label: '',
      sincronize: false,
      ngStyle: null
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

  public setTitle(title: string): SmzTableBuilder<TData> {
    this._state.caption.isVisible = true;
    this._state.caption.title = title;
    return this;
  }

  public addSource(items$: Observable<any[]>): SmzTableBuilder<TData> {
    this._state.source.items$ = items$;
    return this;
  }

  public enableGlobalFilter(): SmzTableBuilder<TData> {
    this._state.caption.isVisible = true;
    this._state.caption.globalFilter.isVisible = true;

    return this;
  }

  public expandGlobalFilterInput(): SmzTableBuilder<TData> {

    if (!this._state.caption.globalFilter.isVisible) {
      throw Error('You need to call \'enableGlobalFilter\' before');
    }

    this._state.caption.globalFilter.expanded = true;
    return this;
  }

  public enableColumnVisibility(showColumnHideButton: boolean = false): SmzTableBuilder<TData> {
    this._state.caption.isVisible = true;
    this._state.caption.columnVisibility.showDropdownSelector = true;
    this._state.caption.columnVisibility.showColumnHideButton = showColumnHideButton;
    return this;
  }

  public setLocale(language: 'pt-BR' | 'en-US'): SmzTableBuilder<TData> {

    switch (language) {
      case 'pt-BR':
        this._state.locale = {
          language,
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
          exportToPdf: {
            label: 'Exportar PDF',
          },
          exportToExcel: {
            label: 'Exportar EXCEL',
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
          language,
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
          exportToPdf: {
            label: 'Export PDF',
          },
          exportToExcel: {
            label: 'Export EXCEL',
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

  public enableClearFilters(): SmzTableBuilder<TData> {
    this._state.caption.isVisible = true;
    this._state.caption.clearFilters.isButtonVisible = true;
    return this;
  }

  public enableExportToPdf(): SmzTableBuilder<TData> {
    this._state.caption.isVisible = true;
    this._state.caption.exportToPdf.isButtonVisible = true;
    return this;
  }


  public setClearFilterCallback(callback: () => void): SmzTableBuilder<TData> {
    if (!this._state.caption.clearFilters.isButtonVisible) {
      throw Error('You need to call \'enableClearFilters\' before');
    }
    this._state.caption.clearFilters.callback = callback;
    return this;
  }

  public setToolbarAlignment(alignment: 'start' | 'end'): SmzTableBuilder<TData> {
    this._state.caption.isVisible = true;
    this._state.caption.toolbarAlignment = alignment;
    return this;
  }

  public buttons(): SmzCaptionButtonsBuilder<TData> {
    return new SmzCaptionButtonsBuilder<TData>(this);
  }

  /**
   * Enables the checkbox for multiselection in the table
   * The user cannot disable this feature
   */
  public allowDefaultMultiSelection(): SmzTableBuilder<TData> {
    this._state.caption.rowSelection.isEnabled = true;
    return this;
  }

  /**
 * Enables the checkbox for multiselection in the table
 * and a creates a button to allow the user to disable the selection mode
 */
  public allowUserMultiSelection(initialState: 'enabled' | 'disabled' = 'enabled'): SmzTableBuilder<TData> {
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
  public setSelectionAsRequired(): SmzTableBuilder<TData> {
    this._state.caption.rowSelection.validationMode = 'required';
    this._state.isValid = false;
    return this;
  }

  /**
   * This callback is called when the user click on the selection activation button
   * and everytime a selection changes
   */
  public setMultiSelectionCallback(callback: (selection: any[]) => void): SmzTableBuilder<TData> {
    if (!this._state.caption.rowSelection.isEnabled) {
      throw Error('You need to call \'allowUserMultiSelection\' before');
    }
    this._state.caption.rowSelection.callback = callback;
    return this;
  }

  public setMultiSelectioncolumnWidth(width: string): SmzTableBuilder<TData> {
    if (!this._state.caption.rowSelection.isButtonVisible) {
      throw Error('You need to call \'allowUserMultiSelection\' before');
    }
    this._state.caption.rowSelection.columnWidth = width;
    return this;
  }


  public allowDefaultRowExpansion(): SmzTableBuilder<TData> {
    this._state.rowExpansion.isEnabled = true;
    this._state.rowExpansion.sincronize = true;
    this._state.rowExpansion.highlightNewItems = true;
    this._state.rowExpansion.highlightLabel = 'NOVO';
    return this;
  }

  public allowRowExpansion(label: string = 'Seleção', initialState: 'enabled' | 'disabled' = 'enabled'): SmzTableBuilder<TData> {
    this._state.rowExpansion.isEnabled = initialState === 'enabled';
    this._state.rowExpansion.isButtonVisible = true;
    this._state.rowExpansion.label = label;
    this._state.rowExpansion.columnWidth = 75;
    this._state.rowExpansion.sincronize = true;
    this._state.rowExpansion.highlightNewItems = true;
    this._state.rowExpansion.highlightLabel = 'NOVO';
    return this;
  }

  public disableRowExpansionSincronization(): SmzTableBuilder<TData> {
    if (!this._state.rowExpansion.isEnabled) {
      throw Error('You need to call \'allowDefaultRowExpansion or allowRowExpansion\' before');
    }
    this._state.rowExpansion.sincronize = false;
    return this;
  }

  public setNewItemsMessage(label: string): SmzTableBuilder<TData> {
    if (!this._state.rowExpansion.isEnabled) {
      throw Error('You need to call \'allowDefaultRowExpansion or allowRowExpansion\' before');
    }
    this._state.rowExpansion.label = label;
    return this;
  }

  public hideNewItemsMessage(): SmzTableBuilder<TData> {
    if (!this._state.rowExpansion.isEnabled) {
      throw Error('You need to call \'allowDefaultRowExpansion or allowRowExpansion\' before');
    }
    this._state.rowExpansion.highlightNewItems = false;
    return this;
  }

  public setRowExpansionCallback(callback: () => void): SmzTableBuilder<TData> {
    if (!this._state.rowExpansion.isButtonVisible) {
      throw Error('You need to call \'allowRowExpansion\' before');
    }
    this._state.rowExpansion.callback = callback;
    return this;
  }

  public setRowExpansionColumnWidth(pixels: number): SmzTableBuilder<TData> {
    if (!this._state.rowExpansion.isButtonVisible) {
      throw Error('You need to call \'allowRowExpansion\' before');
    }
    this._state.rowExpansion.columnWidth = pixels;
    return this;
  }

  public hideHeader(): SmzTableBuilder<TData> {
    this._state.header.isVisible = false;
    return this;
  }

  public setSkeletonRowsCount(rows: number): SmzTableBuilder<TData> {
    this._state.initialState.skeleton.isEnabled = true;
    this._state.initialState.skeleton.rows = rows;
    return this;
  }

  public setEmptyFeedbackMessage(message: string): SmzTableBuilder<TData> {
    this._state.emptyFeedback.message = message;
    return this;
  }

  public useTableEmptyMessage(): SmzTableBuilder<TData> {
    this._state.emptyFeedback.isFeatured = false;
    return this;
  }

  public setEmptyFeedbackExtraInfo(text: string): SmzTableBuilder<TData> {
    if (!this._state.emptyFeedback.isFeatured) {
      throw Error('This feature is not compatible with \'useTableEmptyMessage\'');
    }

    this._state.emptyFeedback.extraInfo = text;
    return this;
  }

  public addEmptyFeedbackButton(label: string, callback: () => void, icon: string = null): SmzTableBuilder<TData> {
    if (!this._state.emptyFeedback.isFeatured) {
      throw Error('This feature is not compatible with \'useTableEmptyMessage\'');
    }

    this._state.emptyFeedback.actionButtons.push({ callback, label, icon });
    return this;
  }

  public setEmptyFeedbackImage(path: string): SmzTableBuilder<TData> {
    if (!this._state.emptyFeedback.isFeatured) {
      throw Error('This feature is not compatible with \'useTableEmptyMessage\'');
    }

    this._state.emptyFeedback.image = path;
    return this;
  }

  public usePagination(): SmzTableBuilder<TData> {
    this._state.pagination.isVisible = true;
    this._state.pagination.rows = 10;
    this._state.pagination.rowsPerPageOptions = [5, 10, 25, 50, 100];
    this._state.pagination.pageReport = {
      isVisible: true,
    };
    this._state.pagination.state.rows = this._state.pagination.rows;
    return this;
  }

  public setPaginationDefaultRows(value: number): SmzTableBuilder<TData> {
    if (!this._state.pagination.isVisible) {
      throw Error('You need to call \'usePagination\' before');
    }
    this._state.pagination.rows = value;
    this._state.pagination.state.rows = value;
    return this;
  }

  public setPaginationPageOptions(value: number[]): SmzTableBuilder<TData> {
    if (!this._state.pagination.isVisible) {
      throw Error('You need to call \'usePagination\' before');
    }
    this._state.pagination.rowsPerPageOptions = value;
    return this;
  }

  public setPaginationInitialPage(page: number): SmzTableBuilder<TData> {
    if (!this._state.pagination.isVisible) {
      throw Error('You need to call \'usePagination\' before');
    }

    if (page <= 0) {
      throw Error('You need to provide a \'page number\' bigger then 0');
    }

    this._state.pagination.state.first = page - 1;
    return this;
  }

  public hidePaginationReport(): SmzTableBuilder<TData> {
    if (!this._state.pagination.isVisible) {
      throw Error('You need to call \'usePagination\' before');
    }
    this._state.pagination.pageReport.isVisible = false;
    return this;
  }

  public setPaginationReportTemplateText(template: string): SmzTableBuilder<TData> {
    if (!this._state.pagination.isVisible) {
      throw Error('You need to call \'usePagination\' before');
    }
    this._state.pagination.pageReport.template = template;
    return this;
  }

  public setInitialSorting(field: string, order: 1 | -1): SmzTableBuilder<TData> {
    this._state.sort.field = field;
    this._state.sort.order = order;
    return this;
  }

  public setCustomInitialSorting(data: { field?: string, mode?: 'single' | 'multiple', order?: 1 | -1, multiSortMeta?: { field: string, order: 1 | -1 }[] }): SmzTableBuilder<TData> {
    this._state.sort = data;
    return this;
  }

  public useStrippedStyle(): SmzTableBuilder<TData> {
    this._state.styles.striped = true;
    return this;
  }

  public useGridStyle(): SmzTableBuilder<TData> {
    this._state.styles.showGrid = true;
    return this;
  }

  public setSize(size: 'extra-small' | 'small' | 'regular' | 'large'): SmzTableBuilder<TData> {
    this._state.styles.size = size;

    switch (size) {
      case 'extra-small':
        this._state.actions.menu.styles = { icon: 'fa-solid fa-ellipsis', styleClass: 'p-button-text p-button-plain p-button-sm p-0 shadow-none hover:bg-inherit', buttonClass: 'p-0' };
        break;

      case 'small':
        this._state.actions.menu.styles = { icon: 'fa-solid fa-ellipsis', styleClass: 'p-button-text p-button-plain p-button-sm p-0 shadow-none hover:bg-inherit', buttonClass: 'p-0' };
        break;

      case 'regular':
        this._state.actions.menu.styles = { icon: 'fa-solid fa-bars', styleClass: '', buttonClass: '' };
        break;

      case 'large':
        this._state.actions.menu.styles = { icon: 'fa-solid fa-bars', styleClass: '', buttonClass: '' };
        break;
      default:
        break;
    }

    return this;
  }

  public useEstimatedColWidth(maxWidthPx?: number): SmzTableBuilder<TData> {

    if (this._state.editable.isEditable) {
      throw Error('You can\'t use \'useEstimatedColWidth\' while using \'editable Table\'');
    }

    this._state.viewport.scrollable = true;
    this._state.viewport.scrollHeight = 'flex';
    this._state.viewport.scrollDirection = 'both';

    this._state.styles.columnsWidth.estimate = true;
    this._state.styles.columnsWidth.samples = 50;
    this._state.styles.columnsWidth.behavior = 'min-width';
    this._state.styles.columnsWidth.maxWidth = maxWidthPx;

    return this;
  }

  public setEstimatedSamplesCount(samplesCount: number): SmzTableBuilder<TData> {

    if (!this._state.styles.columnsWidth.estimate) {
      throw Error('You need to call \'useEstimatedColWidth\' before');
    }

    this._state.styles.columnsWidth.samples = samplesCount;

    return this;
  }

  // public setColumnWidthBehavior(behavior: 'width' | 'min-width'): SmzTableBuilder<TData> {

  //   this._state.styles.columnsWidth.behavior = behavior;

  //   return this;
  // }

  public setEstimatedFontBase(fontBase: string): SmzTableBuilder<TData> {

    if (!this._state.styles.columnsWidth.estimate) {
      throw Error('You need to call \'useEstimatedColWidth\' before');
    }

    this._state.styles.columnsWidth.estimateFontBase = fontBase;

    return this;
  }

  public setEstimatedPadding(padding: number): SmzTableBuilder<TData> {

    if (!this._state.styles.columnsWidth.estimate) {
      throw Error('You need to call \'useEstimatedColWidth\' before');
    }

    this._state.styles.columnsWidth.estimatePadding = padding;

    return this;
  }

  public setTableStyleClass(styleClass: string): SmzTableBuilder<TData> {

    this._state.styles.tableStyleClass = styleClass;

    return this;
  }

  public reorder(...properties: string[]): SmzTableBuilder<TData> {
    this._state.columns = sortBy(this._state.columns, (c) => properties.indexOf(c.property) !== -1 ? properties.indexOf(c.property) : this._state.columns.length);
    return this;
  }

  public relabel(...operations: { property: string, header: string }[]): SmzTableBuilder<TData> {
    operations.forEach(o => {
      const column = this._state.columns.find(x => x.property === o.property);

      if (column == null) {
        throw Error(`There is no column with the property ${o.property}`);
      }

      column.header = o.header;
    });
    return this;
  }

  public resizeIgnoringCheck(...operations: { property: string, width: string }[]): SmzTableBuilder<TData> {
    operations.forEach(o => {
      const column = this._state.columns.find(x => x.property === o.property);

      if (column != null) {
        column.width = o.width;
      }

    });
    return this;
  }

  public resize(...operations: { property: string, width: string }[]): SmzTableBuilder<TData> {
    operations.forEach(o => {
      const column = this._state.columns.find(x => x.property === o.property);

      if (column == null) {
        throw Error(`There is no column with the property ${o.property}`);
      }

      column.width = o.width;
    });
    return this;
  }

  public useCustomActions(columnWidthPixels: number): SmzTableBuilder<TData> {
    this._state.actions.customActions.isVisible = true;
    this._state.actions.customActions.columnWidth += columnWidthPixels;
    return this;
  }

  public disableRowHoverEffect(): SmzTableBuilder<TData> {
    this._state.actions.rowBehavior.hoverable = false;
    return this;
  }

  public setRowClickCallback<T>(callback: (event: T) => void): SmzTableBuilder<TData> {
    this._state.actions.rowBehavior.isClickable = true;
    this._state.actions.rowBehavior.clickCallback = callback;
    return this;
  }

  public expandOnRowClick(): SmzTableBuilder<TData> {

    if (!this._state.rowExpansion.isEnabled) {
      throw Error('You need to call \'expandOnRowClick\' before calling \'expandOnRowClick\'');
    }

    this._state.actions.rowBehavior.expandRowOnClick = true;
    return this;
  }

  public setHighlightedRows(ids: string[]): SmzTableBuilder<TData> {
    this._state.actions.rowBehavior.highlights.ids = ids;
    return this;
  }

  public menu(items: SmzMenuItem[] = null): SmzMenuTableBuilder<TData, TData> {

    switch (this._state.styles.size) {
      case 'extra-small':
        this._state.actions.customActions.columnWidth += 45;
        break;

      case 'small':
        this._state.actions.customActions.columnWidth += 50;
        break;

      case 'regular':
        this._state.actions.customActions.columnWidth += 65;
        break;

      case 'large':
        this._state.actions.customActions.columnWidth += 70;
        break;

      default:
        break;
    }

    const menuBuilder = new SmzMenuTableBuilder<TData, TData>(this);

    if (items != null) {
      this._state.actions.menu.isVisible = true;
      this._state.actions.menu.items = items;
    }

    return menuBuilder;
  }

  public dynamicMenu(callback: (row: any) => SmzMenuItem[]): SmzTableBuilder<TData> {

    if (this._state.actions.menu.items != null && this._state.actions.menu.items.length > 0) {
      throw Error('You can\'t call \'dynamicMenu\' if the menu items are already set');
    }

    this._state.actions.menu.isVisible = true;
    this._state.actions.customActions.columnWidth += (this._state.styles.size === 'extra-small' || this._state.styles.size === 'small') ? 40 : 63;
    this._state.actions.menu.callback = callback;
    this._state.actions.menu.items = null;

    return this;
  }

  public batchMenu(items: SmzMenuItem[] = null): SmzBatchMenuBuilder<TData> {

    if (!this._state.caption.rowSelection.isEnabled) {
      throw Error('You need to call \'allowDefaultMultiSelection\' or \'allowUserMultiSelection\' before');
    }

    const batchMenuBuilder = new SmzBatchMenuBuilder<TData>(this);

    if (items != null) {
      this._state.actions.batchActions.isVisible = true;
      this._state.actions.batchActions.items = items;
    }

    return batchMenuBuilder;
  }

  public editable(): SmzEditableTableBuilder<TData> {

    if (this._state.editable.isEditable) {
      throw Error('You cannot call \'editable\' twice');
    }

    if (this._state.styles.columnsWidth.estimate) {
      throw Error('You can\'t use \'editable\' while using \'useEstimatedColWidth\'');
    }

    const editableBuilder = new SmzEditableTableBuilder(this);

    return editableBuilder;
  }

  public setScrollDirection(direction: 'vertical' | 'horizontal' | 'both' = 'vertical'): SmzTableBuilder<TData> {

    if (this._state.styles.columnsWidth.estimate) {
      throw Error('You can\'t use \'setScrollDirection\' while using \'useEstimatedColWidth\'');
    }

    this._state.viewport.scrollable = true;
    this._state.viewport.scrollHeight = 'flex';
    this._state.viewport.scrollDirection = direction;

    return this;
  }

  public useVerticalScrollHeight(height: string): SmzTableBuilder<TData> {

    if (this._state.styles.columnsWidth.estimate) {
      throw Error('You can\'t use \'useVerticalScrollHeight\' while using \'useEstimatedColWidth\'');
    }

    this._state.viewport.scrollable = true;
    this._state.viewport.scrollDirection = 'vertical';
    this._state.viewport.scrollHeight = height;

    return this;
  }

  // public enableResizableColumns(mode: 'fit' | 'expand' = 'fit'): SmzTableBuilder<TData> {

  //   if (!this._state.viewport.scrollable) {
  //     throw Error('You need to call \'useScrolling\' before');
  //   }

  //   this._state.viewport.resizableColumns = true;
  //   this._state.viewport.columnResizeMode = mode;

  //   return this;
  // }

  public debugMode(): SmzTableBuilder<TData> {
    this._state.isDebug = true;
    return this;
  }

  public columns(): SmzColumnCollectionBuilder<TData> {
    return new SmzColumnCollectionBuilder<TData>(this);
  }

  public viewport(): SmzTableViewportBuilder<TData> {
    return new SmzTableViewportBuilder<TData>(this);
  }

  public excel(): SmzTableExcelBuilder<TData> {
    return new SmzTableExcelBuilder<TData>(this);
  }

  public build(): SmzTableState {

    this._state.columns.forEach(col => {

      // Caso o modo de persistencia esteja ligado e já exista um state salvo no storage
      if (this._state.viewport.state.persistance !== 'none' && this._state.viewport.state.data != null) {

        const viewportColumn = this._state.viewport.state.data.visibility.find(x => x.key === col.property);

        if (viewportColumn != null) {
          // Aplicar visibilidade do storage na coluna
          col.isVisible = viewportColumn.isVisible;
        }
      }

      col.content.ngStyle = applyTableContentNgStyle(this._state, null, col.width);

      if (this._state.isDebug) {
        col.headerStyleClass = col.headerStyleClass + ' border border-1 border-red-300';
      }

      if (this._state.viewport.scrollable && col.width?.includes('%')) {
        throw Error('You cannot set any column width with percentage while using scrollable table.');
      }

    });

    const selectionWidth = this._state.caption.rowSelection.columnWidth;
    this._state.caption.rowSelection.ngStyle = applyTableContentNgStyle(this._state, null, selectionWidth);

    const customWidth = this._state.actions.customActions.columnWidth;
    const minWidth = this._state.actions.menu.minWidth;

    if (this._state.actions.menu.behavior === 'inline') {
      // Configurar a coluna de actions para automática para comportar o tamanho dos botões em linha

      // Ajuste de largura da coluna de botões customizáveis
      this._state.actions.customActions.ngStyle = applyTableContentNgStyle(this._state, null, minWidth);
      this._state.actions.batchActions.ngStyle = applyTableContentNgStyle(this._state, null, minWidth);

      // Ajuste de largura da coluna de botões editáveis
      this._state.editable.ngStyle = applyTableContentNgStyle(this._state, null, minWidth);
    }
    else if (this._state.actions.menu.behavior === 'overlay') {
      // Configurar a coluna de actions para ocupar o espaço do botão toggle do menu
      this._state.actions.customActions.ngStyle = applyTableContentNgStyle(this._state, customWidth, minWidth);
      this._state.actions.batchActions.ngStyle = applyTableContentNgStyle(this._state, customWidth, minWidth);

      // Ajuste de largura da coluna de botões editáveis
      this._state.editable.ngStyle = applyTableContentNgStyle(this._state, customWidth, minWidth);
    }

    // Ajuste de largura da coluna do botão expansor de linhas
    const expansionWidth = this._state.rowExpansion.columnWidth;
    this._state.rowExpansion.ngStyle = applyTableContentNgStyle(this._state, expansionWidth, null);

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
  else {
    if (state.isDebug) console.log(5);
    minWidth = sizeStyle;
    width = sizeStyle;
    maxWidth = sizeStyle;
  }

  switch (behavior) {
    case 'min-width':
      return { 'min-width': minWidth, 'width': width, 'max-width': maxWidth };

    case 'width':
      return { 'width': width, 'max-width': maxWidth };
  }

}