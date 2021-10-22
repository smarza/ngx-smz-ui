
import { SmzDocumentCell, SmzDocumentRow, SmzDocumentContent } from '../../modules/smz-documents/models/smz-document';
import { SmzDocumentTitle, SmzDocumentFeatureDefinitions, SmzDocumentDivider } from '../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBuilder } from './document-builder';
import { SmzCellDividerBuilder, SmzCellTitleBuilder } from './document-cells';

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

  public title(text: string): SmzCellTitleBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentTitle = { type: SmzDocumentFeatureDefinitions.TITLE, text: { value: text } };
    cell.data = item;
    return new SmzCellTitleBuilder(this, cell, item, this._documentBuilder);
  }

  public divider(): SmzCellDividerBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentDivider = { type: SmzDocumentFeatureDefinitions.DIVIDER };
    cell.data = item;
    return new SmzCellDividerBuilder(this, cell, item, this._documentBuilder);
  }

  public get content(): SmzDocumentContentBuilder {
    return this._contentBuilder;
  }
}
