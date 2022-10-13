import { SimpleNamedEntity } from 'ngx-smz-ui';
import { TreeNode } from 'primeng/api/treenode';

export interface DemoTreeNode extends TreeNode {
  notes?: string;
  data?: any;
  children?: DemoTreeNode[];
  demoType?: 'dialog' | 'form' | 'table' | 'chart' | 'document' | 'tree' | 'menu' | 'icons' | 'comments' | 'cards' | 'timeline';
}

export interface DemoItem {
  id: string;
  name: string;
  company: string;
  country: SimpleNamedEntity;
  html?: string;
  roles?: SimpleNamedEntity[];
  price?: number;
}

export interface DemoUpdateData {
  id: string;
  name: string;
  company: string;
  countryId: string;
}

export interface DemoCreationData {
  name: string;
  company: string;
  countryId: string;

}