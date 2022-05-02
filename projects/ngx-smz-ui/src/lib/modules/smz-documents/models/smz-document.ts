import { SmzDocumentConfig } from './smz-document-config';
import { SmzDocumentExport } from './smz-document-export';
import { SmzDocumentFeatures } from './smz-document-features';
import { SmzDocumentLocale } from './smz-document-locale';
import { SmzDocumentPaper } from './smz-document-paper';
import { SmzDocumentViewer } from './smz-document-viewer';

export interface SmzDocumentState {
  isDebug: boolean;
  renderer: SmzDocumentRenderers;
  header: SmzDocumentContent;
  contents: SmzDocumentContent[];
  config: SmzDocumentConfig;
  globals: SmzDocumentGlobals;
  summary: {
    text: string;
    showPrintHour: boolean;
    showPageNumbers: boolean;
  }
  paper: SmzDocumentPaper;
  viewer: SmzDocumentViewer;
  export: SmzDocumentExport;
  userPreferences: {
    unit: 'mm' | 'cm'
  }
  locale: SmzDocumentLocale;
}

export type SmzDocumentRenderers = 'html2pdf' | 'jspdf';

export type SmzDocumentFontFamilies = 'Roboto' | 'Open Sans';

export interface SmzDocumentGlobals {
  font: {
    scale: string;
    family: SmzDocumentFontFamilies;
  }
}

export interface SmzDocumentContent {
  type: 'content' | 'page-break';
  rows: SmzDocumentRow[];
  cellStyles: string;
  colsCount: number;
  container?: {
    styles?: string;
  }
}

export interface SmzDocumentRow {
  cells: SmzDocumentCell[];
  id: string;
}

export interface SmzDocumentCell extends SmzDocumentCellConfig {
  data: SmzDocumentContent | SmzDocumentFeatures;
}

export interface SmzDocumentCellConfig {
  colspan: number;
  rowspan: number;
  height: string;
  width: string;
}


export type SmzDocumentSpanTypes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;