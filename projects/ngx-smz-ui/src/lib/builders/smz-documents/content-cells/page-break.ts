import { SmzDocumentCell } from '../../../modules/smz-documents/models/smz-document';
import { SmzDocumentPageBreak } from '../../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBaseCellBuilder } from '../document-base-cell';
import { SmzDocumentBuilder } from '../document-builder';
import { SmzDocumentRowBuilder } from '../document-content';

export class SmzCellPageBreakBuilder extends SmzDocumentBaseCellBuilder<SmzCellPageBreakBuilder> {
  protected that = this;
  constructor(public _rowBuilder: SmzDocumentRowBuilder, public _cell: SmzDocumentCell, public _data: SmzDocumentPageBreak, public _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
  }

}