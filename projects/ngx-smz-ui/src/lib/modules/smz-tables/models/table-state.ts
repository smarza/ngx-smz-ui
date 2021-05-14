import { SmzMenuItem } from "./conditional-menu-item";
import { SmzTableColumn, SmzTableContextColumn } from "./table-column";

export interface SmzTableState {
  actions?: {
    menu?: {
      isVisible: boolean;
      items: SmzMenuItem[];
    };

    customActions?: {
      isVisible: boolean;
      columnWidth: string;
    };

    rowBehavior?: {
      isClickable?: boolean;
      clickCallback?: (event) => void;
      hoverable?: boolean;
    };
  };
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
     *
     */
    toolbarAlignment?: "start" | "end";
    /**
     * Allows the end user to manually filter which columns are visible or not
     */
    columnVisibility?: {
      /**
       * Controls the visibility of the inputs for this feature
       */
      showButton: boolean;
    };
    /**
     * Options for the global filter
     */
    globalFilter?: {
      /**
       * Controsl wheter the global filter is visible or not
       */
      isVisible: boolean;
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
  columns: SmzTableColumn[];
  /**
   * Controls the behavior of the empty feedback
   */
  emptyMessage?: {
    /**
     * Message displayed when the table has no data, if no other properties
     * are set in this object, only a text message is displayed.
     */
    message?: string;
    callbackLabel?: string;
    callbackInfo?: string;
    callback?: () => void;
    image?: string;
  };
  pagination?: {
    isVisible?: boolean;
    rows?: number;
    rowsPerPageOptions?: number[];
    pageReport?: {
      template?: string;
      isVisible?: boolean;
    }
  };

  sort?: {
    field?: string;
    mode?: "single" | "multiple";
    order?: 1 | -1;
    multiSortMeta?: { field: string; order: 1 | -1 }[];
  };
}

export interface SmzTableContext {
  columns: SmzTableContextColumn[];
  state: SmzTableState;
  globalFilter: string[];
}