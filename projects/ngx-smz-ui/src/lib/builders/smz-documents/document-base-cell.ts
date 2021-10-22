import { SmzDocumentCell } from '../../modules/smz-documents/models/smz-document';
import { SmzDocumentBaseCell } from '../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBuilder } from './document-builder';
import { SmzDocumentRowBuilder } from './document-content';



export class SmzDocumentBaseCellBuilder<T> {
  protected that: T;
  constructor(public _rowBuilder: SmzDocumentRowBuilder, public _cell: SmzDocumentCell, public _data: SmzDocumentBaseCell, public _documentBuilder: SmzDocumentBuilder) {

  }

  public setRowspan(rowsCount: number): SmzDocumentBaseCellBuilder<T> {
    this._cell.rowspan = rowsCount;
    return this;
  }

  public setColspan(colsCount: number): SmzDocumentBaseCellBuilder<T> {
    this._cell.colspan = colsCount;
    return this;
  }

  public setHeight(height: string): SmzDocumentBaseCellBuilder<T> {
    this._cell.height = height;
    return this;
  }

  public setWidth(width: string): SmzDocumentBaseCellBuilder<T> {
    this._cell.width = width;
    return this;
  }

  public get row(): SmzDocumentRowBuilder {
    return this._rowBuilder;
  }
}