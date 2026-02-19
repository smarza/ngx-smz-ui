import { SmzDocumentCell } from '../../../modules/smz-documents/models/smz-document';
import {  SmzDocumentTitle } from '../../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBaseCellBuilder } from '../document-base-cell';
import { SmzDocumentBuilder } from '../document-builder';
import { SmzDocumentRowBuilder } from '../document-content';

export class SmzCellTitleBuilder extends SmzDocumentBaseCellBuilder<SmzCellTitleBuilder> {
  protected override that = this;
  constructor(public override _rowBuilder: SmzDocumentRowBuilder, public override _cell: SmzDocumentCell, public override _data: SmzDocumentTitle, public override _documentBuilder: SmzDocumentBuilder) {
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

  public addContainerStyles(styleClass: string): SmzCellTitleBuilder {
    this._data.container.styles += ' ' + styleClass;
    return this.that;
  }

  public useBorder(): SmzCellTitleBuilder {
    return this.addContainerStyles('smz-document-border');
  }

  public addTextStyles(styleClass: string): SmzCellTitleBuilder {
    this._data.text.styles += ' ' + styleClass;
    return this.that;
  }

  public setBackgroundColor(color: string): SmzCellTitleBuilder {
    this._data.container.background = `${color} !important`;
    return this.that;
  }

  public setTextColor(color: string): SmzCellTitleBuilder {
    this._data.text.color = `${color} !important`;
    return this.that;
  }

}