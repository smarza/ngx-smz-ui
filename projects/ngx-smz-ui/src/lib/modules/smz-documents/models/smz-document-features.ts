
export type SmzDocumentFeatures = SmzDocumentTitle | SmzDocumentDivider | SmzDocumentField | SmzDocumentImage | SmzDocumentSpacer | SmzDocumentSubTitle | SmzDocumentFieldsGroup;

export enum SmzDocumentFeatureDefinitions {
  DIVIDER,
  FIELD,
  FIELDS_GROUP,
  IMAGE,
  SPACER,
  SUB_TITLE,
  TITLE,

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

export interface SmzDocumentSubTitle extends SmzDocumentBaseCell {
  type: SmzDocumentFeatureDefinitions.SUB_TITLE;
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

export interface SmzDocumentFieldsGroup extends SmzDocumentBaseCell {
  type: SmzDocumentFeatureDefinitions.FIELDS_GROUP;

  container?: {
    background?: string;
    styles?: string;
  }

  fields: SmzDocumentFieldGroup[]
}

export interface SmzDocumentFieldGroup extends SmzDocumentField {
  flexWidth: string;
}

export interface SmzDocumentImage extends SmzDocumentBaseCell {
  type: SmzDocumentFeatureDefinitions.IMAGE;
  container?: {
    background?: string;
    styles?: string;
  }
  image?: {
    src: string;
    width: string;
    styles?: string;
  }

}

export interface SmzDocumentSpacer extends SmzDocumentBaseCell {
  type: SmzDocumentFeatureDefinitions.SPACER;
  height: string;
  styles?: string;

}