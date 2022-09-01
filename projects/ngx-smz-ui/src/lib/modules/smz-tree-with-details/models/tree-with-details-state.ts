import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { SmzTreeState } from '../../smz-trees/models/tree-state';

export interface SmzTreeWithDetailsState {
  items$: Observable<TreeNode[]> | any;
  tree: {
    state: SmzTreeState;
    styleClass: string;
    selectableTypes: string[];
    allowAllNodesToBeClicked: boolean;
  }

  context: {
    selectedNode: TreeNode;
  }

  behavior: {
    emitDetailsAfterCycle: boolean;
  }
  styleClass: {
    content: string;
  }
}