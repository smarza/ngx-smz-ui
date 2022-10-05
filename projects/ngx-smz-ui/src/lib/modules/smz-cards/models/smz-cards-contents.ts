export type SmzCardsContentTypes =
  SmzCardsTextContent |
  SmzCardsCustomContent |
  SmzCardsImageContent;

export enum SmzCardsContentType {
  CUSTOM = 0,
  TEXT = 1,
  IMAGE = 2
}

export interface SmzCardsBaseContent {
  key: string;
  type: SmzCardsContentType;
  dataPath: string;
  isVisible: boolean;
  styleClass: string;
}

export interface SmzCardsTextContent extends SmzCardsBaseContent {
  type: SmzCardsContentType.TEXT;
  maxLength: number;
  shortenSuffix: string;
  callback?: (data: any, row: any) => string;
}

export interface SmzCardsCustomContent extends SmzCardsBaseContent {
  type: SmzCardsContentType.CUSTOM;
  searchPath: string;
}

export interface SmzCardsImageContent extends SmzCardsBaseContent {
  type: SmzCardsContentType.IMAGE;
  useServerPath: boolean;
  title: {
    isVisible: boolean;
    getText: (item) => string;
  };
}