import { GlobalInjector } from '../../modules/smz-dialogs/services/global-injector';
import { NgxRbkUtilsConfig } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzDocumentFontFamilies, SmzDocumentState } from '../../modules/smz-documents/models/smz-document';
import { SmzDocumentContentBuilder } from './document-content';
import { SmzDocumentConfig } from '../../modules/smz-documents/models/smz-document-config';
import cloneDeep from 'lodash-es/cloneDeep';

export class SmzDocumentBuilder {
  private defaultConfig = GlobalInjector.instance.get(NgxRbkUtilsConfig);
  private isDebugMode = false;
  public _state: SmzDocumentState = {
    header: null,
    content: null,
    config: cloneDeep(this.getConfig()),
    globals: cloneDeep(this.getConfig().globals)
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

  public overrideDefaultConfigs(newConfig: SmzDocumentConfig): SmzDocumentBuilder {

    if (this._state.content != null) {
      throw new Error(`You need to call 'overrideDefaultConfigs' before place any content.`);
    }

    if (this.isDebugMode) {
      throw new Error(`You need to call 'overrideDefaultConfigs' before enable debug mode.`);
    }

    this._state.config = newConfig;
    return this;
  }

  public content(): SmzDocumentContentBuilder {
    if (this._state.content == null) this._state.content = { type: 'content', rows: [], cellStyles: '' };
    return new SmzDocumentContentBuilder(this, this._state.content);
  }

  public header(): SmzDocumentContentBuilder {
    if (this._state.header == null) this._state.header = { type: 'content', rows: [], cellStyles: '' };
    return new SmzDocumentContentBuilder(this, this._state.header);
  }

  public debugMode(): SmzDocumentBuilder {

    if (this._state.content == null) this._state.content = { type: 'content', rows: [], cellStyles: '' };

    this.isDebugMode = true;
    const debugClasses = 'border-solid border-1 border-red-400';
    this._state.content.cellStyles = debugClasses;

    return this;
  }

  public setGlobalScale(scale: number): SmzDocumentBuilder {
    this._state.globals.font.scale = `${scale}rem`;
    return this;
  }

  public setFontFamily(fontFamily: SmzDocumentFontFamilies): SmzDocumentBuilder {
    this._state.globals.font.family = fontFamily;
    return this;
  }

  public setHeaderHeight(unit: 'cm', value: number): SmzDocumentBuilder {
    this._state.globals.header.height = `${value}${unit}`;
    return this;
  }

  public build(): SmzDocumentState {
    return this._state;
  }

}