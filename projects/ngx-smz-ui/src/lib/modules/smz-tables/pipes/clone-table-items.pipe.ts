import { Pipe, PipeTransform } from '@angular/core';
import { SmzTableContext } from '../models/table-state';
import { cloneDeep } from 'lodash-es';
import { SmzFilterType } from '../models/filter-types';
import { isArray, isSimpleNamedEntity } from '../../../common/utils/utils';
import { TableHelperService } from '../services/table-helper.service';

@Pipe({
  name: 'cloneTableItems'
})

export class SmzCloneTableItemsPipe implements PipeTransform {
  constructor(private tableHelper: TableHelperService) {
  }

  transform(items: any[], context: SmzTableContext, tableKey: string, sincronize: boolean): { showSkeleton: boolean, items: any[] } {
    const showSkeleton = items == null && context.state.initialState.skeleton.isEnabled;
    const clonedItems = showSkeleton ? new Array<any>(context.state.initialState.skeleton.rows) : cloneDeep(items);

    const count = context.state.styles.columnsWidth.samples ?? items?.length;
    const samples = items?.slice(0, items?.length <= count ? items?.length - 1 : count);

    // console.log('context from items', context);

    if (context.state.styles.columnsWidth?.estimate) {

      // console.log('estimating');

      if (samples != null && samples.length > 0) {
        context.columns.forEach(col => {

          const columnItems = samples.map(x => x[col.field]).filter(x => x != null);

          var width = col.width;

          if (col.width == 'auto') {
            width = this.estimate(columnItems, col.field, context.state.caption.columnVisibility.showDropdownSelector, context.state.caption.columnVisibility.showColumnHideButton, col.isOrderable, col.filter?.type !== SmzFilterType.NONE);
            col.width = width;
          }

          const visibleColumnsIndex = context.visibleColumns?.findIndex(x => x.field === col.field);
          if (visibleColumnsIndex >= 0) {
            context.visibleColumns[visibleColumnsIndex].width = width;
          }

          const frozenColumnsIndex = context.frozenColumns?.findIndex(x => x.field === col.field);
          if (frozenColumnsIndex >= 0) {
            context.frozenColumns[frozenColumnsIndex].width = width;
          }

        });

        // console.log('estimated', context.columns.map(x => `${x.field} => ${x.width}`));
      }
    }

    if (context.state.frozen.isEnabled) {

      const frozenWidths = context.frozenColumns.map(x => {

        try {
          // console.log(`try ${x.field} => ${x.width}`);
          if (x.width === 'auto'){
            const estimativeWidth = this.estimate(null, x.field, context.state.caption.columnVisibility.showDropdownSelector, context.state.caption.columnVisibility.showColumnHideButton, x.isOrderable, x.filter?.type !== SmzFilterType.NONE);
            return Number(estimativeWidth.replace('px', ''));
          }
          else {
            return Number(x.width.replace('px', ''));
          }
        } catch (error) {
          console.warn(`Can't set the frozen width for ${x.field}`, error, x);
          return 600;
        }

      });

      // console.log(frozenWidths);
      // console.log(context.visibleColumns.map(x => (`${x.field} => ${x.width}`)));
      context.state.frozen.width = `${frozenWidths.reduce((a,b) => a + b)}px`;
      // console.log('context.state.frozen.width: ', context.state.frozen.width);
    }

    // console.log('context from items', context);

    return {
      showSkeleton,
      items: sincronize ? this.tableHelper.sincronize(tableKey, clonedItems) : clonedItems
    };
  }

  private getBigger(items: string[], log: boolean): number {

    const mapped = items
      .map(x => {
        if (x == null) {
          return x;
        }
        else if (x != null && isArray(x)) {
          if (x.length > 0 && isSimpleNamedEntity(x[0] as any)) {
            return (x as any).map(x => x.name).join(' ');
          }
          return (x as any);
        }
        else if (x != null && isSimpleNamedEntity(x as any)) {
          return (x as any).name.trim();
        }

        return x == null ? x : x?.toString().trim();
      })
      .map(x => {
        const multipleLines = (x == null || isArray(x)) ? [] : x?.split('<br>');

        if (log) {
          console.log('-----------')
          console.log('map x', x);
          console.log('map multipleLines', multipleLines);
          console.log('-----------')
        }

        if (multipleLines == null) return x?.length ?? 0;
        if (isArray(multipleLines) && multipleLines.length === 1) {
          // console.log('only 1: ', x, x?.length ?? 0);
          return x?.length ?? 0;
        };

        const result = this.getBigger(multipleLines, false);

        if (log) {
          console.log('-----------')
          console.log('result multipleLines', result);
          console.log('-----------')
        }

        return result;
      });

      if (log) {
        console.log('-----------')
        console.log('mapped', mapped);
        console.log('-----------')
      }

      return mapped.length === 0 ? 0 : mapped
        .reduce((accumulator, element) => {
          if (log) {
            console.log('-----------')
            console.log('reduce accumulator', accumulator);
            console.log('reduce element', element);
            console.log('reduce result', element > accumulator ? element : accumulator);
            console.log('-----------')
          }
          return element > accumulator ? element : accumulator;
        });



  }

