import { cloneDeep } from 'lodash-es';
import groupBy from 'lodash-es/groupBy';
import mapValues from 'lodash-es/mapValues';
import { TreeNode } from 'primeng/api/treenode';
import { ObjectUtils } from 'primeng/utils';
import { SimpleEntity, SimpleNamedEntity, SimpleParentEntity } from '../../common/models/simple-named-entity';
import { SmzTreeNode } from '../../modules/smz-trees/models/tree-node';
import { SmzTreeGroupData, SmzTreeGroupNodeConfig, SmzTreeNestedData } from '../../modules/smz-trees/models/tree-state';
import { FormGroupConfig } from '../smz-dialogs/dialog-input-conversion';
import { cloneAndRemoveProperties, toSimpleNamedEntity } from '../../common/utils/utils';

/*
    Checks if a string is null, undefined or empty
*/
export function isEmpty(str: string): boolean {
  return (!str || 0 === str.length);
}

function fixStringDate(originalDate: string): Date {
  const epochDate = Date.parse(originalDate);
  return new Date(epochDate);
}

function fixEpochDate(epochData: number): Date {
  if (epochData > 99999999999) { // timestamp miliseconds
      return new Date(epochData);
  }
  else { // timestamp seconds
      return new Date(epochData * 1000);
  }
}

export function fixDate(date: FormGroupConfig): Date {
  if (date == null) return null;

  if (typeof date === 'string') {
      return fixStringDate(date);
  }
  else if (typeof date === 'number') {
      return fixEpochDate(date);
  }
  else {
      throw new Error('fixDate(): unsuported date format.');
  }
}

export function groupTreeNode(items: any[], endNode: SmzTreeGroupNodeConfig, group: SmzTreeGroupData): SmzTreeNode[] {

  const result: SmzTreeNode[] = [];

  if (group == null) {

    items.forEach(item => {
      const node: SmzTreeNode = {
        ...group.nodeOverrides,
        type: group.type,
        label:  ObjectUtils.resolveFieldData(item, endNode.labelProperty),
        key: ObjectUtils.resolveFieldData(item, endNode.keyPropertyValue),
        data:  item,
        children: [],
      };

      result.push(node as any);
    });

    return result;

  }

  const grouped = groupBy(items, (i) => {
    return ObjectUtils.resolveFieldData(i, group.keyPropertyValue);
  });

  mapValues(grouped, uniques =>
  {
      const unique = cloneDeep(uniques[0]);

      const node: SmzTreeNode = {
          ...group.nodeOverrides,
          type: group.type,
          label: ObjectUtils.resolveFieldData(unique, group.labelProperty),
          key:  ObjectUtils.resolveFieldData(unique, group.keyPropertyValue),
          data:  ObjectUtils.resolveFieldData(unique, group.keyPropertyData),
          children: group.group != null ?
            groupTreeNode(uniques, endNode, group.group) :
            uniques.map((x => ({
              ...endNode.nodeOverrides,
              type: endNode.type,
              label:  ObjectUtils.resolveFieldData(x, endNode.labelProperty),
              key: ObjectUtils.resolveFieldData(x, endNode.keyPropertyValue),
              data: x,
              children: null
            }))),
      };

      result.push(node as any);
  });

  // console.log('result', result);

  return result;
}

export function createTreeFromNestedData<T = any>(data: T[], config: SmzTreeNestedData): SmzTreeNode<SimpleNamedEntity>[] {

  function createTreeNodes(items: T[], nodeConfig: SmzTreeNestedData): TreeNode<SimpleNamedEntity>[] {
    if (items == null || nodeConfig == null) {
      return [];
    }

    return items.map(item => {

      if (nodeConfig.children == null) {
        console.warn(nodeConfig);
        throw new Error('createTreeFromNestedData(): You cannot provide an children null.');
      }

      const children: TreeNode<SimpleNamedEntity>[] = [];

      nodeConfig.children.forEach(child => {

        if (child.group.makeChildrenAsGroup) {
          const childKey = ObjectUtils.resolveFieldData(item, child.group.key);

          const childData = createTreeData(item, child, nodeConfig);

          children.push({
            ...child.group.nodeOverrides,
            label: child.group.label,
            key: childKey,
            data: childData,
            type: child.group.type,
            children: createTreeNodes(ObjectUtils.resolveFieldData(item, child.key) || [], child),
          });
        }
        else {
          children.push(...createTreeNodes(ObjectUtils.resolveFieldData(item, child.key) || [], child));
        }

      });

      const label = ObjectUtils.resolveFieldData(item, nodeConfig.labelKey);
      const key = ObjectUtils.resolveFieldData(item, nodeConfig.valueKey);

      const data = createTreeData(item, nodeConfig, nodeConfig);

      return {
        ...nodeConfig.nodeOverrides,
        label,
        key,
        data,
        type: nodeConfig.type,
        children,
      };

    });
  }

  const treeNodes = createTreeNodes(data, config);

  return treeNodes;

}

function createTreeData(item: any, nodeConfig: SmzTreeNestedData, parentConfig: SmzTreeNestedData): any {

  switch (nodeConfig.dataType) {
    case 'simpleNamedEntity':
      return toSimpleNamedEntity(item, nodeConfig.group.key, nodeConfig.group.label);

    case 'same':
      return item;

    case 'clean':
      return cloneAndRemoveProperties(item, parentConfig.children.map(x => x.key));

    default:
      break;
  }
}


export function groupSimpleParentEntity<TInput extends { parentId: TResponse, data: SimpleEntity<TResponse> }, TResponse>(items: TInput[]): SimpleParentEntity<TResponse>[] {

  const keyPropertyValue = 'parentId';
  const result: SimpleParentEntity<TResponse>[] = [];

  const grouped = groupBy(items, (i) => {
    return ObjectUtils.resolveFieldData(i, keyPropertyValue);
  });

  mapValues(grouped, uniques =>
  {
      const unique = cloneDeep(uniques[0]);

      const item: SimpleParentEntity<TResponse> = {
          parentId: unique.parentId,
          data: uniques.map(x => x.data)
      };

      result.push(item);
  });

  // console.log('result', result);

  return result;
}

export function arrayToTreeNodeWithRoot(items: any[], endNode: SmzTreeGroupNodeConfig, rootName: string, overrides: Partial<TreeNode<any>> = {}): SmzTreeNode[] {

  const rootNode = {
    ...overrides,
    type: 'root',
    label:  rootName,
    key: 'root',
    data:  null,
    children: [],
  };

  const result: SmzTreeNode[] = [rootNode];

  items.forEach(item => {
    const node: SmzTreeNode = {
      ...endNode.nodeOverrides,
      type: endNode.type,
      label:  ObjectUtils.resolveFieldData(item, endNode.labelProperty),
      key: ObjectUtils.resolveFieldData(item, endNode.keyPropertyValue),
      data:  item,
      children: null,
    };

    rootNode.children.push(node as any);
  });

  return result;
}

export function arrayToTreeNode(items: any[], endNode: SmzTreeGroupNodeConfig): SmzTreeNode[] {

const result: SmzTreeNode[] = [];

items.forEach(item => {
  const node: SmzTreeNode = {
    ...endNode.nodeOverrides,
    type: endNode.type,
    label:  ObjectUtils.resolveFieldData(item, endNode.labelProperty),
    key: ObjectUtils.resolveFieldData(item, endNode.keyPropertyValue),
    data:  item,
    children: null,
  };

  result.push(node as any);
});

return result;
}