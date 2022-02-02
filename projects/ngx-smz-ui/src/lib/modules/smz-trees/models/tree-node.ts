import { TreeNode } from 'primeng/api';

export interface SmzTreeNode<T = any> extends TreeNode<T>{
  isNew?: boolean;
  children?: SmzTreeNode<T>[];
}