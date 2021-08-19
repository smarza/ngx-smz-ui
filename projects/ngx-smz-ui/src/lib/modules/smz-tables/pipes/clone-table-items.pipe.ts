import { Pipe, PipeTransform } from '@angular/core';
import { SmzTableContext } from '../models/table-state';
import { cloneDeep } from 'lodash-es';
import { SmzFilterType } from '../models/filter-types';

@Pipe({
  name: 'cloneTableItems'
})

export class SmzCloneTableItemsPipe implements PipeTransform {
  transform(items: any[], context: SmzTableContext): { showSkeleton: boolean, items: any[] } {
    const showSkeleton = items == null && context.state.initialState.skeleton.isEnabled;
    const clonedItems = showSkeleton ? new Array<any>(context.state.initialState.skeleton.rows) : cloneDeep(items);

    // console.log('context from items', context);

    if (context.state.styles.columnsWidth?.estimate) {

      // console.log('estimating');

      if (items != null && items.length > 0) {
        context.columns.forEach(col => {
          const estimativeWidth = this.estimateColumnWidth(items, col.field, context.state.styles.columnsWidth.samples, context.state.caption.columnVisibility.showDropdownSelector, context.state.caption.columnVisibility.showColumnHideButton, col.isOrderable, col.filter?.type !== SmzFilterType.NONE);
          // console.log(`${col.field} => ${estimativeWidth}`);
          col.width = estimativeWidth;

          const visibleColumnsIndex = context.visibleColumns.findIndex(x => x.field === col.field);
          if (visibleColumnsIndex !== -1) {
            context.visibleColumns[visibleColumnsIndex].width = estimativeWidth;
          }
        });

        // console.log('estimated', context.columns.map(x => `${x.field} => ${x.width}`));
      }
    }

    return {
      showSkeleton,
      items: clonedItems
    };
  }

  private estimateColumnWidth(items: any[], property: string, count: number, hasDropdownSelector: boolean, hasColumnHideButton: boolean, isSortable: boolean, isFilterable: boolean): string {

    try {
      const baseIconWidth = 40;
      const multiply = 7;

      const headerButtonsCompensation =
        (hasDropdownSelector ? baseIconWidth : 0) +
        (hasColumnHideButton ? baseIconWidth : 0) +
        (isFilterable ? baseIconWidth : 0) +
        (isSortable ? baseIconWidth : 0);

      const min = (property.length * multiply) + headerButtonsCompensation;

      const maxCount = items
        .slice(0, items.length <= count ? items.length - 1 : count - 1)
        .map(x => x[property]?.trim())
        .reduce((accumulator, element, index) => {
          if (index === 1) return element?.length ?? 0;
          const newLength = element?.length ?? 0;
          return newLength > accumulator ? newLength : accumulator;
        });

      const finalCount = (maxCount * multiply) + headerButtonsCompensation;

      if (maxCount === 0 || finalCount < min) {
        return `${min}px`;
      }
      else {
        return `${finalCount}px`;
      }

    } catch (error) {
      console.warn(`Can't estimate width for ${property}`, error, items);
      return '100px';
    }
  }
}