
import { SmzDocumentCell, SmzDocumentRow, SmzDocumentSpanTypes, SmzDocumentContent } from '../../modules/smz-documents/models/smz-document';
import { SmzDocumentTitle, SmzDocumentFeatureDefinitions } from '../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBuilder } from './document-builder';
import { SmzDocumentFeatureTitleBuilder } from './document-features';

export class SmzDocumentContentBuilder {
  constructor(private _documentBuilder: SmzDocumentBuilder, private _content: SmzDocumentContent) {

  }

  public row(): SmzDocumentRowBuilder {
    const row: SmzDocumentRow = { cells: [] };
    this._content.rows.push(row)
    return new SmzDocumentRowBuilder(this, row, this._documentBuilder);
  }

  public get document(): SmzDocumentBuilder {
    return this._documentBuilder;
  }
}

export class SmzDocumentRowBuilder {
  constructor(private _contentBuilder: SmzDocumentContentBuilder, private _row: SmzDocumentRow, private _documentBuilder: SmzDocumentBuilder) {

  }

  public cell(): SmzDocumentCellBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', data: null };
    this._row.cells.push(cell)
    return new SmzDocumentCellBuilder(this, cell, this._documentBuilder);
  }

  public get content(): SmzDocumentContentBuilder {
    return this._contentBuilder;
  }
}

export class SmzDocumentCellBuilder {
  constructor(private _rowBuilder: SmzDocumentRowBuilder, private _cell: SmzDocumentCell, private _documentBuilder: SmzDocumentBuilder) {

  }
  public setRowspan(rowsCount: number): SmzDocumentCellBuilder {
    this._cell.rowspan = rowsCount;
    return this;
  }

  public setColspan(colsCount: number): SmzDocumentCellBuilder {
    this._cell.colspan = colsCount;
    return this;
  }

  public setHeight(height: string): SmzDocumentCellBuilder {
    this._cell.height = height;
    return this;
  }

  public title(text: string): SmzDocumentFeatureTitleBuilder {
    const item: SmzDocumentTitle = { type: SmzDocumentFeatureDefinitions.TITLE, text: { value: text } };
    this._cell.data = item;
    return new SmzDocumentFeatureTitleBuilder(this, item, this._documentBuilder);
  }

  public get row(): SmzDocumentRowBuilder {
    return this._rowBuilder;
  }
}