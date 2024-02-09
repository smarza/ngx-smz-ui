import { Pipe, PipeTransform } from '@angular/core';
import { SmzTableContext, SmzTableState } from '../models/table-state';
import { cloneDeep, forEach } from 'lodash-es';
import { SmzFilterType } from '../models/filter-types';
import { longestStringInArray } from '../../../common/utils/utils';
import { TableHelperService } from '../services/table-helper.service';
import { applyTableContentNgStyle } from '../../../builders/smz-tables/state-builder';
import { SmzContentType, SmzDataTransform } from '../models/content-types';
import { SmzTableContentPipe } from './table-content.pipe';
import { ObjectUtils } from 'primeng/utils';

@Pipe({
  name: 'cloneTableItems'
})

export class SmzCloneTableItemsPipe implements PipeTransform {
  private state: SmzTableState;
  constructor(private tableHelper: TableHelperService) {
  }

  transform(items: any[], context: SmzTableContext, tableKey: string, sincronize: boolean): { showSkeleton: boolean, items: any[] } {

    console.log('pipe', items);

    this.state = context.state;

    const showSkeleton = items == null && context.state.initialState.skeleton.isEnabled;

    let clonedItems: any[] = [];

    if (showSkeleton) {
      clonedItems = new Array<any>(context.state.initialState.skeleton.rows);
    }
    else {
      clonedItems = cloneDeep(items)

      if (context.columns.some(x => x.content.type == SmzContentType.DATA_TRANSFORM)) {
        clonedItems = this.includeTransformedData(clonedItems, context);
      }
    }

    console.log('clonedItems', clonedItems);

    const count = context.state.styles.columnsWidth.samples ?? items?.length;
    const samples = items?.slice(0, items?.length <= count ? items?.length - 1 : count);
    // console.log('transform items', items);
    // console.log('samples', samples);
    // console.log('context from items', context);

    if (context.state.styles.columnsWidth?.estimate) {

      if (samples != null && samples.length > 0) {
        context.columns.forEach(col => {

          let columnItems: string[] = [];
          const contentPipe = new SmzTableContentPipe();

          if (col.content.type === SmzContentType.DATA_TRANSFORM) {
            const colData = col.content.data as SmzDataTransform;
            columnItems = samples.map((x, i) => colData.callback(x[col.field], x, i)).filter(x => x != null);
          }
          else {
            columnItems = samples.map(x => contentPipe.transform(x, col.field, col.content.type).result).filter(x => x != null);
          }

          if (col.width == 'auto') {
            const size = this.estimate(columnItems, col.header, context.state.caption.columnVisibility.showDropdownSelector, context.state.caption.columnVisibility.showColumnHideButton, col.isOrderable, col.filter?.type !== SmzFilterType.NONE, context.state.styles.columnsWidth.maxWidth, context.state.isDebug);
            col.width = `${size}px`;
            col.content.ngStyle = applyTableContentNgStyle(context.state, size);

            const visibleColumnsIndex = context.visibleColumns?.findIndex(x => x.field === col.field);
            if (visibleColumnsIndex >= 0) {
              context.visibleColumns[visibleColumnsIndex].width = col.width;
              context.visibleColumns[visibleColumnsIndex].content.ngStyle = applyTableContentNgStyle(context.state, size);
            }

            const frozenColumnsIndex = context.frozenColumns?.findIndex(x => x.field === col.field);
            if (frozenColumnsIndex >= 0) {
              context.frozenColumns[frozenColumnsIndex].width = col.width;
            }
          }
          else {
            const visibleColumnsIndex = context.visibleColumns?.findIndex(x => x.field === col.field);
            if (visibleColumnsIndex >= 0) {
              context.visibleColumns[visibleColumnsIndex].width = col.width;
              context.visibleColumns[visibleColumnsIndex].content.ngStyle = applyTableContentNgStyle(context.state, null, col.width);
            }

            const frozenColumnsIndex = context.frozenColumns?.findIndex(x => x.field === col.field);
            if (frozenColumnsIndex >= 0) {
              context.frozenColumns[frozenColumnsIndex].width = col.width;
            }
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
            const estimativeWidth = this.estimate(null, x.header, context.state.caption.columnVisibility.showDropdownSelector, context.state.caption.columnVisibility.showColumnHideButton, x.isOrderable, x.filter?.type !== SmzFilterType.NONE, context.state.styles.columnsWidth.maxWidth, context.state.isDebug);
            x.content.ngStyle = applyTableContentNgStyle(context.state, estimativeWidth);
            return estimativeWidth;
          }
          else {
            const size =  Number(x.width.replace('px', ''));
            x.content.ngStyle = applyTableContentNgStyle(context.state, size);
            return size;
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
    // console.log(`--------> `, context);

    return {
      showSkeleton,
      items: sincronize && !showSkeleton ? this.tableHelper.sincronize(tableKey, clonedItems) : clonedItems
    };
  }
  private includeTransformedData(items: any[], context: SmzTableContext): any[] {

    context.columns
      .filter(x => x.content.type === SmzContentType.DATA_TRANSFORM)
      .forEach(column => {
        items.map((item, index) => {
          console.log('>>>');
          console.log(index, item);
          const itemResolved = ObjectUtils.resolveFieldData(item, column.field);
          const columnContent = column.content.data as SmzDataTransform;
          const transformedData = columnContent.callback(itemResolved, item, index);
          const teste = Reflect.set(item, `_${column.field}`, transformedData);
          console.log('transformedData', transformedData);
          console.log('teste', teste);
          console.log('item', item);
          return item;
        })
      });

      return items;
  }

  private estimate(items: string[], header: string, hasDropdownSelector: boolean, hasColumnHideButton: boolean, isSortable: boolean, isFilterable: boolean, maxWidth: number, log: boolean): number {

    try {
      // console.log(`EEstimate ${header} items`, items);
      const baseIconWidth = 40;
      const paddingCompensation = this.state.styles.columnsWidth.estimatePadding;

      const headerButtonsCompensation =
        (hasDropdownSelector ? baseIconWidth : 0) +
        (hasColumnHideButton ? baseIconWidth : 0) +
        (isFilterable ? baseIconWidth : 0) +
        (isSortable ? baseIconWidth : 0) +
        paddingCompensation;

      const min = this.measureText(header, this.state.styles.columnsWidth.estimateFontBase) + headerButtonsCompensation;

      if (items == null || items.length === 0) return min;

      const longest = longestStringInArray(items);
      const longestCount = this.measureText(longest, this.state.styles.columnsWidth.estimateFontBase) + paddingCompensation;

      if (log) {
        console.log('-----------')
        console.log(`${header} items`, items);
        console.log(`${header} longest => ${longest}`);
        console.log(`${header} headerButtonsCompensation => ${headerButtonsCompensation}`);
        console.log(`${header} min => ${min}`);
        console.log(`${header} maxWidth => ${maxWidth}`);
        console.log(`${header} longestCount => ${longestCount}`);

        if (longestCount === 0 || longestCount < min) {
          console.log(`${header} min > maxWidth => ${min > maxWidth}`);
          console.log(maxWidth != null && min > maxWidth ? `${header} return ${maxWidth}px` : `${header} return ${min}px`);
        }
        else {
          console.log(`${header} finalCount > maxWidth => ${longestCount > maxWidth}`);
          console.log(maxWidth != null && longestCount > maxWidth ? `${header} return ${maxWidth}px` : `${header} return ${longestCount}px`);
        }
        console.log('-----------')
      }

      if (longestCount === 0 || longestCount < min) {
        return maxWidth != null && min > maxWidth ? maxWidth : min;
      }
      else {
        return maxWidth != null && longestCount > maxWidth ? maxWidth : longestCount;
      }

    } catch (error) {
      console.warn(`Can't estimate width for ${header}`, error, items);
      return 99;
    }
  }

  private measureText(text: string, font: string): any {
    // setup canvas
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    // define (pre-loaded) font:
    if (font != null) ctx.font = font;
    const measure = ctx.measureText(text);
    // console.log(`... measureText (${text}) = ${measure.width}`, measure);

    // get metrics
    return measure.width;
  }
}