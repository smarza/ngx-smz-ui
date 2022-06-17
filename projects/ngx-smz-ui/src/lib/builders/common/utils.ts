import { cloneDeep } from 'lodash-es';
import groupBy from 'lodash-es/groupBy';
import mapValues from 'lodash-es/mapValues';
import { ObjectUtils } from 'primeng/utils';
import { SmzTreeNode } from '../../modules/smz-trees/models/tree-node';
import { SmzTreeGroup, SmzTreeGroupData, SmzTreeGroupNodeConfig } from '../../modules/smz-trees/models/tree-state';
import { FormGroupConfig } from '../smz-dialogs/dialog-input-conversion';

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

export function groupTreeNode(items: any[], endNode: SmzTreeGroupNodeConfig, data: SmzTreeGroupData): SmzTreeNode[] {

  const result: SmzTreeNode[] = [];

  const grouped = groupBy(items, (i) => {
    return ObjectUtils.resolveFieldData(i, data.keyPropertyValue);
  });

  mapValues(grouped, uniques =>
  {
      const unique = cloneDeep(uniques[0]);

      const node: SmzTreeNode = {
          ...data.nodeOverrides,
          type: data.type,
          label: ObjectUtils.resolveFieldData(unique, data.labelProperty),
          key:  ObjectUtils.resolveFieldData(unique, data.keyPropertyValue),
          data:  ObjectUtils.resolveFieldData(unique, data.keyPropertyData),
          children: data.group != null ?
            groupTreeNode(uniques, endNode, data.group) :
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
