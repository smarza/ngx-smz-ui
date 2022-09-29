export type SmzCardsContentTypes =
  SmzCardsTextContent |
  SmzCardsCalendarContent |
  SmzCardsCustomContent |
  SmzCardsDataTransformContent |
  SmzCardsImageContent;

export enum SmzCardsContentType {
  CUSTOM = 0,
  TEXT = 1,
  CALENDAR = 2,
  DATA_TRANSFORM = 3,
  IMAGE = 4
}

export interface SmzCardsBaseContent {
  type: SmzCardsContentType;
  dataPath: string;
}

export interface SmzCardsTextContent extends SmzCardsBaseContent {
  type: SmzCardsContentType.TEXT;
  maxLength: number;
  shortenSuffix: string;
}

export interface SmzCardsCustomContent extends SmzCardsBaseContent {
  type: SmzCardsContentType.CUSTOM;
  searchPath: string;
}

export interface SmzCardsCalendarContent extends SmzCardsBaseContent {
  type: SmzCardsContentType.CALENDAR;
  format: 'shortDate' | 'short' | 'medium' | 'long' | 'mediumDate' | 'longDate' | 'shortTime';
}

export interface SmzCardsDataTransformContent extends SmzCardsBaseContent {
  type: SmzCardsContentType.DATA_TRANSFORM;
  callback: (data: any, row: any, index: number) => string;
  styleClass: string;
}

export interface SmzCardsImageContent extends SmzCardsBaseContent {
  type: SmzCardsContentType.IMAGE;
  useServerPath: boolean;
  title: {
    isVisible: boolean;
    getText: (item) => string;
  };
}