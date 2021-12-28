import { SmzMenuItem } from '../../smz-menu/models/smz-menu-item';
import { EditableChanges } from './editable-model';
import { SmzTableColumn, SmzTableContextColumn } from "./table-column";

export interface SmzTableState {
  /**
   * Custom actions
   */
  actions?: {
    /**
     * Configuration of the popup menu of the rows
     */
    menu?: {
      /**
       * Controls the visibility of the button menu of the rows
       */
      isVisible: boolean;
      /**
       * Items for the popup menu
       */
      items: SmzMenuItem[];
    };

    /**
     * Configuration of the actions for multiselection
     */
    batchActions?: {
      /**
       * Controls the visibility of the button menu of the rows
       */
      isVisible: boolean;
      /**
       * Items for the buttons
       */
      items: SmzMenuItem[];
    };

    /**
     * Custom actions for all rows
     */
    customActions?: {
      /**
       * Controls the visibility of the custom action buttons
       */
      isVisible: boolean;
      /**
       * Width of pixels the column containing the custom actions
       */
      columnWidth: number;
    };

    /**
     * Interaction behaviors for the rows
     */
    rowBehavior?: {
      /**
       * Controls if the rows are clickable or not
       */
      isClickable?: boolean;
      /**
       * Callback to be executed when the row is clicked
       */
      clickCallback?: (event) => void;
      /**
       * Controls hover effect on the rows
       */
      hoverable?: boolean;
      /**
       * Highlight a row based on the item id
       */
      highlights?: { ids: string[] };
    };
  };

  /**
   * Configuration of the actions to dispatch editable saves
   */
  editable?: {
    isEditable: boolean,
    update: {
      isButtonVisible: boolean;
      isButtonDisabled: boolean;
      accessClaim: string;
    },
    creation: {
      isButtonVisible: boolean;
      isButtonDisabled: boolean;
      buttonLabel: string;
      accessClaim: string;
    },
    remove: {
      isButtonVisible: boolean;
      isButtonDisabled: boolean;
      accessClaim: string;
      overrideActionDataCallback: (row: any) => any
    },
    actions: {
      update: any,
      creation: any,
      remove: any,
    },
    mapResults: (data: any, change: EditableChanges<any>) => any
  }

  /**
   * Behavior of everything that is hosted in the caption area of the table
   */
  caption?: {
    /**
     * Controls de visibility of the entire caption area
     */
    isVisible?: boolean;
    /**
     * Text of the title presented in the caption area
     */
    title?: string;
    /**
     * Defines if the toolbar is aligned to the left or to the right
     */
    toolbarAlignment?: "start" | "end";
    /**
     * Allows the end user to manually filter which columns are visible or not
     */
    columnVisibility?: {
      /**
       * Controls the visibility of the inputs for this feature
       */
      showDropdownSelector: boolean;
      /**
       * Individual buttons that controls the visibility of each column
       */
      showColumnHideButton: boolean;
    };
    /**
     * Options for the global filter
     */
    globalFilter?: {
      /**
       * Control whether the global filter is visible or not
       */
      isVisible: boolean;
      /**
       * If true the input will expand to 100% of the width table
       */
      expanded: boolean;
      /**
       * The input search placeholder
       */
       placeholder: string;
    };
    /**
     * Allows the end user to manually clear table filters
     */
    clearFilters?: {
      /**
       * Controls whether the clear filter button should be visible or not
       */
      isButtonVisible?: boolean;
      /**
       * Label of the button
       */
      label?: string;
      /**
       * callback to be called when the Clear Filter button is clicked
       */
      callback?: () => void;
    };
    /**
     * Allows the user to control the behavior of the row selection
     */
    rowSelection: {
      /**
       * Controls the visibility of the button that alternates between
       * no selection and multi selection
       */
      isButtonVisible: boolean;
      /**
       * Label of the button
       */
      label?: string;
      /**
       * Width of the column that will host the checkboxes for each row,
       * indicating which isones are selected
       */
      columnWidth?: string;
      /**
       * This callback is executed when you enable/disable the selection
       * This can be used, for instance, in the case you want to open a
       * side bar when the multi selection is activated
       */
      callback?: () => void;
      /**
       * Controls whether the multi selection is enabled or not
       * Use this when you want to control this through the code instead
       * of letting the user activate it with the dedicated button
       */
      isEnabled: boolean;
    };
  };

  /**
   * Behavior of everything that is hosted in the caption area of the table
   */
  header?: {
    /**
     * Controls de visibility of the header area
     */
    isVisible?: boolean;
  };

  columns: SmzTableColumn[];