  private estimate(items: string[], header: string, hasDropdownSelector: boolean, hasColumnHideButton: boolean, isSortable: boolean, isFilterable: boolean): string {

    try {
      const baseIconWidth = 40;
      const multiply = 7;

      const headerButtonsCompensation =
        (hasDropdownSelector ? baseIconWidth : 0) +
        (hasColumnHideButton ? baseIconWidth : 0) +
        (isFilterable ? baseIconWidth : 0) +
        (isSortable ? baseIconWidth : 0);

      const min = (header.length * multiply) + headerButtonsCompensation;

      if (items == null || items.length === 0) return `${min}px`;

      const maxCount = this.getBigger(items, false);

      const finalCount = (maxCount * multiply) + headerButtonsCompensation;

      // if (header === 'area') {
      //   console.log('-----------')
      //   console.log(`${header} items`, items);
      //   console.log(`${header} maxCount => ${maxCount}`);
      //   console.log(`${header} multiply => ${multiply}`);
      //   console.log(`${header} headerButtonsCompensation => ${headerButtonsCompensation}`);
      //   console.log(`${header} finalCount => ${finalCount}`);
      //   console.log('-----------')
      // }

      if (maxCount === 0 || finalCount < min) {
        return `${min}px`;
      }
      else {
        return `${finalCount}px`;
      }

    } catch (error) {
      console.warn(`Can't estimate width for ${header}`, error, items);
      return '100px';
    }
  }

  // private estimateColumnWidth(items: any[], property: string, count: number, hasDropdownSelector: boolean, hasColumnHideButton: boolean, isSortable: boolean, isFilterable: boolean): string {

  //   try {
  //     const baseIconWidth = 40;
  //     const multiply = 7;

  //     const headerButtonsCompensation =
  //       (hasDropdownSelector ? baseIconWidth : 0) +
  //       (hasColumnHideButton ? baseIconWidth : 0) +
  //       (isFilterable ? baseIconWidth : 0) +
  //       (isSortable ? baseIconWidth : 0);

  //     const min = (property.length * multiply) + headerButtonsCompensation;

  //     if (items == null || items.length === 0) return `${min}px`;

  //     const samples = items.slice(0, items.length <= count ? items.length - 1 : count);

  //     const maxCount = (samples.length === 1 ? [...samples, ...samples]: samples)
  //       .map(x => x[property]?.trim())
  //       .map(x => {
  //         console.log('map', x[property]);
  //         const multipleLines = x[property]?.split('<br>');

  //         if (multipleLines == null) return x;
  //         if (multipleLines.length === 1) return x[0];

  //         const biggerLine = x.reduce((accumulator, element, index) => {
  //           if (index === 1) return element?.length ?? 0;
  //           const newLength = element?.length ?? 0;
  //           return newLength > accumulator ? newLength : accumulator;
  //         });

  //         console.log('biggerLine', x, biggerLine);
  //         return biggerLine;
  //       })
  //       .reduce((accumulator, element, index) => {
  //         console.log('--r');
  //         if (property === 'service') {
  //           console.log('------reduce', accumulator, element, index);
  //         }

  //         if (index === 1) return element?.length ?? 0;
  //         const newLength = element?.length ?? 0;
  //         return newLength > accumulator ? newLength : accumulator;
  //       });

  //     const finalCount = (maxCount * multiply) + headerButtonsCompensation;

  //     if (property === 'service') {

  //       console.log(`${property} maxCount => ${maxCount}`);
  //       console.log(`${property} multiply => ${multiply}`);
  //       console.log(`${property} headerButtonsCompensation => ${headerButtonsCompensation}`);
  //       console.log(`${property} finalCount => ${finalCount}`);

  //     }


  //     if (maxCount === 0 || finalCount < min) {
  //       return `${min}px`;
  //     }
  //     else {
  //       return `${finalCount}px`;
  //     }

  //   } catch (error) {
  //     console.warn(`Can't estimate width for ${property}`, error, items);
  //     return '100px';
  //   }
  // }
}