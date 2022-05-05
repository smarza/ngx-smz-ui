import { SmzDocumentCell } from '../../../modules/smz-documents/models/smz-document';
import { SmzDocumentSpacer } from '../../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBaseCellBuilder } from '../document-base-cell';
import { SmzDocumentBuilder } from '../document-builder';
import { SmzDocumentRowBuilder } from '../document-content';

export class SmzCellSpacerBuilder extends SmzDocumentBaseCellBuilder<SmzCellSpacerBuilder> {
  protected that = this;
  constructor(public _rowBuilder: SmzDocumentRowBuilder, public _cell: SmzDocumentCell, public _data: SmzDocumentSpacer, public _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
    const defaultConfig = this._documentBuilder._state.config.dividers;
    _data.styles = defaultConfig.container;
  }

  public overrideStyles(styleClass: string): SmzCellSpacerBuilder {
    this._data.styles = styleClass;
    return this.that;
  }

  public setSpacerHeight(height: string): SmzCellSpacerBuilder {
    this._data.height = height;
    return this.that;
  }

}