  /**
   * Behavior of the initial state of the table
   */
  initialState?: {
    /**
     * Setup behavior when the data is still not loaded, i.e. the `items`
     * property is null. This is different from the case when there is no
     * data to display, i.e. the data came as an empty array from the API
     */
    skeleton?: {
      /**
       * enables or disables the skeleton behavior
       */
      isEnabled?: boolean;
      /**
       * How many rows to display in while in the skeleton state
       */
      rows?: number;
    };
  };

  /**
  * Viewport Behavior of the table
  */
  viewport?: {
    /**
    * when specifies, enables horizontal and/or vertical scrolling.
    */
    scrollable: boolean;
    /**
     * height of the scroll viewport in fixed pixels or the "flex" keyword for a dynamic size.
     */
    scrollHeight: 'flex' | string;
    /**
    * when enabled, columns can be resized using drag and drop.
    */
    resizableColumns: boolean;
    /**
    * defines whether the overall table width should change on column resize, valid values are "fit" and "expand".
    */
    columnResizeMode: 'fit' | 'expand';
  }

  /**
   * Behavior of the empty feedback
   */
  emptyFeedback?: {
    /**
     * Message displayed when the table has no data
     */
    isFeatured?: boolean;
    /**
     * Message displayed when the table has no data
     */
    message?: string;
    /**
     * Extra information to be shown below the main message
     */
    extraInfo?: string;
    /**
     * Controls the behavior the opnional action button. If nothing
     * is specified, no button is shown
     */
    actionButtons?: {
      /**
       * Button label
       */
      label: string;
      /**
       * Button Icon
       */
      icon?: string;
      /**
       * Callback to be executed on the button is clicked
       */
      callback: () => void;
    }[]
    image?: string;
  };

  /**
   * Behavior the pagination of the table
   */
  pagination?: {
    /**
     * If the pagination area is visible or not
     */
    isVisible?: boolean;
    /**
     * How many rows of data will be displayed in the table by default
     */
    rows?: number;
    /**
     * Options to be displayed in the page size dropdown
     */
    rowsPerPageOptions?: number[];
    /**
     * Configurations for the page report summary, that displays the current
     * page number, maximum number of the pages, and so on
     */
    pageReport?: {
      /**
       * Text template, i.e: Showing items {first} to {last} from a total of {totalRecords}
       */
      template?: string;
      /**
       * Controls whether the summary is visible or not
       */
      isVisible?: boolean;
    },
    /**
     * Controls the current pagination state
     */
    state: { first: number, rows: number }
  };

  /**
   * Sorting behavior of the table
   */
  sort?: {
    /**
     *
     */
    field?: string;
    /**
     *
     */
    mode?: "single" | "multiple";
    /**
     *
     */
    order?: 1 | -1;
    /**
     *
     */
    multiSortMeta?: { field: string; order: 1 | -1 }[];
  };

  /**
   * Styles of the table
   */
  styles?: {
    /**
     * Use striped to add zebra-striping to the row's styles
     */
    striped?: boolean;
    /**
     * Use showGrid to add borders between cells
     */
    showGrid?: boolean;
    /**
     * Use size to specify the size and spacing between rows
     */
    size?: 'small' | 'regular' | 'large';
    /**
     * Use columnsWidth to estimate the columns width automatically based on the items samples.
     */
    columnsWidth?: {
      estimate: boolean;
      samples: number;
    };
  },
  /**
   * Settings for Frozen Columns
   */
  frozen?: {
    /**
     * Enables the hability to lock the frozen columns
     * Each column has to be configurated as frozen
     * All frozen columns will be arranged on the left part of the table
     */
    isEnabled?: boolean;
    /**
     * Set the frozen column width
     */
    width?: string;
  };
    /**
   * Allows the user to expand a row to show some content
   */
  rowExpansion: {
    /**
     * Controls the visibility of the button that expand or collapse the row content
     */
    isButtonVisible: boolean;
    /**
     * Label of the button
     */
    label?: string;
    /**
     * Width of the column that will host the toggle button
     */
    columnWidth?: string;
    /**
     * This callback is executed when you expand/collapse the row
     * This can be used, for instance, in the case you want to proccess some data
     */
    callback?: () => void;
    /**
     * Controls whether the toggle is enabled or not
     * Use this when you want to control this through the code instead
     * of letting the user activate it with the dedicated button
     */
    isEnabled: boolean;
  };

}

export interface SmzTableContext {
  columns: SmzTableContextColumn[];
  hideableColumns: SmzTableContextColumn[];
  visibleColumns: SmzTableContextColumn[];
  frozenColumns: SmzTableContextColumn[];
  state: SmzTableState;
  globalFilter: string[];
}