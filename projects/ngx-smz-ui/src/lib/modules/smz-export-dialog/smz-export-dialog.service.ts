import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ObjectUtils } from 'primeng/utils';
import { SmzDocumentState } from '../smz-documents/models/smz-document';
import { SmzDocumentBuilder } from '../../builders/smz-documents/document-builder';
import { SmzDialogsService } from '../smz-dialogs/services/smz-dialogs.service';
import { SmzExportDialogData } from './smz-export-dialog.model';
import { SmzDialogBuilder } from '../../builders/smz-dialogs/dialog-builder';
import { Store } from '@ngxs/store';
import { LayoutUiActions } from '../../state/ui/layout/layout.actions';

@Injectable()
export class SmzExportDialogService {
  constructor(private dialogs: SmzDialogsService, private store: Store) { }

  public showExportDocumentDialog(data: SmzExportDialogData): void {

    const plainItems = data.items.map((item, index) => (this.convertItem(data, item, index)));
    const documentState: SmzDocumentState = this.buildDocumentState(data, plainItems);

    this.dialogs.open(new SmzDialogBuilder()
      .setTitle(data.title)
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('LARGE', 'col-10')
      .setLayout('EXTRA_LARGE', 'col-10')
      .closeOnEscape()
      .allowMaximize()
      .dismissableMask()
      .document(documentState)
      .setMinHeight(80)
      .buttons()
        .confirm().hide().buttons
        .cancel().hide().buttons
        .close().callback(() => {
          this.store.dispatch(new LayoutUiActions.HideExportDialog)
        }).buttons
        .dialog
      .build())

  }

  private convertItem(data: SmzExportDialogData, item: any, index: number): any {
    const result = {};

    data.columns.forEach(column => {

      const normalizedField = column.field.replace(/\.+/g, '');

      if (column.isDataTransform) {
        result[normalizedField] = column.callback(this.resolveData(item, column.field).result, item, index);
      }
      else {
        result[normalizedField] = this.resolveData(item, column.field).result;
      }

    });

    return result;
  }

  private buildDocumentState(data: SmzExportDialogData, items: any[]): SmzDocumentState {
    let document = new SmzDocumentBuilder()
      .setRenderer('html2pdf')
      .setQuality(1.5)
      .setPaddingCompensation(5)
      .hidePageNumbers()
      .hidePrintHour()
      // .debugMode()

      .setUnit('cm')
      .setMargins(0.5, 0.5, 0.5, 0.5)
      .setFilename(data.filename)
      .setPage('a4', 'landscape')

      .viewer()
        .allowDownload()
        .document;

    document = this.buildTableState(document, data, items);

    return document.build();
  }

  private buildTableState(builder: SmzDocumentBuilder, data: SmzExportDialogData, items: any[]): SmzDocumentBuilder {

    return builder
    .header()

    .row()

    // TÍTULO
    .title(data.title)
    .overrideContainerStyles('justify-around bg-slate-50 pt-2')
    .overrideTextStyles('text-black text-xl font-bold')
    .row

    .content

    .document

    .content()

    .row().spacer().setHeight('20px').row.content

    .row()

      // TABELA
      .table()
        .setSource(null, of(items))
        .for(data.columns,
          (x, item) =>
            x.addColumn(item.field.replace(/\.+/g, ''), item.header)
              .table
          )
        .row
      .content

    // .row().spacer().setHeight('20px').row.content

    .document

  }

  private resolveData(data: any, field: string): { result: string } {
    if (data == null) return { result: '' };
    return { result: ObjectUtils.resolveFieldData(data, field) };
  }

}