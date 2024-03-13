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
    rootType: 'root',
    includeData: false,
    nodes: []
  };
  constructor(private _content: SmzTreeSourceTransform, private _dataSourceBuilder: SmzDataSourceTreeBuilder<TBuilder>) {
    super();
  }

  public setRootType(type: string): SmzPropertyBasedDataSourceTreeBuilder<TBuilder> {
    this._config.rootType = type;
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
    this._config.nodes.push({ property, type });
    return this.that;
  }

  public get dataSource(): SmzDataSourceTreeBuilder<TBuilder> {

    if (this._config != null) {

      this._content.dataTransform = (items: any[]) => {

        // Mapeia cada item do array para um TreeNode usando createTreeFromPropertyBasedConfig
        const trees = items.map(item => createTreeFromPropertyBasedConfig(item, this._config)).filter(tree => tree !== null);

        return trees.length > 0 ? trees : [];
      }
    }

    return this._dataSourceBuilder;
  }

}

function createTreeFromPropertyBasedConfig(item: any, config: SmzTreePropertyBasedConfig): TreeNode | null {
  if (!item || typeof item !== 'object') return null; // Garante que o item é um objeto

  const rootNode: TreeNode = { label: item[config.labelProperty] ?? 'Unknown', type: config.rootType, key: item[config.keyProperty], data: config.includeData ? item : undefined, children: [] };

  // Processa cada configuração de nó para adicionar crianças diretamente sem agrupá-las por tipo
  config.nodes.forEach(({ property, type }) => {
    const propertyValue = item[property];
    if (Array.isArray(propertyValue)) {
      // Para cada item na propriedade, cria um novo nó
      propertyValue.forEach(subItem => {
        const childNode = buildNode(subItem, property, type, config); // Aqui usamos property ao invés de type para construir o nó
        if (childNode) {
          rootNode.children?.push(childNode); // Adiciona o nó filho diretamente ao rootNode
        }
      });
    }
  });

  return rootNode;
}

function buildNode(item: any, property: string, type: string, config: SmzTreePropertyBasedConfig): TreeNode | null {
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
  config.nodes.forEach(configItem => {
    const items = item[configItem.property];
    if (Array.isArray(items)) {
      items.forEach(subItem => {
        const childNode = buildNode(subItem, configItem.property, configItem.type, config);
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
  rootType: string;
  includeData: boolean;
  nodes: {
    property: string;
    type: string;
  }[]
}