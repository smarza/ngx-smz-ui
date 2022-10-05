import { SmzCardsContentTypes, SmzCardsImageContent } from './smz-cards-contents';

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
  image: SmzCardsImageContent;
  title: SmzCardsContentTypes;
  subTitle: SmzCardsContentTypes;
  others: SmzCardsContentTypes[];
}

export interface InfoATemplate extends SmzCardsBaseTemplate {
  type: SmzCardsTemplate.INFO_A;
  verticalBarStyleClass: string;
  header: SmzCardsContentTypes;
  subHeader: SmzCardsContentTypes;
  infos: {
    bulletStyleClass: string;
    content: SmzCardsContentTypes;
  }[];
}