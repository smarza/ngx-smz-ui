import { SmzDocumentTitle } from '../../modules/smz-documents/models/smz-document-features';
import { SmzDocumentBuilder } from './document-builder';
import { SmzDocumentCellBuilder } from './document-content';

export class SmzDocumentFeatureTitleBuilder {
  constructor(private _cellBuilder: SmzDocumentCellBuilder, private _data: SmzDocumentTitle, private _documentBuilder: SmzDocumentBuilder) {

    const defaultConfig = this._documentBuilder._state.config.title;

    _data.container = { styles: defaultConfig.container };
    _data.text.styles = defaultConfig.text;
  }

  public overrideContainerStyles(styleClass: string): SmzDocumentFeatureTitleBuilder {
    this._data.container.styles = styleClass;
    return this;
  }

  public overrideTextStyles(styleClass: string): SmzDocumentFeatureTitleBuilder {
    this._data.text.styles = styleClass;
    return this;
  }

  public setBackgroundColor(color: string): SmzDocumentFeatureTitleBuilder {
    this._data.container.background = color;
    return this;
  }

  public setTextColor(color: string): SmzDocumentFeatureTitleBuilder {
    this._data.text.color = color;
    return this;
  }

  public get cell(): SmzDocumentCellBuilder {
    return this._cellBuilder;
  }
}