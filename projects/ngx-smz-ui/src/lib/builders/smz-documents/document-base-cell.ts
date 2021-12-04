import { SmzDocumentCell } from '../../modules/smz-documents/models/smz-document';
import { SmzDocumentBaseCell } from '../../modules/smz-documents/models/smz-document-features';
import { SmzConditionalBuilder } from '../common/smz-conditional-builder';
import { SmzDocumentBuilder } from './document-builder';
import { SmzDocumentRowBuilder } from './document-content';

export class SmzDocumentBaseCellBuilder<T> extends SmzConditionalBuilder<T> {
  protected that: T;
  constructor(public _rowBuilder: SmzDocumentRowBuilder, public _cell: SmzDocumentCell, public _data: SmzDocumentBaseCell, public _documentBuilder: SmzDocumentBuilder) {
    super();
  }

  public setRowspan(rowsCount: number): T {
    this._cell.rowspan = rowsCount;
    return this.that;
  }

  public setColspan(colsCount: number): T {
    this._cell.colspan = colsCount;
    return this.that;
  }

  public setHeight(height: string): T {
    this._cell.height = height;
    return this.that;
  }

  public setWidth(width: string): T {
    this._cell.width = width;
    return this.that;
  }

  public get row(): SmzDocumentRowBuilder {
    return this._rowBuilder;
  }
}