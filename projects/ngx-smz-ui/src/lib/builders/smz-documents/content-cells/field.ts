import { SmzDocumentCell } from '../../../modules/smz-documents/models/smz-document';
import { SmzDocumentField } from '../../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBaseCellBuilder } from '../document-base-cell';
import { SmzDocumentBuilder } from '../document-builder';
import { SmzDocumentRowBuilder } from '../document-content';


export class SmzCellFieldBuilder extends SmzDocumentBaseCellBuilder<SmzCellFieldBuilder> {
  protected override that = this;
  constructor(public override _rowBuilder: SmzDocumentRowBuilder, public override _cell: SmzDocumentCell, public override _data: SmzDocumentField, public override _documentBuilder: SmzDocumentBuilder) {
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

  public addContainerStyles(styleClass: string): SmzCellFieldBuilder {
    this._data.container.styles += ' ' + styleClass;
    return this.that;
  }

  public useBorder(): SmzCellFieldBuilder {
    return this.addContainerStyles('smz-document-border');
  }

  public addLabelStyles(styleClass: string): SmzCellFieldBuilder {
    this._data.label.styles += ' ' + styleClass;
    return this.that;
  }

  public addTextStyles(styleClass: string): SmzCellFieldBuilder {
    this._data.text.styles += ' ' + styleClass;
    return this.that;
  }

  public setBackgroundColor(color: string): SmzCellFieldBuilder {
    this._data.container.background = `${color} !important`;
    return this.that;
  }

  public setLabelColor(color: string): SmzCellFieldBuilder {
    this._data.label.color = `${color} !important`;
    return this.that;
  }

  public setTextColor(color: string): SmzCellFieldBuilder {

    if (this._data.text.color != null) {
      throw new Error(`You already set the text color on field: ${this._data.text.value}.`);
    }

    this._data.text.color = `${color} !important`;
    return this.that;
  }

  public useCentralized(): SmzCellFieldBuilder {
    this._data.container.styles += ' items-center';
    this._data.label.styles += ' text-center';
    this._data.text.styles += ' text-center';
    return this.that;
  }

  public useBold(): SmzCellFieldBuilder {
    this._data.text.fontWeight = '700 !important';
    return this.that;
  }

  public useAlert(): SmzCellFieldBuilder {

    if (this._data.text.color != null) {
      throw new Error(`You can't use alert on field: ${this._data.text.value}, because it will override your previous text color choice (setTextColor).`);
    }

    this._data.text.color = 'red !important';
    return this.that;
  }

}