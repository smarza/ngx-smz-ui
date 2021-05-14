import { Pipe, PipeTransform } from '@angular/core';
import { SmzTableContext } from '../models/table-state';
import { cloneDeep } from 'lodash-es';

@Pipe({
  name: 'cloneTableItems'
})

export class SmzCloneTableItemsPipe implements PipeTransform {
  transform(items: any[], context: SmzTableContext): { showSkeleton: boolean, items: any[] } {
    const showSkeleton = items == null && context.state.initialState.skeleton.isEnabled;

    const clonedItems = showSkeleton ? new Array<any>(context.state.initialState.skeleton.rows) : cloneDeep(items);

    return {
      showSkeleton,
      items: clonedItems
    };
  }
}