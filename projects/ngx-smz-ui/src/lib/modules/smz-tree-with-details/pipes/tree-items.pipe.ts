import { Pipe, PipeTransform } from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';

@Pipe({
  name: 'treeItems'
})

export class TreeItemsPipe implements PipeTransform {
  transform(tree: TreeNode[], selectableTypes: string[], allowAllNodesToBeClicked: boolean): TreeNode[] {

    if (tree == null)
      return null;

    tree.forEach(node => {
      const selectable = allowAllNodesToBeClicked ? undefined :
        (selectableTypes.some(x => x === node.type) ? true : false);
      node.selectable = selectable;

      if (node.children != null) {
        this.resolveNodes(node.children, selectableTypes, allowAllNodesToBeClicked);
      }
    })

    return tree;
  }

  private resolveNodes(nodes: TreeNode[], selectableTypes: string[], allowAllNodesToBeClicked: boolean): void {
    nodes.forEach(node => {
      const selectable = allowAllNodesToBeClicked ? null :
        (selectableTypes.some(x => x === node.type) ? true : false);
      node.selectable = selectable;

      if (node.children != null) {
        this.resolveNodes(node.children, selectableTypes, allowAllNodesToBeClicked);
      }
    })
  }
}