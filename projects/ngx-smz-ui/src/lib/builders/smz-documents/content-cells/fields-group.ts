import cloneDeep from 'lodash-es/cloneDeep';
import { SmzDocumentCell } from '../../../modules/smz-documents/models/smz-document';
import { SmzDocumentFeatureDefinitions, SmzDocumentFieldGroup, SmzDocumentFieldsGroup } from '../../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBaseCellBuilder, SmzDocumentWidthTypes } from '../document-base-cell';
import { SmzDocumentBuilder } from '../document-builder';
import { SmzDocumentRowBuilder } from '../document-content';

export class SmzCellFieldsGroupBuilder extends SmzDocumentBaseCellBuilder<SmzCellFieldsGroupBuilder> {
  protected override that = this;
  constructor(public override _rowBuilder: SmzDocumentRowBuilder, public override _cell: SmzDocumentCell, public override _data: SmzDocumentFieldsGroup, public override _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
    const defaultConfig = cloneDeep(this._documentBuilder._state.config);
    _data.container = { styles: defaultConfig.fieldsGroup.container };
  }

  public overrideContainerStyles(styleClass: string): SmzCellFieldsGroupBuilder {
    this._data.container.styles = styleClass;
    return this.that;
  }

  public addContainerStyles(styleClass: string): SmzCellFieldsGroupBuilder {
    this._data.container.styles += ' ' + styleClass;
    return this.that;
  }

  public useBorder(): SmzCellFieldsGroupBuilder {
    return this.addContainerStyles('smz-document-border');
  }

  public setBackgroundColor(color: string): SmzCellFieldsGroupBuilder {
    this._data.container.background = `${color} !important`;
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
      flexWidth: 'col'
    };

    this._groupBuilder._data.fields.push(this._data)

  }

  public setWidth(width: SmzDocumentWidthTypes): SmzCellFieldGroupBuilder {
    const newStyle = width === 'auto' ? 'col' : `${width}`;
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

  public addContainerStyles(styleClass: string): SmzCellFieldGroupBuilder {
    this._data.container.styles += ' ' + styleClass;
    return this;
  }

  public useBorder(): SmzCellFieldGroupBuilder {
    return this.addContainerStyles('smz-document-border');
  }

  public addLabelStyles(styleClass: string): SmzCellFieldGroupBuilder {
    this._data.label.styles += ' ' + styleClass;
    return this;
  }

  public addTextStyles(styleClass: string): SmzCellFieldGroupBuilder {
    this._data.text.styles += ' ' + styleClass;
    return this;
  }

  public setBackgroundColor(color: string): SmzCellFieldGroupBuilder {
    this._data.container.background = `${color} !important`;
    return this;
  }

  public setLabelColor(color: string): SmzCellFieldGroupBuilder {
    this._data.label.color = `${color} !important`;
    return this;
  }

  public setTextColor(color: string): SmzCellFieldGroupBuilder {

    if (this._data.text.color != null) {
      throw new Error(`You already set the text color on the group field`);
    }

    this._data.text.color = `${color} !important`;
    return this;
  }

  public useCentralized(): SmzCellFieldGroupBuilder {
    this._data.container.styles += ' items-center';
    this._data.label.styles += ' text-center';
    this._data.text.styles += ' text-center';
    return this;
  }

  public useBold(): SmzCellFieldGroupBuilder {
    this._data.text.fontWeight = '700 !important';
    return this;
  }

  public useAlert(): SmzCellFieldGroupBuilder {

    if (this._data.text.color != null) {
      throw new Error(`You can't use alert on the group field, because it will override your previous text color choice (setTextColor).`);
    }

    this._data.text.color = 'red !important';
    return this;
  }

  public get group(): SmzCellFieldsGroupBuilder {
    return this._groupBuilder;
  }

}
