import { TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';

export interface SmzTreeToolbarButton {
  label?: string;
  icon?: string;
  callback?: (event: MouseEvent, tree: TreeNode[], node?: TreeNode) => void;
  color?: 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger';
  tooltip?: string;
}