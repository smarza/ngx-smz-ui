import { TreeNode } from 'primeng/api';
import { SmzMenuItem } from '../../smz-tables/models/conditional-menu-item';
import { SmzTreeMenuItem } from './tree-menu-item';
import { SmzTreeToolbarButton } from './tree-toolbar-button';

export interface SmzTreeState {
  header?: {
    isVisible?: boolean;
    title?: string,
    toolbar?: {
      isVisible?: boolean,
      alignment?: 'start' | 'end';
      source?: 'state' | 'template';
      buttonType?: 'rounded-outlined' | 'rounded-filled' | 'rounded-borderless' | 'square-outlined' | 'square-filled' | 'square-borderless';
      treeExpandButtons?: {
        isVisible?: boolean,
        expandLabel?: string;
        collapseLabel?: string;
      };
      nodeExpandButtons?: {
        isVisible?: boolean,
        expandLabel?: string;
        collapseLabel?: string;
      };
      items?: SmzTreeToolbarButton[]
    }
  };
  footer?: {
    isVisible?: boolean;
  };
  menu?: {
    /**
     * Controls the visibility of the button menu of the rows
     */
    isVisible: boolean;
    /**
     * Items for the popup menu
     */
    items: SmzTreeMenuItem[];
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
  selection?: {
    mode?: 'single' | 'multiple' | 'checkbox';
    propagateUp?: boolean;
    propagateDown?: boolean;
  }
  loading?: {
    isLoading?: boolean;
    icon?: string;
  }
  filter?: {
    show?: boolean;
    mode?: 'lenient' | 'strict';
    filterBy?: string[];
    textPlaceholder?: string;
  }
  dragAndDrop?: {
    draggable?: boolean;
    droppable?: boolean;
    validateDrop?: boolean;
    configuration?: { dragType: string, dropType: string }[];
  }
}

export interface SmzTreeContext {
  state: SmzTreeState;
}