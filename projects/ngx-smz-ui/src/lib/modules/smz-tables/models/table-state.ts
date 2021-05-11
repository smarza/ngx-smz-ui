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
  caption?: {
    isVisible?: boolean;
    title?: string;
    toolbarAlignment?: "start" | "end";
    columnVisibility?: {
      showButton: boolean;
    };
    globalFilter?: {
      isVisible: boolean;
    };
    clearFilters?: {
      isButtonVisible?: boolean;
      label?: string;
      callback?: () => void;
    };
    rowSelection: {
      isButtonVisible: boolean;
      label?: string;
      columnWidth?: string;
      callback?: () => void;
      isEnabled: boolean;
    };
  };
  columns: SmzTableColumn[];
  emptyMessage?: {
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