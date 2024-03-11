import { SmzTreeNode } from './tree-node';
import { SmzTreeState } from './tree-state';

export class SmzNodeHelper {
  private keyProperty: string = 'key';
  private selectedKeys: string[];
  private primeSelection: SmzTreeNode[] = [];

  constructor(private state: SmzTreeState, private nodes: SmzTreeNode[]) {
  }

  public setDefaultKeyProperty(property: string): SmzNodeHelper {
    this.keyProperty = property;
    return this;
  }

  public select(selectedKeys: string[]): SmzTreeNode[] {
    this.selectedKeys = selectedKeys;
    this.primeSelection = resolveTreeNodeSelectionIncludingParent(this.nodes, selectedKeys, this.state.selection.expandNodes);
    // checkNode(this.state, this.keyProperty, this.primeSelection, this.nodes, this.selectedKeys);
    return this.primeSelection;
  }

}

export function resolveTreeNodeSelectionIncludingParent(nodes: SmzTreeNode[], selectedKeys: string[], expandNodes: boolean): SmzTreeNode[] {
  const result: SmzTreeNode[] = [];

  function traverse(node: SmzTreeNode): boolean {
    let allChildrenFullySelected = node.children ? true : false;
    let anyChildSelected = false;

    if (node.children) {
        for (const child of node.children) {
            child.parent = node; // setting parent for traversal
            const isChildSelected = traverse(child);
            if (!isChildSelected) {
                allChildrenFullySelected = false;
            } else {
                anyChildSelected = true;
            }
        }
    }

    if (selectedKeys.includes(node.key!)) {
        result.push(node);
        return true;
    }

    if (anyChildSelected) {
        node.expanded = expandNodes;
        node.partialSelected = !allChildrenFullySelected;
        result.push(node);
        return allChildrenFullySelected; // Return the status of full selection for the current node's children
    }

    return false;
}

  for (const node of nodes) {
      traverse(node);
  }

  return result;
}

export function resolveTreeNodeSelection(nodes: SmzTreeNode[], selectedKeys: string[], expandNodes: boolean): SmzTreeNode[] {
  const result: SmzTreeNode[] = [];

  function traverse(node: SmzTreeNode): boolean {
      let isSelected = selectedKeys.includes(node.key!); // Check if the current node is selected

      if (node.children) {
          let childrenSelected = false; // Flag to check if any child is selected

          for (const child of node.children) {
              child.parent = node; // setting parent for traversal
              if (traverse(child)) {
                  childrenSelected = true;
              }
          }

          if (childrenSelected && expandNodes) {
              node.expanded = true; // Only expand if children are selected and expansion is required
          }
      }

      // Include the node only if it's explicitly selected
      if (isSelected) {
          result.push(node);
          return true;
      }

      return false;
  }

  for (const node of nodes) {
      traverse(node);
  }

  return result;
}


function checkNode(state: SmzTreeState, keyProperty: string, primeSelection: SmzTreeNode[], nodes: SmzTreeNode[], str: string[]) {

  nodes.forEach(node => {
    //check parent
    if (str.includes(node[keyProperty])) {
      primeSelection.push(node);
    }

    if (node.children != undefined) {
      node.children.forEach(child => {
        //check child if the parent is not selected
        if (str.includes(child[keyProperty]) && !str.includes(node[keyProperty])) {
          node.partialSelected = true;
          node.expanded = state.selection.expandNodes;
          child.parent = node;
        }

        //check the child if the parent is selected
        //push the parent in str to new iteration and mark all the childs
        if (str.includes(node[keyProperty])) {
          child.parent = node;
          str.push(child[keyProperty]);
        }
      });
    }
    else {
      return;
    }

    checkNode(state, keyProperty, primeSelection, node.children, str);

    node.children.forEach(child => {
      if (child.partialSelected) {
        node.partialSelected = true;
        node.expanded = state.selection.expandNodes;
      }
    });
  });
}

