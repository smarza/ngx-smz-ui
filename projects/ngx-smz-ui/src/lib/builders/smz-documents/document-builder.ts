import { GlobalInjector } from '../../modules/smz-dialogs/services/global-injector';
import { NgxRbkUtilsConfig } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzDocumentFontFamilies, SmzDocumentRow, SmzDocumentState } from '../../modules/smz-documents/models/smz-document';
import { SmzDocumentContentBuilder } from './document-content';
import { SmzDocumentConfig } from '../../modules/smz-documents/models/smz-document-config';
import cloneDeep from 'lodash-es/cloneDeep';

export class SmzDocumentBuilder {
  private defaultConfig = GlobalInjector.instance.get(NgxRbkUtilsConfig);
  public _colsCount: number = 0;
  public _state: SmzDocumentState = {
    isDebug: false,
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
    this._state.isDebug = true;
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

    console.log('--------------------');
    console.log('--------------------');
    console.log('--------------------');
    console.log('totalColsCount', this._colsCount);
    console.log('--------------------');

    if (this._state.header != null) {
      const rows = this._state.header.rows;
      rows.forEach(row => {
        normalizeColspan(rows, row, this._colsCount)
      });
    }

    if (this._state.content != null) {
      const rows = this._state.content.rows;
      rows.forEach(row => {
        normalizeColspan(rows, row, this._colsCount)
      });
    }

    return this._state;
  }

}

function normalizeColspan(rows: SmzDocumentRow[], row: SmzDocumentRow, totalColsCount: number): void {

  const debug = false; // row.cells.findIndex(x => (x.data as any)?.text?.value === 'COMPRADOR') !== -1;

  const currentIndex = rows.findIndex(x => x.id === row.id);
  const rowsBefore = rows.slice(0, currentIndex);

  if (debug){
    console.log(`current: ${currentIndex} ${row.id} - before: `, rowsBefore);
    console.log('row', row);
  }

  let cellsMerging = 0;
  const merging = [];
  rowsBefore.reverse().forEach((x, i) => {
    const test = x.cells.filter(c => c.rowspan !== 1 && c.rowspan > i + 1);
    if (test.length > 0) {
      // console.log('yes', test.length);
      cellsMerging += test.length;
      merging.push(test);
    }
  });

  if (cellsMerging > 0) {
    if (debug){
      console.log('cellsMerging', cellsMerging);
      console.log('rowsBefore', rowsBefore);
      console.log('merging', merging);
    }

  }

  const colsCount = row.cells.map(x => x.colspan).reduce((a, b) => (a + b));

  if (debug){
    console.log('if ??', (colsCount + cellsMerging) > totalColsCount);
    console.log('   > colsCount: ', colsCount);
    console.log('   > cellsMerging', cellsMerging);
    console.log('   > totalColsCount', totalColsCount);
  }


  if ((colsCount + cellsMerging) < totalColsCount) {

    if (debug){
      console.group(`was ${row.cells[row.cells.length - 1].colspan}`);
    }

    row.cells[row.cells.length - 1].colspan = totalColsCount - colsCount + row.cells[row.cells.length - 1].colspan;

    if (debug){
      console.log('now', row.cells[row.cells.length - 1].colspan);
      console.log('target', row.cells[row.cells.length - 1]);
      console.groupEnd()
    }

  }
}