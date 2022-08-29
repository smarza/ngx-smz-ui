import { TreeNode } from 'primeng/api/treenode';
import { SmzTreeGroup, SmzTreeGroupNodeConfig } from '../../modules/smz-trees/models/tree-state';
import { arrayToTreeNode, arrayToTreeNodeWithRoot, groupTreeNode } from '../common/utils';
import { SmzTreeBuilder } from './tree-builder';

export class SmzDataSourceTreeBuilder {
  constructor(private _treeBuilder: SmzTreeBuilder) {

  }

  public grouping(data: SmzTreeGroup): SmzDataSourceTreeBuilder {
    this._treeBuilder._state.content.dataTransform = (items: any[]) => {
      const root = groupTreeNode(items, data.endNode, data.group);
      return root;
    }
    return this;
  }

  public flat(keyPropertyValue: string, labelProperty: string, overrides: Partial<TreeNode<any>> = {}): SmzDataSourceTreeBuilder {
    this._treeBuilder._state.content.dataTransform = (items: any[]) => {
      const root = arrayToTreeNode(items, {
        keyPropertyValue,
        labelProperty,
        type: 'item',
        nodeOverrides: overrides,
      });
      return root;
    }
    return this;
  }

  public flatWithRoot(rootName: string, keyPropertyValue: string, labelProperty: string, rootOverrides: Partial<TreeNode<any>> = {}, itemOverrides: Partial<TreeNode<any>> = {}): SmzDataSourceTreeBuilder {
    this._treeBuilder._state.content.dataTransform = (items: any[]) => {
      const root = arrayToTreeNodeWithRoot(items, {
        keyPropertyValue,
        labelProperty,
        type: 'item',
        nodeOverrides: itemOverrides,
      }
      , rootName, rootOverrides);
      return root;
    }
    return this;
  }


  public get tree(): SmzTreeBuilder {
    return this._treeBuilder;
  }

}