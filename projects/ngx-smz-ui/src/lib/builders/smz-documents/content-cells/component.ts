import cloneDeep from 'lodash-es/cloneDeep';
import { SmzDocumentCell } from '../../../modules/smz-documents/models/smz-document';
import { SmzDocumentComponent } from '../../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBaseCellBuilder, SmzDocumentWidthTypes } from '../document-base-cell';
import { SmzDocumentBuilder } from '../document-builder';
import { SmzDocumentRowBuilder } from '../document-content';

export class SmzCellComponentBuilder extends SmzDocumentBaseCellBuilder<SmzCellComponentBuilder> {
  protected that = this;
  constructor(public _rowBuilder: SmzDocumentRowBuilder, public _cell: SmzDocumentCell, public _data: SmzDocumentComponent, public _documentBuilder: SmzDocumentBuilder) {
    super(_rowBuilder, _cell, _data, _documentBuilder);
    const defaultConfig = cloneDeep(this._documentBuilder._state.config);
    _data.container = { styles: defaultConfig.components.container };
  }

  public addInput(input: string, data: any): SmzCellComponentBuilder {
    this._data.content.component.inputs.push({input, data});
    return this;
  }

  public addOutput(output: string, callback: (data: any) => void): SmzCellComponentBuilder {
    this._data.content.component.outputs.push({output, callback});
    return this;
  }

  public overrideContainerStyles(styleClass: string): SmzCellComponentBuilder {
    this._data.container.styles = styleClass;
    return this.that;
  }

  public addContainerStyles(styleClass: string): SmzCellComponentBuilder {
    this._data.container.styles += ' ' + styleClass;
    return this.that;
  }

  public useBorder(): SmzCellComponentBuilder {
    return this.addContainerStyles('smz-document-border');
  }

  public setContainerBackgroundColor(color: string): SmzCellComponentBuilder {
    this._data.container.background = `${color} !important`;
    return this.that;
  }

  public setWidth(width: SmzDocumentWidthTypes): SmzCellComponentBuilder {
    const newStyle = width === 'auto' ? 'col' : `${width}`;
    this._data.flexWidth = newStyle;
    return this;
  }



}