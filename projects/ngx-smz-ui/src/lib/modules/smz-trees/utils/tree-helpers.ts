import { TreeNode } from 'primeng/api';

export namespace TreeHelpers {
  export function synchronizeTrees(destinationTrees: TreeNode[], sourceTrees: TreeNode[]): void {
    for (const destinationTree of destinationTrees) {
      const sourceRoot = sourceTrees.find(x => x.key === destinationTree.key)
      if (sourceRoot != null) {
        destinationTree.expanded = sourceRoot.expanded;

        if (destinationTree.children != null && sourceRoot.children != null) {
          for (const destinationChild of destinationTree.children) {
            const sourceChild = sourceRoot.children.find(x => x.key === destinationChild.key);

            if (sourceChild != null) {
              this.synchronizeTrees([destinationChild], [sourceChild]);
            }
          }
        }
      }
    }
  }
}