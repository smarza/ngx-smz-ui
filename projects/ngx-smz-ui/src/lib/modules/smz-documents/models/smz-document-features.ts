
export type SmzDocumentFeatures = SmzDocumentTitle | SmzDocumentDivider | SmzDocumentField;

export enum SmzDocumentFeatureDefinitions {
  TITLE,
  DIVIDER,
  FIELD
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

export interface SmzDocumentField extends SmzDocumentBaseCell {
  type: SmzDocumentFeatureDefinitions.FIELD;
  container?: {
    background?: string;
    styles?: string;
  }
  label?: {
    value: string;
    styles?: string;
    color?: string;
    isVisible?: boolean;
  }
  text?: {
    value: string;
    styles?: string;
    color?: string;
    fontWeight?: string;
  }
}
