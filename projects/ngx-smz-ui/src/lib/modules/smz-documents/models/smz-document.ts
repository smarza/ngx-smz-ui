import { SmzDocumentConfig } from './smz-document-config';
import { SmzDocumentFeatures } from './smz-document-features';
import { SmzDocumentPaper } from './smz-document-paper';
import { SmzDocumentViewer } from './smz-document-viewer';

export interface SmzDocumentState {
  isDebug: boolean;
  header: SmzDocumentContent;
  content: SmzDocumentContent;
  config: SmzDocumentConfig;
  globals: SmzDocumentGlobals;
  summary: {
    text: string;
    showPrintHour: boolean;
    showPageNumbers: boolean;
  }
  paper: SmzDocumentPaper;
  viewer: SmzDocumentViewer;
}

export type SmzDocumentFontFamilies = 'Roboto' | 'Open Sans';

export interface SmzDocumentGlobals {
  font: {
    scale: string;
    family: SmzDocumentFontFamilies;
  }
}

export interface SmzDocumentContent {
  type: 'content';
  rows: SmzDocumentRow[];
  cellStyles: string;
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