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
    this.selectNodes(this.nodes, this.primeSelection, this.selectedKeys);
    return this.primeSelection;
  }

  private selectNodes(tree: SmzTreeNode[], checkedNodes: SmzTreeNode[], keys: string[]) {
    for (const node of tree) {
      if (node.key != null) {
        if (keys.includes(node.key) || (node.parent && checkedNodes.includes(node.parent))) {
          checkedNodes.push(node);
        }
      }

      if (node.children) {
        this.selectNodes(node.children, checkedNodes, keys);
      }
      this.partialCheckNodes(checkedNodes, node);
    }
  }

  private partialCheckNodes(checkedNodes: SmzTreeNode[], node: SmzTreeNode) {
    if (node.children) {
      let count = node.children.length;
      let c = 0;
      for (const childNode of node.children) {
        if (checkedNodes.includes(childNode)) {
          c++;
        }
        if (childNode.partialSelected) {
          node.partialSelected = true;
          node.expanded = true;
        }
      }
      if (c != 0) {
        if (c == count) {
          node.partialSelected = false;
          if (!checkedNodes.includes(node)) {
            checkedNodes.push(node);
          }
        } else {
          node.partialSelected = true;
          node.expanded = true;
        }
      }
    }
  }
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