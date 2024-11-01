import { TreeNode } from 'primeng/api';
import { SmzTreeMenuItem } from './tree-menu-item';
import { SmzTreeToolbarButton } from './tree-toolbar-button';
import { SmzTreeNode } from './tree-node';
import { SmzTreeDynamicMenuBuilder } from '../../../builders/smz-trees/tree-builder';

export interface SmzTreeState {
  isDebug?: boolean;
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
        expandLabel?: string,
        collapseLabel?: string
      };
      nodeExpandButtons?: {
        isVisible?: boolean,
        expandLabel?: string,
        collapseLabel?: string,
        expandTooltip?: string,
        collapseTooltip?: string,
        disabledTooltip?: string
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
     * Controls the behavior of the menu
     */
    behavior: 'context-menu' | 'row-menu';
    /**
     * Controls the types that the menu will be shown
     * When using Dynamic Items, this property needs to be set manually
     */
    uniqueTypes: string[];
    /**
     * Controls the icon of the row menu
     */
    rowMenuIcon?: string;
    /**
     * Controls the severity of the row menu icon
     */
    rowMenuIconSeverity?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger';
    /**
     * Items for the popup menu
     */
    items: SmzTreeMenuItem[];
    /**
     * Gets the dynamic items for the row menu
     */
    getDynamicItems: (_: SmzTreeDynamicMenuBuilder, node: SmzTreeNode<unknown>) => SmzTreeMenuItem[];
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
      callback?: (event?: MouseEvent) => void;
    }
    image?: string;

    isFeatured: boolean;
  };
  selection?: {
    mode?: 'single' | 'multiple' | 'checkbox';
    propagateUp?: boolean;
    propagateDown?: boolean;
    expandNodes?: boolean;
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
    styleClass: string;
  }
  dragAndDrop?: {
    draggable?: boolean;
    droppable?: boolean;
    validateDrop?: boolean;
    configuration?: { dragType: string, dropType: string }[];
  }
  content: SmzTreeSourceTransform;
}

export interface SmzTreeSourceTransform {
  sincronize: boolean;
  dataTransform?: (items: any[]) => SmzTreeNode<any>[];
}

export interface SmzTreeContext {
  state: SmzTreeState;
}

// GROUPS

export interface SmzTreeGroup {
  endNode: SmzTreeGroupNodeConfig;
  group: SmzTreeGroupData;
}

export interface SmzTreeGroupNodeConfig {
  keyPropertyValue: string;
  labelProperty: string;
  type: string;
  nodeOverrides: Partial<TreeNode>;
}

export interface SmzTreeGroupData extends SmzTreeGroupNodeConfig {
  keyPropertyData: string;
  group: SmzTreeGroupData;
}


// NESTED

export interface SmzTreeNestedData{
  key?: string;
  labelKey: string;
  valueKey: string;
  type: string;
  nodeOverridesConfig: SmzTreeOverridesConfig;
  group: {
    makeChildrenAsGroup: boolean;
    label: string;
    key: string;
    type: string;
    nodeOverridesConfig: SmzTreeOverridesConfig;
  };
  dataType: 'simpleNamedEntity' | 'same' | 'clean';
  children?: SmzTreeNestedData[];
}

export interface SmzTreeOverridesConfig {
  nodeOverrides: Partial<TreeNode>;
  conditionalSelection: (item: any) => boolean;
}