import { SmzDocumentCell } from '../../modules/smz-documents/models/smz-document';
import { SmzDocumentDivider, SmzDocumentTitle } from '../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBuilder } from './document-builder';
import { SmzDocumentBaseCellBuilder } from './document-base-cell';
import { SmzDocumentRowBuilder } from './document-content';

export class SmzCellTitleBuilder extends SmzDocumentBaseCellBuilder<SmzCellTitleBuilder> {
  protected that = this;
  constructor(public _rowBuilder: SmzDocumentRowBuilder, public _cell: SmzDocumentCell, public _data: SmzDocumentTitle, public _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
    const defaultConfig = this._documentBuilder._state.config.titles;
    _data.container = { styles: defaultConfig.container };
    _data.text.styles = defaultConfig.text;
  }

  public overrideContainerStyles(styleClass: string): SmzCellTitleBuilder {
    this._data.container.styles = styleClass;
    return this.that;
  }

  public overrideTextStyles(styleClass: string): SmzCellTitleBuilder {
    this._data.text.styles = styleClass;
    return this.that;
  }

  public setBackgroundColor(color: string): SmzCellTitleBuilder {
    this._data.container.background = color;
    return this.that;
  }

  public setTextColor(color: string): SmzCellTitleBuilder {
    this._data.text.color = color;
    return this.that;
  }

}

export class SmzCellDividerBuilder extends SmzDocumentBaseCellBuilder<SmzCellDividerBuilder> {
  protected that = this;
  constructor(public _rowBuilder: SmzDocumentRowBuilder, public _cell: SmzDocumentCell, public _data: SmzDocumentDivider, public _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
    const defaultConfig = this._documentBuilder._state.config.dividers;
    _data.styles = defaultConfig.styles;
  }

  public overrideStyles(styleClass: string): SmzCellDividerBuilder {
    this._data.styles = styleClass;
    return this.that;
  }

}