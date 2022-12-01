import { GlobalInjector } from '../../modules/smz-dialogs/services/global-injector';
import { NgxRbkUtilsConfig } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzDocumentContent, SmzDocumentFontFamilies, SmzDocumentRenderers, SmzDocumentRow, SmzDocumentState } from '../../modules/smz-documents/models/smz-document';
import { SmzDocumentContentBuilder } from './document-content';
import { SmzDocumentConfig } from '../../modules/smz-documents/models/smz-document-config';
import cloneDeep from 'lodash-es/cloneDeep';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzDocumentViewerBuilder } from './document-viewer';
import { HTMLOptions, jsPDFOptions } from 'jspdf';
import { SmzDocumentPageFormats, SmzPageFormatsInPt } from '../../modules/smz-documents/models/smz-page-formats';
import { isArray } from '../../common/utils/utils';

// HTML2PDF
// https://ekoopmans.github.io/html2pdf.js/#usage

// JSPDF OPTIONS
// https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html

// HTML2CANVAS OPTIONS
// https://html2canvas.hertzen.com/configuration

export class SmzDocumentBuilder extends SmzBuilderUtilities<SmzDocumentBuilder> {
  protected that = this;
  private defaultConfig = GlobalInjector.instance.get(NgxRbkUtilsConfig);
  public _state: SmzDocumentState = {
    isDebug: false,
    renderer: 'html2pdf',
    header: null,
    contents: [],
    config: null,
    globals: null,
    paper: {
      headerMargin: {
        top: null,
        left: null,
        right: null
      },
    },
    summary: {
      text: null,
      showPrintHour: true,
      showPageNumbers: true
    },
    viewer: {
      zoom: {
        isEnabled: true,
        min: 1,
        max: 2.5,
        initial: 1,
        variation: 2.5 / 5
      },
      open: {
        isEnabled: false,
        label: 'Abrir'
      },
      print: {
        isEnabled: false,
        label: 'Imprimir'
      },
      download: {
        isEnabled: false,
        label: 'Exportar'
      },
      container: {
        styleClass: null
      },
      paper: {
        styleClass: null,
        ptWidth: 0,
        ptHeight: 0
      }
    },
    export: {
      filename: 'sample',
      jsPDFOptions: null,
      htmlOptions: null,
      html2pdfOptions: {
        html2canvas: { scale: 1, useCORS: false, allowTaint: false, dpi: 96, letterRendering: true }
      },
      margin: {
        top: 1,
        left: 1,
        bottom: 1,
        right: 1,
      },
      paddingCompensation: '4px !important',
      pageOverlapCompensation: 0
    },
    userPreferences: {
      unit: 'mm'
    },
    locale: null,
  };

  private applyConfig(): void {

    if (this.defaultConfig.documents == null || this.defaultConfig.documents.defaultStyles == null) {
      throw new Error(`You need to provide de default styles for documents at rbk config file.`);
    }
    const config = cloneDeep(this.defaultConfig.documents.defaultStyles);

    this._state.config = config;
    this._state.globals = config.globals;
    this._state.viewer.container.styleClass = config.viewer.container;
    this._state.viewer.paper.styleClass = config.viewer.paper;
  }

  private applyMargin(left?: number, right?: number, top?: number, bottom?: number): void {

    let factor = 1;

    switch (this._state.userPreferences.unit) {
      case 'cm':
        factor = 28.3465;
        break;
      case 'mm':
        factor = 2.8346;
          break;
      default:
        break;
    }
    this._state.export.margin.left = left * factor;
    this._state.export.margin.right = right * factor;
    this._state.export.margin.top = top * factor;
    this._state.export.margin.bottom = bottom * factor;
  }

  private initJsPDFOptions(): void {
    this._state.export.jsPDFOptions = {
      unit: 'pt',
      // userUnit: 1,
      precision: 2,
      compress: true,
      putOnlyUsedFonts: true,
      hotfixes: ['px_scaling'],
    };

    this.setPageConfig('a4', 'portrait');
  }

  private updateHtml2pdfOptions(): void {
    this._state.export.html2pdfOptions = {
      ...this._state.export.html2pdfOptions,
      margin: this._state.export.htmlOptions.margin,
      filename: `${this._state.export.filename}.pdf`,
      pagebreak: {
        // mode: ['avoid-all', 'css', 'legacy'],
        avoid: ['tr', '.avoid-break', 'img', 'canvas'],
        before: ['.page-break-tag']
      },
      enableLinks: true,
      // image: { type: 'jpeg', quality: 0.98 },
      jsPDF: cloneDeep(this._state.export.jsPDFOptions)
    };

  }

  private setPageConfig(format: SmzDocumentPageFormats | number[], orientation: 'portrait' | 'p' | 'l' | 'landscape'): void {
    this._state.export.jsPDFOptions.format = format;
    this._state.export.jsPDFOptions.orientation = orientation;

    const sizes = isArray(format) ? format : SmzPageFormatsInPt[format as string];

    const widthIndex = (orientation == 'p' || orientation == 'portrait') ? 0 : 1;
    const heightIndex = (orientation == 'p' || orientation == 'portrait') ? 1 : 0;

    this._state.viewer.paper.ptWidth = sizes[widthIndex];
    this._state.viewer.paper.ptHeight = sizes[heightIndex];
  }

  private updateHTMLOptions(): void {
    const width = this._state.viewer.paper.ptWidth;
    const marginX = this._state.export.margin.left + this._state.export.margin.right;

    this._state.export.htmlOptions = {
      width: width - marginX,
      windowWidth: (width - marginX) * 1.65,
      margin: [this._state.export.margin.top, this._state.export.margin.left, this._state.export.margin.bottom, this._state.export.margin.right],
      autoPaging: true,
      x: 0,
      y: 0,
      html2canvas: {
        svgRendering: true,
        letterRendering: true
      },
    };

  }

