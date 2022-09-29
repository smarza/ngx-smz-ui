import { SmzCardsImageContent } from '../smz-cards-contents';
import { SmzCardsColumn } from '../smz-cards-state';

export type SmzCardsTypes =
  ImageWithDetails;

  export interface ImageWithDetails {
    image: {
      content: SmzCardsImageContent;
    };
    texts: SmzCardsColumn[];
  }