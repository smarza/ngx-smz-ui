import { SmzDocumentCell } from '../../../modules/smz-documents/models/smz-document';
import { SmzDocumentSubTitle } from '../../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBaseCellBuilder } from '../document-base-cell';
import { SmzDocumentBuilder } from '../document-builder';
import { SmzDocumentRowBuilder } from '../document-content';


export class SmzCellSubTitleBuilder extends SmzDocumentBaseCellBuilder<SmzCellSubTitleBuilder> {
  protected that = this;
  constructor(public _rowBuilder: SmzDocumentRowBuilder, public _cell: SmzDocumentCell, public _data: SmzDocumentSubTitle, public _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
    const defaultConfig = this._documentBuilder._state.config.subTitles;
    _data.container = { styles: defaultConfig.container };
    _data.text.styles = defaultConfig.text;
  }

  public overrideContainerStyles(styleClass: string): SmzCellSubTitleBuilder {
    this._data.container.styles = styleClass;
    return this.that;
  }

  public overrideTextStyles(styleClass: string): SmzCellSubTitleBuilder {
    this._data.text.styles = styleClass;
    return this.that;
  }

  public addContainerStyles(styleClass: string): SmzCellSubTitleBuilder {
    this._data.container.styles += ' ' + styleClass;
    return this.that;
  }

  public useBorder(): SmzCellSubTitleBuilder {
    return this.addContainerStyles('smz-document-border');
  }

  public addTextStyles(styleClass: string): SmzCellSubTitleBuilder {
    this._data.text.styles += ' ' + styleClass;
    return this.that;
  }

  public setBackgroundColor(color: string): SmzCellSubTitleBuilder {
    this._data.container.background = `${color} !important`;
    return this.that;
  }

  public setTextColor(color: string): SmzCellSubTitleBuilder {
    this._data.text.color = `${color} !important`;
    return this.that;
  }

}