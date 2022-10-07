import { SmzCardsContentTypes, SmzCardsImageContent, SmzCardsTextContent } from './smz-cards-contents';

export interface SmzCardsBaseTemplate {
  type: SmzCardsTemplate;
}

export enum SmzCardsTemplate {
  RAW = 0,
  IMAGE_WITH_DETAILS = 1,
  INFO_A = 2,
}

export type SmzCardsTemplates =
  RawTemplate |
  ImageWithDetailsTemplate |
  InfoATemplate;

export interface RawTemplate extends SmzCardsBaseTemplate {
  type: SmzCardsTemplate.RAW;

}

export interface ImageWithDetailsTemplate extends SmzCardsBaseTemplate {
  type: SmzCardsTemplate.IMAGE_WITH_DETAILS;
  cardStyleClass: string;
  contentStyleClass: string;
  image: SmzCardsImageContent;
  title: SmzCardsContentTypes;
  subTitle: SmzCardsContentTypes;
  tags: SmzCardsTextContent[];
  others: SmzCardsContentTypes[];
}

export interface InfoATemplate extends SmzCardsBaseTemplate {
  type: SmzCardsTemplate.INFO_A;
  verticalBarStyleClass: string;
  cardStyleClass: string;
  title: {
    caption: string;
    content: SmzCardsTextContent;
  };
  subTitle: SmzCardsTextContent;
  tags: SmzCardsTextContent[];
  infos: {
    bulletStyleClass: string;
    caption: string;
    content: SmzCardsTextContent;
  }[];
}

export interface SmzCardsIconContent {
  icon: string;
  styleClass: string;
  value: any;
  tooltip?: string;
  appendText: string;

}