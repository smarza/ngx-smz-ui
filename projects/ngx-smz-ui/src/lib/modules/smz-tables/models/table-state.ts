import { SmzMenuItem } from "./conditional-menu-item";
import { EditableChangeTrack } from './editable-model';
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
    update:{
      isButtonVisible: boolean;
    };
    creation: {
      isButtonVisible: boolean;
      buttonLabel: string;
    };
    remove:{
      isButtonVisible: boolean;
    };
    dispatchs: {
      updateAction: any,
      creationAction: any,
      mapResults: (data: any, change: EditableChangeTrack<any>) => any
    };
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
   * Behavior of the initial state of the table
   */
  initialState?:{
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
   * Behavior of the empty feedback
   */
  emptyFeedback?: {
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
    actionButton?: {
      /**
       * Button label
       */
      label?: string;
      /**
       * Callback to be executed on the button is clicked
       */
      callback?: () => void;
    }
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
    }
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
    striped?: boolean
  }
}

export interface SmzTableContext {
  columns: SmzTableContextColumn[];
  state: SmzTableState;
  globalFilter: string[];
}