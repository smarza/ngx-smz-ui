
export type SmzDocumentFeatures = SmzDocumentTitle;

export enum SmzDocumentFeatureDefinitions {
  TITLE,
}
export interface SmzDocumentTitle {
  type: SmzDocumentFeatureDefinitions.TITLE;
  container?: {
    background?: string;
    styles?: string;
  }
  text?: {
    value: string;
    styles?: string;
    color?: string;
  }
}