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

  public resetStylesClassForAllTypes(): SmzTreeNodeUtilityBuilder<TBuilder> {
    this._treeNodes?.forEach(node => updateTreeNodeProperty(node, null, 'styleClass', ''));
    this._parentData?.forEach(parentData => parentData.data?.forEach(node => updateTreeNodeProperty(node, null, 'styleClass', '')));
    return this.that;
  }

  public addToolTipForAllTypes(message: string): SmzTreeNodeUtilityBuilder<TBuilder> {
    this._treeNodes?.forEach(node => updateTreeNodeProperty(node, null, 'tooltip', message));
    this._parentData?.forEach(parentData => parentData.data?.forEach(node => updateTreeNodeProperty(node, null, 'tooltip', message)));
    return this.that;
  }

  public addToolTip(type: string, message: string): SmzTreeNodeUtilityBuilder<TBuilder> {
    this._treeNodes?.forEach(node => updateTreeNodeProperty(node, type, 'tooltip', message));
    this._parentData?.forEach(parentData => parentData.data?.forEach(node => updateTreeNodeProperty(node, type, 'tooltip', message)));
    return this.that;
  }

  public enableSelectionForAllTypes(applyStyles?: boolean): SmzTreeNodeUtilityBuilder<TBuilder> {
    return this.enableSelection(null, applyStyles);
  }

  public disableSelectionForAllTypes(applyStyles?: boolean): SmzTreeNodeUtilityBuilder<TBuilder> {
    return this.disableSelection(null, applyStyles);
  }

  public enableSelection(type: string, applyStyles?: boolean): SmzTreeNodeUtilityBuilder<TBuilder> {
    this._treeNodes?.forEach(node => {

      updateTreeNodeProperty(node, type, 'selectable', true);

      if (applyStyles) {
        updateTreeNodeProperty(node, type, 'styleClass', 'selectable-treenode');
      }

    });

    this._parentData?.forEach(parentData => parentData.data?.forEach(node => {

      updateTreeNodeProperty(node, type, 'selectable', true);

      if (applyStyles) {
        updateTreeNodeProperty(node, type, 'styleClass', 'selectable-treenode');
      }

      }
    ));

    return this.that;
  }

  public conditionalSelection(callback: (node: TreeNode) => boolean | undefined, applyStyles?: boolean): SmzTreeNodeUtilityBuilder<TBuilder> {

    function applyToNodeAndChildren(node) {
      const selectable = callback(node);

      if (selectable != undefined) {
        if (selectable) {
          updateTreeNodeProperty(node, null, 'selectable', true);

          if (applyStyles) {
            updateTreeNodeProperty(node, null, 'styleClass', 'selectable-treenode');
          }
        }
        else {
          updateTreeNodeProperty(node, null, 'selectable', false);

          if (applyStyles) {
            updateTreeNodeProperty(node, null, 'styleClass', 'not-selectable-treenode');
          }
        }
      }

      if (node.children && node.children.length > 0) {
        node.children.forEach(childNode =>
          applyToNodeAndChildren(childNode));
      }
    }

    this._treeNodes?.forEach(node => {
      applyToNodeAndChildren(node);
    });

    this._parentData?.forEach(parentData => parentData.data?.forEach(node => {
      applyToNodeAndChildren(node);
    }));

    return this.that;
  }

  public forEach(callback: (node: TreeNode) => void): SmzTreeNodeUtilityBuilder<TBuilder> {

    function applyToNodeAndChildren(node) {
      callback(node)

      if (node.children && node.children.length > 0) {
        node.children.forEach(childNode =>
          applyToNodeAndChildren(childNode));
      }
    }

    this._treeNodes?.forEach(node => {
      applyToNodeAndChildren(node);
    });

    this._parentData?.forEach(parentData => parentData.data?.forEach(node => {
      applyToNodeAndChildren(node);
    }));

    return this.that;
  }

  public disableSelection(type: string, applyStyles?: boolean): SmzTreeNodeUtilityBuilder<TBuilder> {
    this._treeNodes?.forEach(node => {

      updateTreeNodeProperty(node, type, 'selectable', false);

      if (applyStyles) {
        updateTreeNodeProperty(node, type, 'styleClass', 'not-selectable-treenode');
      }

    });

    this._parentData?.forEach(parentData => parentData.data?.forEach(node => {

      updateTreeNodeProperty(node, type, 'selectable', false);

      if (applyStyles) {
        updateTreeNodeProperty(node, type, 'styleClass', 'not-selectable-treenode');
      }

      }
    ));

    return this.that;
  }

  public addStylesClass(type: string, styleClass: string): SmzTreeNodeUtilityBuilder<TBuilder> {
    this._treeNodes?.forEach(node => updateTreeNodeProperty(node, type, 'styleClass', styleClass));
    this._parentData?.forEach(parentData => parentData.data?.forEach(node => updateTreeNodeProperty(node, type, 'styleClass', styleClass)));
    return this.that;
  }

  public expandAll(): SmzTreeNodeUtilityBuilder<TBuilder> {
    this._treeNodes?.forEach(node => updateTreeNodeProperty(node, null, 'expand', true));
    this._parentData?.forEach(parentData => parentData.data?.forEach(node => updateTreeNodeProperty(node, null, 'expand', true)));
    return this.that;
  }

  public collapseAll(): SmzTreeNodeUtilityBuilder<TBuilder> {
    this._treeNodes?.forEach(node => updateTreeNodeProperty(node, null, 'expand', false));
    this._parentData?.forEach(parentData => parentData.data?.forEach(node => updateTreeNodeProperty(node, null, 'expand', false)));
    return this.that;
  }

  public expand(type: string): SmzTreeNodeUtilityBuilder<TBuilder> {
    this._treeNodes?.forEach(node => updateTreeNodeProperty(node, type, 'expand', true));
    this._parentData?.forEach(parentData => parentData.data?.forEach(node => updateTreeNodeProperty(node, type, 'expand', true)));
    return this.that;
  }

  public collapse(type: string): SmzTreeNodeUtilityBuilder<TBuilder> {
    this._treeNodes?.forEach(node => updateTreeNodeProperty(node, type, 'expand', false));
    this._parentData?.forEach(parentData => parentData.data?.forEach(node => updateTreeNodeProperty(node, type, 'expand', false)));
    return this.that;
  }

  public get tree(): TBuilder {
    return this._builder;
  }

}

function updateTreeNodeProperty(node: TreeNode, targetType: string, propertyName: string, newValue: any): void {
  // Verifica se o tipo do nodo atual corresponde ao tipo alvo
  if (targetType == null || node.type === targetType) {
      // Se sim, atualiza a propriedade desejada com o novo valor
      node[propertyName] = newValue;
  }

  // Se o nodo atual tem filhos, continua a busca recursivamente
  if (node.children && node.children.length > 0) {
      node.children.forEach(childNode =>
          updateTreeNodeProperty(childNode, targetType, propertyName, newValue));
  }
}