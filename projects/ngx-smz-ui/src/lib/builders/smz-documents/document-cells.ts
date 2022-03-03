import { SmzDocumentCell } from '../../modules/smz-documents/models/smz-document';
import { SmzDocumentChart, SmzDocumentDivider, SmzDocumentFeatureDefinitions, SmzDocumentField, SmzDocumentFieldGroup, SmzDocumentFieldsGroup, SmzDocumentImage, SmzDocumentPageBreak, SmzDocumentSpacer, SmzDocumentSubTitle, SmzDocumentTable, SmzDocumentTableColumn, SmzDocumentTitle } from '../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBuilder } from './document-builder';
import { SmzDocumentBaseCellBuilder, SmzDocumentWidthTypes } from './document-base-cell';
import { SmzDocumentRowBuilder } from './document-content';
import cloneDeep from 'lodash-es/cloneDeep';
import { Observable, of } from 'rxjs';
import { GlobalInjector } from '../../modules/smz-dialogs/services/global-injector';
import { Store } from '@ngxs/store';

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


export class SmzCellPageBreakBuilder extends SmzDocumentBaseCellBuilder<SmzCellPageBreakBuilder> {
  protected that = this;
  constructor(public _rowBuilder: SmzDocumentRowBuilder, public _cell: SmzDocumentCell, public _data: SmzDocumentPageBreak, public _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
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

  public addContainerStyles(styleClass: string): SmzCellImageBuilder {
    this._data.container.styles += ' ' + styleClass;
    return this.that;
  }

  public useBorder(): SmzCellImageBuilder {
    return this.addContainerStyles('smz-document-border');
  }

  public addImageStyles(styleClass: string): SmzCellImageBuilder {
    this._data.image.styles += ' ' + styleClass;
    return this.that;
  }

  public setBackgroundColor(color: string): SmzCellImageBuilder {
    this._data.container.background = `${color} !important`;
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

export class SmzCellTableBuilder extends SmzDocumentBaseCellBuilder<SmzCellTableBuilder> {
  protected that = this;
  constructor(public _rowBuilder: SmzDocumentRowBuilder, public _cell: SmzDocumentCell, public _data: SmzDocumentTable, public _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
    const defaultConfig = cloneDeep(this._documentBuilder._state.config);
    _data.container = { styles: defaultConfig.tables.container };
    _data.header = { styles: defaultConfig.tables.header.container, isVisible: false, columns: [] };
    _data.content = { styles: defaultConfig.tables.content };
  }

  // public setWidth(width: SmzDocumentWidthTypes): SmzCellTableBuilder {
  //   let newWidth = 'unset';

  //   if (width !== 'auto')
  //   {
  //     const size = Number(width.split('-')[1]);
  //     newWidth = `${(100/12) * size}%`;
  //   }

  //   this._cell.width = newWidth;
  //   return this;
  // }

  public overrideContainerStyles(styleClass: string): SmzCellTableBuilder {
    this._data.container.styles = styleClass;
    return this.that;
  }

  public addContainerStyles(styleClass: string): SmzCellTableBuilder {
    this._data.container.styles += ' ' + styleClass;
    return this.that;
  }

  public useBorder(): SmzCellTableBuilder {
    return this.addContainerStyles('smz-document-border');
  }

  public setContainerBackgroundColor(color: string): SmzCellTableBuilder {
    this._data.container.background = `${color} !important`;
    return this.that;
  }

  public overrideStyles(header?: string, content?: string): SmzCellTableBuilder {
    this._data.header.styles = header ?? this._data.header.styles;
    this._data.content.styles = content ?? this._data.content.styles;
    return this.that;
  }

  public setBackgroundColor(header?: string, content?: string): SmzCellTableBuilder {
    this._data.header.background = header ?? this._data.header.background;
    this._data.content.background = content ?? this._data.content.background;
    return this.that;
  }

  public setTextColor(header?: string, content?: string): SmzCellTableBuilder {
    this._data.header.color = header ?? this._data.header.color;
    this._data.content.color = content ?? this._data.content.color;
    return this.that;
  }

  public addColumn(property: string, label?: string): SmzCellTableColumnBuilder {
    this._data.header.isVisible = true;
    return new SmzCellTableColumnBuilder(this, property, label, this._documentBuilder);
  }

  public setSource(selector?: any, items$?: Observable<any[]>, items?: any[]): SmzCellTableBuilder {
    if (selector != null) {
      const store = GlobalInjector.instance.get(Store);
      this._data.content.items$ = store.select(selector);
    }
    else if (items$ != null) {
      this._data.content.items$ = items$;
    }
    else if (items != null) {
      this._data.content.items$ = of(items);
    }
    else {
      throw new Error(`You need to provide at least one type of items to the table (setSource())`);
    }
    return this.that;
  }

}

export class SmzCellTableColumnBuilder {
  private _data: SmzDocumentTableColumn;
  constructor(public _tableBuilder: SmzCellTableBuilder, property: string, label: string, public _documentBuilder: SmzDocumentBuilder) {

    const defaultConfig = cloneDeep(this._documentBuilder._state.config);

    this._data = {
      colspan: 1,
      rowspan: 1,
      height: 'auto',
      width: 'auto',
      value: label,
      property,
      dataTransform: null,
      headerStyles: {
        styles: defaultConfig.tables.header.columns
      },
      contentStyles: {
        styles: defaultConfig.tables.content
      }
    };

    this._tableBuilder._data.header.columns.push(this._data)

  }

  // public setRowspan(rowsCount: number): SmzCellTableColumnBuilder {
  //   this._data.rowspan = rowsCount;
  //   return this;
  // }

  // public setColspan(colsCount: number): SmzCellTableColumnBuilder {
  //   this._data.colspan = colsCount;
  //   return this;
  // }

  public setHeight(height: string): SmzCellTableColumnBuilder {
    this._data.height = height;
    return this;
  }

  public setWidth(width: SmzDocumentWidthTypes): SmzCellTableColumnBuilder {
    let newWidth = 'unset';

    if (width !== 'auto')
    {
      const size = Number(width.split('-')[1]);
      newWidth = `${(100/12) * size}%`;
    }

    this._data.width = newWidth;
    return this;
  }

  public overrideStyles(header?: string, content?: string): SmzCellTableColumnBuilder {
    this._data.headerStyles.styles = header ?? this._data.headerStyles.styles;
    this._data.contentStyles.styles = content ?? this._data.contentStyles.styles;
    return this;
  }

  public setBackgroundColor(header?: string, content?: string): SmzCellTableColumnBuilder {
    this._data.headerStyles.background = header ?? this._data.headerStyles.background;
    this._data.contentStyles.background = content ?? this._data.contentStyles.background;
    return this;
  }

  public setTextColor(header?: string, content?: string): SmzCellTableColumnBuilder {
    this._data.headerStyles.color = header ?? this._data.headerStyles.color;
    this._data.contentStyles.color = content ?? this._data.contentStyles.color;
    return this;
  }

  public useCentralized(): SmzCellTableColumnBuilder {
    this._data.contentStyles.styles += ' items-center text-center';
    this._data.headerStyles.styles += ' items-center text-center';
    return this;
  }

  public dataTransform(callback: (value: string, row: any, index: number) => string): SmzCellTableColumnBuilder {
    this._data.dataTransform = callback;
    return this;
  }

  public get table(): SmzCellTableBuilder {
    return this._tableBuilder;
  }

}

export class SmzCellChartBuilder extends SmzDocumentBaseCellBuilder<SmzCellChartBuilder> {
  protected that = this;
  constructor(public _rowBuilder: SmzDocumentRowBuilder, public _cell: SmzDocumentCell, public _data: SmzDocumentChart, public _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
    const defaultConfig = cloneDeep(this._documentBuilder._state.config);
    _data.container = { styles: defaultConfig.charts.container };
  }

  public overrideContainerStyles(styleClass: string): SmzCellChartBuilder {
    this._data.container.styles = styleClass;
    return this.that;
  }

  public addContainerStyles(styleClass: string): SmzCellChartBuilder {
    this._data.container.styles += ' ' + styleClass;
    return this.that;
  }

  public useBorder(): SmzCellChartBuilder {
    return this.addContainerStyles('smz-document-border');
  }

  public setContainerBackgroundColor(color: string): SmzCellChartBuilder {
    this._data.container.background = `${color} !important`;
    return this.that;
  }

  public setWidth(width: SmzDocumentWidthTypes): SmzCellChartBuilder {
    const newStyle = width === 'auto' ? 'col' : `${width}`;
    this._data.flexWidth = newStyle;
    return this;
  }

}