import { GlobalInjector } from '../../modules/smz-dialogs/services/global-injector';
import { NgxRbkUtilsConfig } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzDocumentContent, SmzDocumentState } from '../../modules/smz-documents/models/smz-document';
import { SmzDocumentContentBuilder } from './document-content';
import { SmzDocumentConfig } from '../../modules/smz-documents/models/smz-document-config';

export class SmzDocumentBuilder {
  private defaultConfig = GlobalInjector.instance.get(NgxRbkUtilsConfig);
  public _state: SmzDocumentState = {
    content: null,
    config: this.getConfig()
  };

  private getConfig(): SmzDocumentConfig {

    if (this.defaultConfig.documents == null || this.defaultConfig.documents.defaultStyles == null) {
      throw new Error(`You need to provide de default styles for documents at rbk config file.`);
    }

    return this.defaultConfig.documents.defaultStyles;
  }

  constructor(state: SmzDocumentState = null) {
    if (state != null) {
      this._state = state;
    }
  }

  public content(): SmzDocumentContentBuilder {
    const content: SmzDocumentContent = { type: 'content', rows: [] };
    this._state.content = content;
    return new SmzDocumentContentBuilder(this, content);
  }

  public debugMode(): SmzDocumentBuilder {
    const debugClasses = ' border-solid border-1 border-red-400';
    this._state.config.title.container += debugClasses;
    return this;
  }

  public build(): SmzDocumentState {
    return this._state;
  }

}