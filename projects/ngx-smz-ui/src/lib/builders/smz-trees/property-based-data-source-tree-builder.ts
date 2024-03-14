import { SmzTreeSourceTransform } from '../../modules/smz-trees/models/tree-state';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzDataSourceTreeBuilder } from './data-source-tree-builder';
import { TreeNode } from 'primeng/api';
import { ObjectUtils } from 'primeng/utils';

export class SmzPropertyBasedDataSourceTreeBuilder<TBuilder> extends SmzBuilderUtilities<SmzPropertyBasedDataSourceTreeBuilder<TBuilder>> {
  protected that = this;
  private _config: SmzTreePropertyBasedConfig = {
    labelProperty: 'name',
    keyProperty: 'id',
    includeData: false,
    nodes: [{ property: null, type: 'root', getTypeCallback: null }]
  };
  constructor(private _content: SmzTreeSourceTransform, private _dataSourceBuilder: SmzDataSourceTreeBuilder<TBuilder>) {
    super();
  }

  public addRootRelation(type: string): SmzPropertyBasedDataSourceTreeBuilder<TBuilder> {
    this._config.nodes.find(x => x.property == null).type = type;
    return this.that;
  }

  public setLabelProperty(property: string): SmzPropertyBasedDataSourceTreeBuilder<TBuilder> {
    this._config.labelProperty = property;
    return this.that;
  }

  public setKeyProperty(property: string): SmzPropertyBasedDataSourceTreeBuilder<TBuilder> {
    this._config.keyProperty = property;
    return this.that;
  }

  public includeData(): SmzPropertyBasedDataSourceTreeBuilder<TBuilder> {
    this._config.includeData = true;
    return this.that;
  }

  public addRelation(property: string, type: string): SmzPropertyBasedDataSourceTreeBuilder<TBuilder> {

    if (this._config.nodes.some(x => x.property === property)) {
      throw Error("You can't call addRelation for a property already with relation set.");
    }

    this._config.nodes.push({ property, type, getTypeCallback: null });
    return this.that;
  }

  public addConditionalRootRelation<TNodeData>(getTypeCallback: (node: TNodeData) => string): SmzPropertyBasedDataSourceTreeBuilder<TBuilder> {

    const rootConfig = this._config.nodes.find(x => x.property == null);

    if (rootConfig.getTypeCallback != null) {
      throw Error("You can't apply a Conditional Relation more than once to the Root Node.");
    }

    rootConfig.type = null;
    rootConfig.getTypeCallback = getTypeCallback;

    return this.that;
  }

  public addConditionalRelation<TNodeData>(property: string, getTypeCallback: (node: TNodeData) => string, alsoApplyToRoot: boolean = false): SmzPropertyBasedDataSourceTreeBuilder<TBuilder> {

    if (this._config.nodes.some(x => x.property === property)) {
      throw Error("You can't call addConditionalRelation for a property already with relation set.");
    }

    this._config.nodes.push({ property, type: null, getTypeCallback });

    if (alsoApplyToRoot) {

      const rootConfig = this._config.nodes.find(x => x.property == null);

      if (rootConfig.getTypeCallback != null) {
        throw Error("You can't apply a Conditional Relation more than once to the Root Node.");
      }

      rootConfig.getTypeCallback = getTypeCallback;

    }

    return this.that;
  }

  public get dataSource(): SmzDataSourceTreeBuilder<TBuilder> {

    if (this._config != null) {

      this._content.dataTransform = (options: any[]) => {

        // Mapeia cada item do array para um TreeNode usando createTreeFromPropertyBasedConfig
        const trees = options.map(item => createTreeFromPropertyBasedConfig(item, this._config)).filter(tree => tree !== null);

        return trees.length > 0 ? trees : [];
      }
    }

    return this._dataSourceBuilder;
  }

}

function createTreeFromPropertyBasedConfig(item: any, config: SmzTreePropertyBasedConfig): TreeNode | null {
  if (!item || typeof item !== 'object') return null; // Garante que o item é um objeto

  let rootNode: TreeNode = {};

  const rootNodeConfig = config.nodes.find(x => x.property == null);

  if (rootNodeConfig.getTypeCallback != null) {
      rootNode = { label: item[config.labelProperty] ?? 'Unknown', type: rootNodeConfig.getTypeCallback(item), key: item[config.keyProperty], data: config.includeData ? item : undefined, children: [] };
  }
  else {
    rootNode = { label: item[config.labelProperty] ?? 'Unknown', type: rootNodeConfig.type, key: item[config.keyProperty], data: config.includeData ? item : undefined, children: [] };
  }

  // Processa cada configuração de nó para adicionar crianças diretamente sem agrupá-las por tipo
  config.nodes
    .filter(x => x.property != null)
    .forEach(({ property, type, getTypeCallback }) => {
      const propertyValue = item[property];
      if (Array.isArray(propertyValue)) {
        // Para cada item na propriedade, cria um novo nó
        propertyValue.forEach(subItem => {

          let childNode: TreeNode<any> = null;

          if (getTypeCallback != null) {
            childNode = buildNode(subItem, getTypeCallback(subItem), config); // Aqui usamos property ao invés de type para construir o nó
          }
          else if (type != null) {
            childNode = buildNode(subItem, type, config); // Aqui usamos property ao invés de type para construir o nó
          }

          if (childNode) {
            rootNode.children?.push(childNode); // Adiciona o nó filho diretamente ao rootNode
          }
        });
    }
  });

  return rootNode;
}

function buildNode(item: any, type: string, config: SmzTreePropertyBasedConfig): TreeNode | null {
  if (!item || typeof item !== 'object') return null;

  // Cria um novo TreeNode sem levar em conta o type, apenas usa a labelProperty para o rótulo
  const node: TreeNode = {
    label: item[config.labelProperty] ?? 'Unknown',
    data: config.includeData ? item : undefined,
    type,
    key: item[config.keyProperty] ?? 'Unknown',
    children: [],
  };

  // Verifica se há mais filhos a serem adicionados com base na configuração
  config.nodes
    .filter(x => x.property != null)
    .forEach(configItem => {
      const items = item[configItem.property];
      if (Array.isArray(items)) {
        items.forEach(subItem => {

          let childNode: TreeNode<any> = null;

          if (configItem.getTypeCallback != null) {
            childNode = buildNode(subItem, configItem.getTypeCallback(subItem), config);
          }
          else if (type != null) {
            childNode = buildNode(subItem, configItem.type, config);
          }

          if (childNode) {
            node.children?.push(childNode);
          }
        });
      }
    });

  return node;
}

export interface SmzTreePropertyBasedConfig {
  labelProperty: string;
  keyProperty: string;
  includeData: boolean;
  nodes: {
    property: string;
    type: string;
    getTypeCallback: (node: TreeNode) => string
  }[]
}