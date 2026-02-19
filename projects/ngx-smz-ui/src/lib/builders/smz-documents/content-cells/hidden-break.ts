import { SmzDocumentCell } from '../../../modules/smz-documents/models/smz-document';
import { SmzDocumentHiddenBreak } from '../../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBaseCellBuilder } from '../document-base-cell';
import { SmzDocumentBuilder } from '../document-builder';
import { SmzDocumentRowBuilder } from '../document-content';

export class SmzCellHiddenBreakBuilder extends SmzDocumentBaseCellBuilder<SmzCellHiddenBreakBuilder> {
  protected override that = this;
  constructor(public override _rowBuilder: SmzDocumentRowBuilder, public override _cell: SmzDocumentCell, public override _data: SmzDocumentHiddenBreak, public override _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
    const defaultConfig = this._documentBuilder._state.config.dividers;
    _data.styles = defaultConfig.container;
  }

  public overrideStyles(styleClass: string): SmzCellHiddenBreakBuilder {
    this._data.styles = styleClass;
    return this.that;
  }

  public overrideOverlapStyles(styleClass: string): SmzCellHiddenBreakBuilder {
    this._data.overlapStyles = styleClass;
    return this.that;
  }

  public setHiddenBreakHeight(height: string): SmzCellHiddenBreakBuilder {
    this._data.height = height;
    return this.that;
  }

}