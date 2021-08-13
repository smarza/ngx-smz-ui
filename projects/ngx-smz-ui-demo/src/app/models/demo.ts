import { SimpleNamedEntity } from 'ngx-smz-ui';
import { TreeNode } from 'primeng/api/treenode';

export interface DemoTreeNode extends TreeNode {
  notes?: string;
  data?: () => void;
  children?: DemoTreeNode[];

}

export interface DemoItem {
  id: string;
  name: string;
  company: string;
  country: SimpleNamedEntity;
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