import { SmzDocumentCell } from '../../../modules/smz-documents/models/smz-document';
import { SmzDocumentDivider } from '../../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBaseCellBuilder } from '../document-base-cell';
import { SmzDocumentBuilder } from '../document-builder';
import { SmzDocumentRowBuilder } from '../document-content';

export class SmzCellDividerBuilder extends SmzDocumentBaseCellBuilder<SmzCellDividerBuilder> {
  protected that = this;
  constructor(public _rowBuilder: SmzDocumentRowBuilder, public _cell: SmzDocumentCell, public _data: SmzDocumentDivider, public _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
    const defaultConfig = this._documentBuilder._state.config.dividers;
    _data.styles = defaultConfig.container;
  }

  public overrideStyles(styleClass: string): SmzCellDividerBuilder {
    this._data.styles = styleClass;
    return this.that;
  }

}
