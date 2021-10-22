import { SmzDocumentConfig } from './smz-document-config';
import { SmzDocumentFeatureDefinitions, SmzDocumentFeatures } from './smz-document-features';

export interface SmzDocumentState {
  content: SmzDocumentContent;
  config: SmzDocumentConfig;
}

export interface SmzDocumentContent {
  type: 'content';
  rows: SmzDocumentRow[];
}

export interface SmzDocumentRow {
  cells: SmzDocumentCell[];
}

export interface SmzDocumentCell {
  colspan: number;
  rowspan: number;
  height: string;
  data: SmzDocumentContent | SmzDocumentFeatures;
}


export type SmzDocumentSpanTypes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;