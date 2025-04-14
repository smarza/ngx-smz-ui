import { TreeNode } from 'primeng/api';

export interface SmzTreeNode<TNodeData = unknown> extends TreeNode {
  isNew?: boolean;
  data?: TNodeData;
  children?: SmzTreeNode<TNodeData>[];
}