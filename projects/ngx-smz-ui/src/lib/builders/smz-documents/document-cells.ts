import { SmzDocumentCell } from '../../modules/smz-documents/models/smz-document';
import { SmzDocumentDivider, SmzDocumentField, SmzDocumentTitle } from '../../modules/smz-documents/models/smz-document-features';
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

export class SmzCellFieldBuilder extends SmzDocumentBaseCellBuilder<SmzCellFieldBuilder> {
  protected that = this;
  constructor(public _rowBuilder: SmzDocumentRowBuilder, public _cell: SmzDocumentCell, public _data: SmzDocumentField, public _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
    const defaultConfig = this._documentBuilder._state.config.fields;
    _data.container = { styles: defaultConfig.container };
    _data.label.styles = defaultConfig.label;
    _data.text.styles = defaultConfig.text;
  }

  public overrideContainerStyles(styleClass: string): SmzCellFieldBuilder {
    this._data.container.styles = styleClass;
    return this.that;
  }

  public overrideLabelStyles(styleClass: string): SmzCellFieldBuilder {
    this._data.label.styles = styleClass;
    return this.that;
  }

  public overrideTextStyles(styleClass: string): SmzCellFieldBuilder {
    this._data.text.styles = styleClass;
    return this.that;
  }

  public setBackgroundColor(color: string): SmzCellFieldBuilder {
    this._data.container.background = color;
    return this.that;
  }

  public setLabelColor(color: string): SmzCellFieldBuilder {
    this._data.label.color = color;
    return this.that;
  }

  public setTextColor(color: string): SmzCellFieldBuilder {

    if (this._data.text.color != null) {
      throw new Error(`You already set the text color on field: ${this._data.text.value}.`);
    }

    this._data.text.color = color;
    return this.that;
  }

  public useCentralized(): SmzCellFieldBuilder {
    this._data.container.styles += ' p-align-center';
    return this.that;
  }

  public useBold(): SmzCellFieldBuilder {
    this._data.text.fontWeight = '600';
    return this.that;
  }

  public useAlert(): SmzCellFieldBuilder {

    if (this._data.text.color != null) {
      throw new Error(`You can't use alert on field: ${this._data.text.value}, because it will override your previous text color choice (setTextColor).`);
    }

    this._data.text.color = 'red';
    return this.that;
  }

}