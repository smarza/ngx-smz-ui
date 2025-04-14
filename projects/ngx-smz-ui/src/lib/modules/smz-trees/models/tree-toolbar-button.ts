import { SmzTreeNode } from './tree-node';

export interface SmzTreeToolbarButton {
  label?: string;
  icon?: string;
  callback?: (event: MouseEvent, tree: SmzTreeNode[], nodes?: SmzTreeNode[]) => void;
  color?: 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger';
  tooltip?: string;
}