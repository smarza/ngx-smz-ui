import { TreeNode } from 'primeng/api/treenode';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { ParentEntity } from '../../common/models/simple-named-entity';

export class SmzTreeNodeUtilityBuilder<TBuilder> extends SmzBuilderUtilities<SmzTreeNodeUtilityBuilder<TBuilder>> {
  protected that = this;
  private isParent = false;

  constructor(private _builder: TBuilder, private _parentData: ParentEntity<string, TreeNode>[], private _treeNodes: TreeNode[]) {
    super();

    if (this._parentData == null && this._treeNodes == null) {
      throw Error("You can't have a tree utilities without having a parent data nor a tree node data (See: SmzTreeNodeUtilityBuilder)");
    }

    if (_parentData != null) {
      this.isParent = true;
    }

  }

  public enableSelectionForAllType(): SmzTreeNodeUtilityBuilder<TBuilder> {
    this._treeNodes?.forEach(node => setSelectableByType(node, null, true));
    this._parentData?.forEach(parentData => parentData.data?.forEach(node => setSelectableByType(node, null, true)));
    return this.that;
  }

  public disableSelectionForAllType(): SmzTreeNodeUtilityBuilder<TBuilder> {
    this._treeNodes?.forEach(node => setSelectableByType(node, null, false));
    this._parentData?.forEach(parentData => parentData.data?.forEach(node => setSelectableByType(node, null, false)));
    return this.that;
  }

  public enableSelectionForType(type: string): SmzTreeNodeUtilityBuilder<TBuilder> {
    this._treeNodes?.forEach(node => setSelectableByType(node, type, true));
    this._parentData?.forEach(parentData => parentData.data?.forEach(node => setSelectableByType(node, type, true)));
    return this.that;
  }

  public disableSelectionForType(type: string): SmzTreeNodeUtilityBuilder<TBuilder> {
    this._treeNodes?.forEach(node => setSelectableByType(node, type, false));
    this._parentData?.forEach(parentData => parentData.data?.forEach(node => setSelectableByType(node, type, false)));
    return this.that;
  }

  public get tree(): TBuilder {
    return this._builder;
  }

}

function setSelectableByType(node: TreeNode, type: string, selectable: boolean): void {
  if (type == null || node.type === type) {
      node.selectable = selectable;
  }

  node.children?.forEach(child => setSelectableByType(child, type, selectable));
}