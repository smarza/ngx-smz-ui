import { SmzDocumentCell } from '../../../modules/smz-documents/models/smz-document';
import { SmzDocumentImage } from '../../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBaseCellBuilder } from '../document-base-cell';
import { SmzDocumentBuilder } from '../document-builder';
import { SmzDocumentRowBuilder } from '../document-content';

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