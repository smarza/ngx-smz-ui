import { SmzDocumentCell } from '../../modules/smz-documents/models/smz-document';
import { SmzDocumentDivider, SmzDocumentFeatureDefinitions, SmzDocumentField, SmzDocumentFieldGroup, SmzDocumentFieldsGroup, SmzDocumentImage, SmzDocumentSpacer, SmzDocumentSubTitle, SmzDocumentTitle } from '../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBuilder } from './document-builder';
import { SmzDocumentBaseCellBuilder } from './document-base-cell';
import { SmzDocumentRowBuilder } from './document-content';
import cloneDeep from 'lodash-es/cloneDeep';

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
    _data.styles = defaultConfig.container;
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
    this._data.label.styles += ' text-center';
    this._data.text.styles += ' text-center';
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

export class SmzCellImageBuilder extends SmzDocumentBaseCellBuilder<SmzCellImageBuilder> {
  protected that = this;
  constructor(public _rowBuilder: SmzDocumentRowBuilder, public _cell: SmzDocumentCell, public _data: SmzDocumentImage, public _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
    const defaultConfig = this._documentBuilder._state.config.images;
    _data.container = { styles: defaultConfig.container };
    _data.image.styles = defaultConfig.styles;
  }

  public overrideContainerStyles(styleClass: string): SmzCellImageBuilder {
    this._data.container.styles = styleClass;
    return this.that;
  }

  public overrideImageStyles(styleClass: string): SmzCellImageBuilder {
    this._data.image.styles = styleClass;
    return this.that;
  }

  public setBackgroundColor(color: string): SmzCellImageBuilder {
    this._data.container.background = color;
    return this.that;
  }

  public setImageWidth(width: string): SmzCellImageBuilder {
    this._data.image.width = width;
    return this.that;
  }

}

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

  public setBackgroundColor(color: string): SmzCellSubTitleBuilder {
    this._data.container.background = color;
    return this.that;
  }

  public setTextColor(color: string): SmzCellSubTitleBuilder {
    this._data.text.color = color;
    return this.that;
  }

}

export class SmzCellFieldsGroupBuilder extends SmzDocumentBaseCellBuilder<SmzCellFieldsGroupBuilder> {
  protected that = this;
  constructor(public _rowBuilder: SmzDocumentRowBuilder, public _cell: SmzDocumentCell, public _data: SmzDocumentFieldsGroup, public _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
    const defaultConfig = cloneDeep(this._documentBuilder._state.config);
    _data.container = { styles: defaultConfig.fieldsGroup.container };
  }

  public overrideContainerStyles(styleClass: string): SmzCellFieldsGroupBuilder {
    this._data.container.styles = styleClass;
    return this.that;
  }

  public setBackgroundColor(color: string): SmzCellFieldsGroupBuilder {
    this._data.container.background = color;
    return this.that;
  }

  public addField(text: string, label?: string): SmzCellFieldGroupBuilder {

    return new SmzCellFieldGroupBuilder(this, text, label, this._documentBuilder);
  }

}

export class SmzCellFieldGroupBuilder {
  private _data: SmzDocumentFieldGroup;
  constructor(public _groupBuilder: SmzCellFieldsGroupBuilder, text: string, label: string, public _documentBuilder: SmzDocumentBuilder) {

    const defaultConfig = cloneDeep(this._documentBuilder._state.config);

    this._data = {
      type: SmzDocumentFeatureDefinitions.FIELD,
      container: { styles: defaultConfig.fields.container },
      label: { value: label, isVisible: label != null, styles: defaultConfig.fields.label },
      text: { value: text, styles: defaultConfig.fields.text },
      flexWidth: 'p-col'
    };

    this._groupBuilder._data.fields.push(this._data)

  }

  public setWidth(width: 'auto' | 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-7' | 'col-8' | 'col-9' | 'col-10' | 'col-11' | 'col-12'): SmzCellFieldGroupBuilder {
    const newStyle = width === 'auto' ? 'p-col' : `p-${width}`;
    this._data.flexWidth = newStyle;
    return this;
  }


  public overrideContainerStyles(styleClass: string): SmzCellFieldGroupBuilder {
    this._data.container.styles = styleClass;
    return this;
  }

  public overrideLabelStyles(styleClass: string): SmzCellFieldGroupBuilder {
    this._data.label.styles = styleClass;
    return this;
  }

  public overrideTextStyles(styleClass: string): SmzCellFieldGroupBuilder {
    this._data.text.styles = styleClass;
    return this;
  }

  public setBackgroundColor(color: string): SmzCellFieldGroupBuilder {
    this._data.container.background = color;
    return this;
  }

  public setLabelColor(color: string): SmzCellFieldGroupBuilder {
    this._data.label.color = color;
    return this;
  }

  public setTextColor(color: string): SmzCellFieldGroupBuilder {

    if (this._data.text.color != null) {
      throw new Error(`You already set the text color on the group field`);
    }

    this._data.text.color = color;
    return this;
  }

  public useCentralized(): SmzCellFieldGroupBuilder {
    this._data.container.styles += ' p-align-center';
    this._data.label.styles += ' text-center';
    this._data.text.styles += ' text-center';
    return this;
  }

  public useBold(): SmzCellFieldGroupBuilder {
    this._data.text.fontWeight = '600';
    return this;
  }

  public useAlert(): SmzCellFieldGroupBuilder {

    if (this._data.text.color != null) {
      throw new Error(`You can't use alert on the group field, because it will override your previous text color choice (setTextColor).`);
    }

    this._data.text.color = 'red';
    return this;
  }

  public get group(): SmzCellFieldsGroupBuilder {
    return this._groupBuilder;
  }

}