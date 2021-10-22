
export type SmzDocumentFeatures = SmzDocumentTitle | SmzDocumentDivider;

export enum SmzDocumentFeatureDefinitions {
  TITLE,
  DIVIDER
}
export interface SmzDocumentBaseCell {
  type: SmzDocumentFeatureDefinitions;
}

export interface SmzDocumentTitle extends SmzDocumentBaseCell {
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

export interface SmzDocumentDivider extends SmzDocumentBaseCell {
  type: SmzDocumentFeatureDefinitions.DIVIDER;
  styles?: string;

}
