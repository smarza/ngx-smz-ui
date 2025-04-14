import { SimpleNamedEntity } from '@ngx-smz/core';
import { TreeNode } from 'primeng/api';

export interface DemoTreeNode extends TreeNode {
  notes?: string;
  data?: any;
  children?: DemoTreeNode[];
  demoType?: 'dialog' | 'form' | 'table' | 'chart' | 'document' | 'tree' | 'menu' | 'icons' | 'comments' | 'cards' | 'timeline' | 'ui-guide' | 'multi-tables' | 'dynamic';
}

export interface DemoItem {
  id: string;
  name: string;
  company: string;
  country: SimpleNamedEntity;
  html?: string;
  roles?: SimpleNamedEntity[];
  price?: number;
  date?: Date;
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

export interface Plant {
  id: string;
  name: string;
  modules: Module[];
}

export interface Module {
  id: string;
  name: string;
  sectors: Sector[];
}

export interface Sector {
  id: string;
  name: string;
}