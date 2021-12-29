import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';
import { cloneDeep } from 'lodash';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { AuthenticationActions } from '../../../state/global/authentication/authentication.actions';

@Injectable({providedIn: 'root'})
export class TreeHelperService {
  public trees: { [key: string]: TreeNode[] } = {};
  constructor(private actions$: Actions, private store: Store) {
    this.actions$.pipe(ofActionSuccessful(AuthenticationActions.RemoteLoginSuccess)).subscribe(() => {
      this.trees = {};
    });

    this.actions$.pipe(ofActionSuccessful(AuthenticationActions.LocalLoginSuccess)).subscribe(() => {
      this.trees = {};
    });
  }

  private add(key: string, tree: TreeNode[]): void {
    this.trees[key] = tree;
  }

  public clear(key: string): void {
    delete this.trees[key];
  }

  public sincronize(key: string, result: TreeNode[]): TreeNode[] {

    if (this.trees[key] == null) {
      this.add(key, result);
      return this.trees[key];
    }
    else {
      const resultCloned = cloneDeep(result);
      synchronizeTrees(resultCloned, this.trees[key]);
      this.trees[key] = resultCloned;
      return this.trees[key];
    }
  }

}

export function synchronizeTrees(destinationTree: TreeNode[], sourceTree: TreeNode[]): void {
  for (const treeNode of destinationTree) {
    const geminiNode = sourceTree.find(x => x.key === treeNode.key);
    if (geminiNode != null) {
      synchronizeNodes(treeNode, geminiNode);
    }
  }
}

export function synchronizeNodes(destinationNode: TreeNode, sourceNode: TreeNode): void {
  destinationNode.expanded = sourceNode.expanded;

  if (destinationNode.children != null && sourceNode.children != null) {
    for (const destinationChild of destinationNode.children) {
      const sourceChild = sourceNode.children.find(x => x.key === destinationChild.key);
      if (sourceChild != null) {
        synchronizeNodes(destinationChild, sourceChild);
      }
    }
  }
}