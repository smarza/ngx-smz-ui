import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { AuthenticationActions } from '../../../state/global/authentication/authentication.actions';
import { SmzTreeNode } from '../models/tree-node';

@Injectable({providedIn: 'root'})
export class TreeHelperService {
  public trees: { [key: string]: SmzTreeNode[] } = {};
  constructor(private actions$: Actions, private store: Store) {
    this.actions$.pipe(ofActionSuccessful(AuthenticationActions.RemoteLoginSuccess)).subscribe(() => {
      this.trees = {};
    });

    this.actions$.pipe(ofActionSuccessful(AuthenticationActions.LocalLoginSuccess)).subscribe(() => {
      this.trees = {};
    });
  }

  private add(key: string, tree: SmzTreeNode[]): void {
    this.trees[key] = tree;
  }

  public clear(key: string): void {
    delete this.trees[key];
  }

  public sincronize(key: string, result: SmzTreeNode[]): SmzTreeNode[] {

    if (this.trees[key] == null) {
      this.add(key, result);
    }
    else {
      const resultCloned = cloneDeep(result);

      synchronizeTrees(resultCloned, this.trees[key]);
      this.trees[key] = resultCloned;
    }

    return this.trees[key];
  }

}

export function synchronizeTrees(destinationTree: SmzTreeNode[], sourceTree: SmzTreeNode[]): void {

  for (const treeNode of destinationTree) {
    const geminiNode = sourceTree.find(x => x.key === treeNode.key);
    if (geminiNode != null) {
      treeNode.isNew = false;
      synchronizeNodes(treeNode, geminiNode);
    }
    else {
      treeNode.isNew = true;
    }
  }
}

export function synchronizeNodes(destinationNode: SmzTreeNode, sourceNode: SmzTreeNode): void {
  destinationNode.expanded = sourceNode.expanded;

  if (destinationNode.children != null && sourceNode.children != null) {
    for (const destinationChild of destinationNode.children) {
      const sourceChild = sourceNode.children.find(x => x.key === destinationChild.key);
      if (sourceChild != null) {
        destinationChild.isNew = false;
        synchronizeNodes(destinationChild, sourceChild);
      }
      else {
        destinationChild.isNew = true;
      }
    }
  }
}