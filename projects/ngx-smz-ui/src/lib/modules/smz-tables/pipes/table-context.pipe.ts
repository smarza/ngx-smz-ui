import { Pipe, PipeTransform } from '@angular/core';
import { SmzContentType } from '../models/content-types';
import { SmzTableContextColumn } from '../models/table-column';
import { SmzTableConfig, SmzTableContext } from '../models/table-config';

@Pipe({
  name: 'tableContext'
})

export class SmzTableContextPipe implements PipeTransform {
  transform(inputConfig: SmzTableConfig): SmzTableContext {
    if (inputConfig == null) return null;

    const globalFilter: string[] = [];
    const columns: SmzTableContextColumn[] = [];

    for (const column of inputConfig.columns.filter(c => c.isVisible)) {

      const contextColumn: SmzTableContextColumn = {
        ...column,
        width: column.width ?? 'auto',
        contentType: column.contentType ?? SmzContentType.TEXT,
        contentData: column.contentData ?? { useTemplate: false }
      };

      switch (column.contentType) {
        case SmzContentType.CALENDAR:
          if (column.contentData == null || !Reflect.has(column.contentData, 'format')) {
            Reflect.set(contextColumn.contentData, 'format', 'short');
          }

          break;
        case SmzContentType.CURRENCY:

          break;

        case SmzContentType.ICON:

          break;
        default:
          break;
      }

      if (column.isGlobalFilterable) {
        globalFilter.push(column.field);
      }

      columns.push(contextColumn);

    }

    const config: SmzTableConfig = {
      ...inputConfig,
      useCustomActions: inputConfig.useCustomActions ?? false,
      customActionWidth: inputConfig.customActionWidth ?? '63px',
      showClearFilter: inputConfig.showClearFilter ?? true,
      rows: inputConfig.rows ?? 10,
      showCurrentPageReport: inputConfig.showCurrentPageReport ?? true,
      rowsPerPageOptions: inputConfig.rowsPerPageOptions ?? [5, 10, 50, 100, 500],
      currentPageReportTemplate: inputConfig.currentPageReportTemplate ?? 'Mostrando {first} a {last} de {totalRecords} itens',
      emptyMessage: inputConfig.emptyMessage ?? 'Lista Vazia',
      customEmptyMessage: inputConfig.customEmptyMessage ?? null,
      isSelectable: inputConfig.isSelectable ?? false,
      selectBoxWidth: inputConfig.selectBoxWidth ?? '3em',
      isRowClickable: inputConfig.isRowClickable ?? false,
      rowClickCallback: inputConfig.rowClickCallback ?? null,
      clearFilterCallback: inputConfig.clearFilterCallback ?? null,
      clearFilterLabel: inputConfig.clearFilterLabel ?? 'Limpar Filtro',
      toolbarAlignment: inputConfig.toolbarAlignment ?? 'start',
    };

    if (config.customEmptyMessage != null) {

      config.customEmptyMessage = {
        message: inputConfig.customEmptyMessage.message ?? 'Lista Vazia',
        callbackLabel: inputConfig.customEmptyMessage.callbackLabel ?? 'Ação',
        callback: inputConfig.customEmptyMessage.callback ?? null,
        callbackInfo: inputConfig.customEmptyMessage.callbackInfo ?? null,
        image: inputConfig.customEmptyMessage.image ?? 'assets/images/tables/empty.svg',
      };

    }

    return {
      globalFilter,
      columns,
      config,
    };
  }
}