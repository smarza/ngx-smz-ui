import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { SmzTreeState } from '../../smz-trees/models/tree-state';

export interface SmzTreeWithDetailsState {
  items$: Observable<TreeNode[]>;
  treeState: SmzTreeState;
  typesWithDetails: string[];
  selectedNode?: TreeNode;
}