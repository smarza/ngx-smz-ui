import { SmzTreeNode } from './tree-node';


export interface SmzTreeDragEvent {
  originalEvent: DragEvent;
  dragNode: SmzTreeNode;
  dropNode: SmzTreeNode;
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
  dragNode: SmzTreeNode;
  dropNode: SmzTreeNode;
  dropIndex: number;
  originalEvent: any;
  dropPlace: string;
}