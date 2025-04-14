import { SmzDocumentCell } from '../../../modules/smz-documents/models/smz-document';
import { SmzDocumentPageBreak } from '../../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBaseCellBuilder } from '../document-base-cell';
import { SmzDocumentBuilder } from '../document-builder';
import { SmzDocumentRowBuilder } from '../document-content';

export class SmzCellPageBreakBuilder extends SmzDocumentBaseCellBuilder<SmzCellPageBreakBuilder> {
  protected override that = this;
  constructor(public override _rowBuilder: SmzDocumentRowBuilder, public override _cell: SmzDocumentCell, public override _data: SmzDocumentPageBreak, public override _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
  }

}