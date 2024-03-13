import { TreeNode } from 'primeng/api/treenode';
import { SmzTreeGroup, SmzTreeSourceTransform } from '../../modules/smz-trees/models/tree-state';
import { arrayToTreeNode, arrayToTreeNodeWithRoot, groupTreeNode } from '../common/utils';
import { SmzNestedDataSourceTreeBuilder } from './nested-data-source-tree-builder';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzPropertyBasedDataSourceTreeBuilder } from './property-based-data-source-tree-builder';

export class SmzDataSourceTreeBuilder<TBuilder> extends SmzBuilderUtilities<SmzDataSourceTreeBuilder<TBuilder>> {
  protected that = this;

  constructor(private _builder: TBuilder, private _content: SmzTreeSourceTransform) {
    super();
  }

  public grouping(data: SmzTreeGroup): SmzDataSourceTreeBuilder<TBuilder> {
    this._content.dataTransform = (items: any[]) => {
      const root = groupTreeNode(items, data.endNode, data.group);
      return root;
    }
    return this.that;
  }

  public flat(keyPropertyValue: string, labelProperty: string, overrides: Partial<TreeNode<any>> = {}): SmzDataSourceTreeBuilder<TBuilder> {
    this._content.dataTransform = (items: any[]) => {
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

  public flatWithRoot(rootName: string, keyPropertyValue: string, labelProperty: string, rootOverrides: Partial<TreeNode<any>> = {}, itemOverrides: Partial<TreeNode<any>> = {}): SmzDataSourceTreeBuilder<TBuilder> {
    this._content.dataTransform = (items: any[]) => {
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

  public nested(type: string): SmzNestedDataSourceTreeBuilder<TBuilder> {
    return new SmzNestedDataSourceTreeBuilder<TBuilder>(this._content, this, type);
  }

  public propertyBased(): SmzPropertyBasedDataSourceTreeBuilder<TBuilder> {
    return new SmzPropertyBasedDataSourceTreeBuilder<TBuilder>(this._content, this);
  }

  public get tree(): TBuilder {
    return this._builder;
  }

}