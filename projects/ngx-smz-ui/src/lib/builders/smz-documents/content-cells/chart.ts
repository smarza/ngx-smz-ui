import cloneDeep from 'lodash-es/cloneDeep';
import { SmzDocumentCell } from '../../../modules/smz-documents/models/smz-document';
import { SmzDocumentChart } from '../../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBaseCellBuilder, SmzDocumentWidthTypes } from '../document-base-cell';
import { SmzDocumentBuilder } from '../document-builder';
import { SmzDocumentRowBuilder } from '../document-content';

export class SmzCellChartBuilder extends SmzDocumentBaseCellBuilder<SmzCellChartBuilder> {
  protected override that = this;
  constructor(public override _rowBuilder: SmzDocumentRowBuilder, public override _cell: SmzDocumentCell, public override _data: SmzDocumentChart, public override _documentBuilder: SmzDocumentBuilder) {
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

  public override setWidth(width: SmzDocumentWidthTypes): SmzCellChartBuilder {
    const newStyle = width === 'auto' ? 'col' : `${width}`;
    this._data.flexWidth = newStyle;
    return this;
  }

  public override setHeight(height: string): SmzCellChartBuilder {
    this._cell.height = height;
    this._data.height = height;
    return this.that;
  }

}