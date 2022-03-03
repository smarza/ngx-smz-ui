import { Observable } from 'rxjs';
import { SmzChart } from '../../smz-charts/models/chart';
import { SmzDocumentCellConfig } from './smz-document';

export type SmzDocumentFeatures = SmzDocumentTitle | SmzDocumentDivider | SmzDocumentField | SmzDocumentImage | SmzDocumentSpacer | SmzDocumentSubTitle | SmzDocumentFieldsGroup | SmzDocumentTable | SmzDocumentChart | SmzDocumentPageBreak;

export enum SmzDocumentFeatureDefinitions {
  DIVIDER,
  FIELD,
  FIELDS_GROUP,
  IMAGE,
  SPACER,
  SUB_TITLE,
  TITLE,
  TABLE,
  CHART,
  PAGE_BREAK

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

export interface SmzDocumentPageBreak extends SmzDocumentBaseCell {
  type: SmzDocumentFeatureDefinitions.PAGE_BREAK;

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

export interface SmzDocumentTable extends SmzDocumentBaseCell {
  type: SmzDocumentFeatureDefinitions.TABLE;
  container?: {
    background?: string;
    styles?: string;
  }

  header?: {
    isVisible: boolean;
    columns: SmzDocumentTableColumn[];
    background?: string;
    styles?: string;
    color?: string;
  }
  content?: {
    styles?: string;
    background?: string;
    color?: string;
    items$?: Observable<any[]>
  }
}

export interface SmzDocumentTableColumn extends SmzDocumentCellConfig {
  value: string;
  property: string;
  dataTransform: (value: string, row: any, index: number) => string;
  headerStyles: {
    background?: string;
    color?: string;
    styles?: string;
  }
  contentStyles: {
    background?: string;
    color?: string;
    styles?: string;
  }
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

export interface SmzDocumentChart extends SmzDocumentBaseCell {
  type: SmzDocumentFeatureDefinitions.CHART;
  container?: {
    background?: string;
    styles?: string;
  }
  content?: {
    chartData?: SmzChart
  }
  flexWidth: string;
}