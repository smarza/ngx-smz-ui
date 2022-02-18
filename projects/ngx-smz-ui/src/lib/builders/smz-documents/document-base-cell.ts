import { SmzDocumentCell } from '../../modules/smz-documents/models/smz-document';
import { SmzDocumentBaseCell } from '../../modules/smz-documents/models/smz-document-features';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzDocumentBuilder } from './document-builder';
import { SmzDocumentRowBuilder } from './document-content';

export type SmzDocumentWidthTypes = 'auto' | 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-7' | 'col-8' | 'col-9' | 'col-10' | 'col-11' | 'col-12';

export class SmzDocumentBaseCellBuilder<T> extends SmzBuilderUtilities<T> {
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

  // public setWidth(width: string): T {
  //   this._cell.width = width;
  //   return this.that;
  // }

  public setWidth(width: SmzDocumentWidthTypes): T {
    let newWidth = 'unset';

    if (width !== 'auto')
    {
      const size = Number(width.split('-')[1]);
      newWidth = `${(100/12) * size}%`;
    }

    this._cell.width = newWidth;
    return this.that;
  }

  public get row(): SmzDocumentRowBuilder {
    return this._rowBuilder;
  }
}