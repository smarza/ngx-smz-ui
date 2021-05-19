import { TreeNode } from 'primeng/api';

export function synchronizeTrees(destinationTree: TreeNode, sourceTree: TreeNode): void {
  destinationTree.expanded = sourceTree.expanded;

  if (destinationTree.children != null && sourceTree.children != null) {
    for (const destinationChild of destinationTree.children) {
      const souorceChild = sourceTree.children.find(x => x.key === destinationChild.key);

      if (souorceChild != null) {
        synchronizeTrees(destinationChild, souorceChild);
      }
    }
  }
}