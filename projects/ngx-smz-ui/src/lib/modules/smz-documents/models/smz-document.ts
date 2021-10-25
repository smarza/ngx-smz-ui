import { SmzDocumentConfig } from './smz-document-config';
import { SmzDocumentFeatures } from './smz-document-features';

export interface SmzDocumentState {
  header: SmzDocumentContent;
  content: SmzDocumentContent;
  config: SmzDocumentConfig;
  globals: {
    fontScale: string;
    headerHeight: string;
  }
}

export interface SmzDocumentContent {
  type: 'content';
  rows: SmzDocumentRow[];
  cellStyles: string;
}

export interface SmzDocumentRow {
  cells: SmzDocumentCell[];
}

export interface SmzDocumentCell {
  colspan: number;
  rowspan: number;
  height: string;
  width: string;
  data: SmzDocumentContent | SmzDocumentFeatures;
}


export type SmzDocumentSpanTypes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;