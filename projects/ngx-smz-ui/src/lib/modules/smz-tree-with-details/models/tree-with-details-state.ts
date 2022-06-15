import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { SmzTreeState } from '../../smz-trees/models/tree-state';

export interface SmzTreeWithDetailsState {
  items$: Observable<TreeNode[]>;
  tree: {
    state: SmzTreeState;
    styleClass: string;
    selectableTypes: string[];
    allowAllNodesToBeClicked: boolean;
  }

  context: {
    selectedNode: TreeNode;
  }
}