import { Pipe, PipeTransform } from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';
import { SmzTreeWithDetailsState } from '../models/tree-with-details-state';

@Pipe({
  name: 'treeItems'
})

export class TreeItemsPipe implements PipeTransform {
  transform(tree: TreeNode[], state: SmzTreeWithDetailsState): TreeNode[] {

    const keys: string[] = [];

    if (tree == null)
      return null;

    tree.forEach(node => {
      const selectable = state.tree.allowAllNodesToBeClicked ? undefined :
        (state.tree.selectableTypes.some(x => x === node.type) ? true : false);

      node.selectable = selectable;

      keys.push(node.key);

      if (node.children != null) {
        this.resolveNodes(node.children, state, keys);
      }
    })

    if (state.context.selectedNode != null && !keys.includes(state.context.selectedNode.key)) {
      state.context.selectedNode = null;
    }

    return tree;
  }

  private resolveNodes(nodes: TreeNode[], state: SmzTreeWithDetailsState, keys: string[]): void {
    nodes.forEach(node => {
      const selectable = state.tree.allowAllNodesToBeClicked ? null :
        (state.tree.selectableTypes.some(x => x === node.type) ? true : false);

      node.selectable = selectable;

      keys.push(node.key);

      if (node.children != null) {
        this.resolveNodes(node.children, state, keys);
      }
    })
  }
}