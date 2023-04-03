import { TreeNode } from 'primeng/api/treenode';
import { SmzTreeGroup, SmzTreeNestedData } from '../../modules/smz-trees/models/tree-state';
import { arrayToTreeNode, arrayToTreeNodeWithRoot, createTreeFromNestedData, groupTreeNode } from '../common/utils';
import { SmzTreeBuilder } from './tree-builder';
import { last } from 'lodash-es';

export class SmzDataSourceTreeBuilder {

  private _nestedConfig: SmzTreeNestedData = null;
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

  public nested(config: SmzTreeNestedData): SmzDataSourceTreeBuilder {
    this._treeBuilder._state.content.dataTransform = (items: any[]) => {
      const root = createTreeFromNestedData(items, config);
      return root;
    }

    return this;
  }

  public addRoot(type: string, nodeOverrides: Partial<TreeNode> = {}): SmzDataSourceTreeBuilder {

    if (this._nestedConfig == null) {
      this._nestedConfig = {
        type,
        labelKey: 'name',
        valueKey: 'id',
        nodeOverrides: nodeOverrides,
        children: null
      };
    }
    else {

    }

    return this;
  }

  public addChildren(type: string, key: string, nodeOverrides: Partial<TreeNode> = {}): SmzDataSourceTreeBuilder {

    if (this._nestedConfig == null) {
      throw new Error(`You need to call addRoot() before calling addChildren().`);
    }

    let lastParent = this._nestedConfig;
    let found = false;

    do {
      if (lastParent.children == null) {
        found = true;
      }
      else {
        lastParent = lastParent.children;
      }

    } while (!found);

    lastParent.children = {
      key,
      type,
      labelKey: 'name',
      valueKey: 'id',
      nodeOverrides: nodeOverrides,
      children: null
    };

    return this;
  }


  public get tree(): SmzTreeBuilder {

    if (this._nestedConfig != null) {
      this._treeBuilder._state.content.dataTransform = (items: any[]) => {
        const root = createTreeFromNestedData(items, this._nestedConfig);
        return root;
      }
    }

    return this._treeBuilder;
  }

}