  constructor(state: SmzDocumentState = null) {
    super();

    if (state != null) {
      this._state = state;
    }

    this.initJsPDFOptions();
    this.applyConfig();
    this.setLocale('pt-BR');
  }

  public setPaddingCompensation(pixels: number): SmzDocumentBuilder {
    this._state.export.paddingCompensation = `${pixels}px !important`;
    return this;
  }

  public setPageOverlapCompensation(pixels: number): SmzDocumentBuilder {
    this._state.export.pageOverlapCompensation = pixels;
    return this;
  }

  public setUnit(unit: 'mm' | 'cm'): SmzDocumentBuilder {
    this._state.userPreferences.unit = unit;
    return this;
  }

  public setRenderer(render: SmzDocumentRenderers): SmzDocumentBuilder {
    this._state.renderer = render;
    return this;
  }

  public setQuality(scale: number): SmzDocumentBuilder {

    if (this._state.renderer != 'html2pdf') {
      throw new Error(`Set Quality is only available for html2pdf Renderer.`);
    }

    this._state.export.html2pdfOptions.html2canvas.scale = scale;
    return this;
  }

  public overrideDefaultConfigs(newConfig: SmzDocumentConfig): SmzDocumentBuilder {

    if (this._state.contents.length > 0) {
      throw new Error(`You need to call 'overrideDefaultConfigs' before place any content.`);
    }

    this._state.config = newConfig;
    return this;
  }

  public setPage(format: SmzDocumentPageFormats | number[], orientation: 'portrait' | 'p' | 'l' | 'landscape'): SmzDocumentBuilder {
    this.setPageConfig(format, orientation);
    return this;
  }

  public overrideJsPDFOptions(options: jsPDFOptions): SmzDocumentBuilder {
    this._state.export.jsPDFOptions = { ...this._state.export.jsPDFOptions, ...options };
    return this;
  }

  public overrideHTMLOptions(options: HTMLOptions): SmzDocumentBuilder {
    this._state.export.htmlOptions = { ...this._state.export.htmlOptions, ...options };
    return this;
  }

  public setFilename(filename: string): SmzDocumentBuilder {
    this._state.export.filename = filename;
    return this;
  }

  public viewer(): SmzDocumentViewerBuilder {
    return new SmzDocumentViewerBuilder(this, this._state.viewer);
  }


  public pageBreak(): SmzDocumentBuilder {

    if (this._state.renderer == 'jspdf') {
      throw new Error(`Page Break doen't work with jspdf renderer`);
    }

    const newContent: SmzDocumentContent = { type: 'page-break', rows: [], cellStyles: '', colsCount: 0, breakPage: { enabled: true } };
    this._state.contents.push(newContent);

    return this;
  }

  public content(): SmzDocumentContentBuilder {
    const newContent: SmzDocumentContent = { type: 'content', rows: [], cellStyles: '', colsCount: 0, breakPage: { enabled: false }  };
    this._state.contents.push(newContent);
    return new SmzDocumentContentBuilder(this, newContent);
  }

  public header(): SmzDocumentContentBuilder {
    if (this._state.header == null) this._state.header = { type: 'content', rows: [], cellStyles: '', colsCount: 0, breakPage: { enabled: false }  };
    return new SmzDocumentContentBuilder(this, this._state.header);
  }

  public debugMode(): SmzDocumentBuilder {
    if (this._state.contents.length > 0) {
      throw new Error(`You need set debugMode before add any contents.`);
    }

    this._state.isDebug = true;
    return this;
  }

  public hidePageNumbers(): SmzDocumentBuilder {
    this._state.summary.showPageNumbers = false;
    return this;
  }

  public hidePrintHour(): SmzDocumentBuilder {
    this._state.summary.showPrintHour = false;
    return this;
  }

  public setSummaryText(text: string): SmzDocumentBuilder {
    this._state.summary.text = text;
    return this;
  }

  public setPreviewScale(scale: number): SmzDocumentBuilder {
    this._state.globals.font.scale = `${scale}rem`;
    return this;
  }

  public setFontFamily(fontFamily: SmzDocumentFontFamilies): SmzDocumentBuilder {
    this._state.globals.font.family = fontFamily;
    return this;
  }


  public setMargins(left?: number, right?: number, top?: number, bottom?: number): SmzDocumentBuilder {
    this.applyMargin(left, right, top, bottom);
    return this;
  }

  public setLocale(language: 'pt-BR' | 'en-US'): SmzDocumentBuilder {

    switch (language) {
      case 'pt-BR':
        this._state.locale = {
          code: language,
          pageNumbers: {
            page: 'Página',
            of: 'de'
          },
        };

        break;

      case 'en-US':

        this._state.locale = {
          code: language,
          pageNumbers: {
            page: 'Page',
            of: 'of'
          },
        };

        break;

      default:
        break;
    }

    return this;
  }

  public build(): SmzDocumentState {

    if (this._state.header != null) {
      const rows = this._state.header.rows;
      rows.forEach(row => {
        normalizeColspan(rows, row, this._state.header.colsCount)
      });
    }

    if (this._state.contents != null) {

      this._state.contents.forEach(content => {
        const rows = content.rows;
        rows.forEach(row => {
          normalizeColspan(rows, row, content.colsCount)
        });
      });

    }

    this.updateHTMLOptions();
    this.updateHtml2pdfOptions();

    if (this._state.isDebug) {
      console.log(this._state);
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