import { SmzDocumentBuilder } from './document-builder';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzDocumentViewer } from '../../modules/smz-documents/models/smz-document-viewer';

export class SmzDocumentViewerBuilder extends SmzBuilderUtilities<SmzDocumentViewerBuilder> {
  protected that = this;
  constructor(private _documentBuilder: SmzDocumentBuilder, private _viewer: SmzDocumentViewer) {
    super();
  }

  public overrideContainerStyles(styleClass: string): SmzDocumentViewerBuilder {
    this._viewer.container.styleClass= styleClass;
    return this;
  }

  public overridePaperStyles(styleClass: string): SmzDocumentViewerBuilder {
    this._viewer.paper.styleClass = styleClass;
    return this;
  }

  public setZoom(initial: number, min?: number, max?: number, variation?: number): SmzDocumentViewerBuilder {
    this._viewer.zoom.isEnabled = true;
    this._viewer.zoom.min = min ?? initial;
    this._viewer.zoom.max = max ?? initial;
    this._viewer.zoom.initial = initial;
    this._viewer.zoom.variation = variation ?? initial;
    return this;
  }

  public disableZoomControls(): SmzDocumentViewerBuilder {
    this._viewer.zoom.isEnabled = false;
    return this;
  }

  public allowOpen(): SmzDocumentViewerBuilder {
    this._viewer.open.isEnabled = true;
    return this;
  }

  public allowPrint(): SmzDocumentViewerBuilder {
    this._viewer.print.isEnabled = true;
    return this;
  }

  public allowDownload(): SmzDocumentViewerBuilder {
    this._viewer.download.isEnabled = true;
    return this;
  }

  public get document(): SmzDocumentBuilder {
    return this._documentBuilder;
  }
}