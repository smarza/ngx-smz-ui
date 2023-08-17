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

export type SmzCardsTemplates<TData> =
  RawTemplate<TData> |
  ImageWithDetailsTemplate<TData> |
  InfoATemplate<TData> |
  FlipCardTemplate<TData>;

export interface RawTemplate<TData> extends SmzCardsBaseTemplate {
  type: SmzCardsTemplate.RAW;
  listComponent: SmzCardsComponentContent<TData>;
  gridComponent: SmzCardsComponentContent<TData>;
}

export interface ImageWithDetailsTemplate<TData> extends SmzCardsBaseTemplate {
  type: SmzCardsTemplate.IMAGE_WITH_DETAILS;
  cardStyleClass: string;
  contentStyleClass: string;
  image: SmzCardsImageContent<TData>;
  title: SmzCardsContentTypes<TData>;
  subTitle: SmzCardsContentTypes<TData>;
  tags: SmzCardsTextContent<TData>[];
  components: SmzCardsComponentContent<TData>[];
  others: SmzCardsContentTypes<TData>[];
}

export interface InfoATemplate<TData> extends SmzCardsBaseTemplate {
  type: SmzCardsTemplate.INFO_A;
  verticalBarStyleClass: string;
  cardStyleClass: string;
  title: {
    caption: string;
    content: SmzCardsTextContent<TData>;
  };
  subTitle: SmzCardsTextContent<TData>;
  tags: SmzCardsTextContent<TData>[];
  tagsContainerStyleClass: string;
  infosContainerStyleClass: string;
  infos: {
    bulletStyleClass: string;
    caption: string;
    content: SmzCardsTextContent<TData>;
  }[];
}

export interface SmzCardsIconContent {
  icon: string;
  styleClass: string;
  value: any;
  tooltip?: string;
  appendText: string;

}

export interface FlipCardTemplate<TData> extends SmzCardsBaseTemplate {
  _context: SmzFlipCardContext;
  onChange: (changes: SmzFlipCardChanges) => void;
  type: SmzCardsTemplate.FLIP_CARD;
  width: string;
  height: string;
  cardStyleClass: string;
  contentStyleClass: string;
  front: SmzFlipCardSide<TData>;
  back: SmzFlipCardSide<TData>;
  buttonsLocation: 'front' | 'back';
  menuLocation: 'front' | 'back';

}

export interface SmzFlipCardSide<TData> {
  image: SmzCardsImageContent<TData>;
  component: SmzCardsComponentContent<TData>;
  html: string;
}