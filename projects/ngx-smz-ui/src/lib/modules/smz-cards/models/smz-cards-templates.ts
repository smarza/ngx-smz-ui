import { SmzCardsBaseContext } from './contexts/smz-base-context';
import { SmzFlipCardChanges, SmzFlipCardContext } from './contexts/smz-flip-card-context';
import { SmzCardsComponentContent, SmzCardsContentTypes, SmzCardsImageContent, SmzCardsTextContent } from './smz-cards-contents';

export interface SmzCardsBaseTemplate {
  _context: SmzCardsBaseContext;
  type: SmzCardsTemplate;
  globalFilterProperties: string[];
}

export enum SmzCardsTemplate {
  RAW = 0,
  IMAGE_WITH_DETAILS = 1,
  INFO_A = 2,
  FLIP_CARD
}

export type SmzCardsTemplates =
  RawTemplate |
  ImageWithDetailsTemplate |
  InfoATemplate |
  FlipCardTemplate;

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
  components: SmzCardsComponentContent[];
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
  tagsContainerStyleClass: string;
  infosContainerStyleClass: string;
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

export interface FlipCardTemplate extends SmzCardsBaseTemplate {
  _context: SmzFlipCardContext;
  onChange: (changes: SmzFlipCardChanges) => void;
  type: SmzCardsTemplate.FLIP_CARD;
  width: string;
  height: string;
  cardStyleClass: string;
  contentStyleClass: string;
  front: SmzFlipCardSide;
  back: SmzFlipCardSide;
  buttonsLocation: 'front' | 'back';
  menuLocation: 'front' | 'back';

}

export interface SmzFlipCardSide {
  image: SmzCardsImageContent;
  component: SmzCardsComponentContent;
  html: string;
}