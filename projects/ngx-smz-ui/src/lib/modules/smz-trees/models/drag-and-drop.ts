import { TreeNode } from 'primeng/api';

export interface SmzTreeDragEvent {
  originalEvent: DragEvent;
  dragNode: TreeNode;
  dropNode: TreeNode;
  dropIndex: number;
  index: number;
}

export interface SmzTreeDragNode {
  id: string;
  type: string;
}

export interface SmzTreeDragResult {
  isAllowed: boolean;
  operationType: string;
  dragNode: TreeNode;
  dropNode: TreeNode;
  dropIndex: number;
  originalEvent: any;
  dropPlace: string;
}