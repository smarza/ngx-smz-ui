import { MenuItem, TreeNode } from 'primeng/api';

export interface SmzTreeMenuItem {
  unallowedTypes?: string[];
  allowedTypes?: string[];
  label?: string;
  icon?: string;
  callback?: (node?: TreeNode) => void;
  redirect?: string[];
  items?: MenuItem[];
  disabled?: boolean;
  visible?: boolean;
  separator?: boolean;
  tooltip?: string;
}