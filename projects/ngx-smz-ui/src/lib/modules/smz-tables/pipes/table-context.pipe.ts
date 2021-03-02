import { Pipe, PipeTransform } from '@angular/core';
import { SmzControlType } from 'ngx-smz-dialogs';
import { SmzTableColumn, SmzTableContextColumn } from '../models/table-column';
import { SmzTableConfig, SmzTableContext } from '../models/table-config';

@Pipe({
  name: 'tableContext'
})

export class SmzTableContextPipe implements PipeTransform {
  transform(inputConfig: SmzTableConfig): SmzTableContext {
    if (inputConfig == null) return null;

    const globalFilter: string[] = [];
    const columns: SmzTableContextColumn[] = [];

    const fieldsToOverrideContent: string[] = [];

    for (const column of inputConfig.columns) {

      const contextColumn: SmzTableContextColumn = {
        ...column,
        width: column.width ?? 'auto'
        // isSimpleNamed: isColumnSimpleNamed(column)
      };

      if (column.isGlobalFilterable) {
        globalFilter.push(contextColumn.isSimpleNamed ? `${column.field}.name` : column.field);
      }

      if (column.overrideContent) {
        fieldsToOverrideContent.push(column.field);
      }

      columns.push(contextColumn);

    }

    const config: SmzTableConfig = {
      ...inputConfig,
      useCustomActions: inputConfig.useCustomActions ?? false,
      rows: inputConfig.rows ?? 10,
      showCurrentPageReport: inputConfig.showCurrentPageReport ?? true,
      rowsPerPageOptions: inputConfig.rowsPerPageOptions ?? [5, 10, 50, 100, 500],
      currentPageReportTemplate: inputConfig.currentPageReportTemplate ?? 'Mostrando {first} a {last} de {totalRecords} itens',
    };

    return {
      globalFilter,
      columns,
      config,
      useCustomContent: fieldsToOverrideContent.length > 0,
      fieldsToOverrideContent
    };
  }
}

function isColumnSimpleNamed(column: SmzTableColumn): boolean {
  switch (column.filterControlType) {
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