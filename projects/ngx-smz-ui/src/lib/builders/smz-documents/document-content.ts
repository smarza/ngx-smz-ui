
import { SmzDocumentCell, SmzDocumentRow, SmzDocumentContent } from '../../modules/smz-documents/models/smz-document';
import { SmzDocumentTitle, SmzDocumentFeatureDefinitions, SmzDocumentDivider, SmzDocumentField, SmzDocumentImage, SmzDocumentSpacer, SmzDocumentSubTitle, SmzDocumentFieldsGroup } from '../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBuilder } from './document-builder';
import { SmzCellDividerBuilder, SmzCellFieldBuilder, SmzCellFieldsGroupBuilder, SmzCellImageBuilder, SmzCellSpacerBuilder, SmzCellSubTitleBuilder, SmzCellTitleBuilder } from './document-cells';

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

  public field(text: string, label?: string): SmzCellFieldBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentField = { type: SmzDocumentFeatureDefinitions.FIELD, text: { value: text }, label: { value: label, isVisible: label != null } };
    cell.data = item;
    return new SmzCellFieldBuilder(this, cell, item, this._documentBuilder);
  }

  public image(src: string): SmzCellImageBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentImage = { type: SmzDocumentFeatureDefinitions.IMAGE, image: { src, width: '100%' } };
    cell.data = item;
    return new SmzCellImageBuilder(this, cell, item, this._documentBuilder);
  }

  public spacer(): SmzCellSpacerBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentSpacer = { type: SmzDocumentFeatureDefinitions.SPACER, height: '100%' };
    cell.data = item;
    return new SmzCellSpacerBuilder(this, cell, item, this._documentBuilder);
  }

  public subTitle(text: string): SmzCellSubTitleBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentSubTitle = { type: SmzDocumentFeatureDefinitions.SUB_TITLE, text: { value: text } };
    cell.data = item;
    return new SmzCellSubTitleBuilder(this, cell, item, this._documentBuilder);
  }

  public group(): SmzCellFieldsGroupBuilder {
    const cell: SmzDocumentCell = { colspan: 1, rowspan: 1, height: '100%', width: 'auto', data: null };
    this._row.cells.push(cell)
    const item: SmzDocumentFieldsGroup = { type: SmzDocumentFeatureDefinitions.FIELDS_GROUP, fields: [] };
    cell.data = item;
    return new SmzCellFieldsGroupBuilder(this, cell, item, this._documentBuilder);
  }

  public get content(): SmzDocumentContentBuilder {
    return this._contentBuilder;
  }
}