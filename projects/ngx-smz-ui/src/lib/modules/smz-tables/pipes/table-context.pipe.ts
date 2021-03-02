import { Pipe, PipeTransform } from '@angular/core';
import { SmzControlType } from 'ngx-smz-dialogs';
import { SmzTableColumn, SmzTableContextColumn } from '../models/table-column';
import { SmzTableConfig, SmzTableContext } from '../models/table-config';

@Pipe({
  name: 'tableContext'
})

export class SmzTableContextPipe implements PipeTransform {
  transform(config: SmzTableConfig): SmzTableContext {
    if (config == null) return null;

    const globalFilter: string[] = [];
    const columns: SmzTableContextColumn[] = [];

    for (const column of config.columns) {

      const contextColumn: SmzTableContextColumn = {
        ...column,
        isSimpleNamed: isColumnSimpleNamed(column)
      };

      if (column.isGlobalFilterable) {
        globalFilter.push(contextColumn.isSimpleNamed ? `${column.field}.name` : column.field);
      }

      columns.push(contextColumn);

    }

    return {
      globalFilter,
      columns
    };
  }
}

function isColumnSimpleNamed(column: SmzTableColumn): boolean {
  switch (column.controlType) {
    case
      SmzControlType.DROPDOWN:
      return true;

    case
      SmzControlType.MULTI_SELECT:
      return true;

    case
      SmzControlType.LINKED_MULTISELECT:
      return true;

    case
      SmzControlType.LINKED_DROPDOWN:
      return true;

    default:
      return false;
  }
}