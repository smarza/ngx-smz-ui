import { SmzInjectable } from './smz-cards-component';

export type SmzCardsContentTypes =
  SmzCardsTextContent |
  SmzCardsCustomContent |
  SmzCardsImageContent |
  SmzCardsComponentContent;

export enum SmzCardsContentType {
  CUSTOM = 0,
  TEXT = 1,
  IMAGE = 2,
  COMPONENT = 3
}

export interface SmzCardsBaseContent {
  key: string;
  type: SmzCardsContentType;
  dataPath: string;
  styleClass: string;
  hideInGrid: boolean;
  hideInList: boolean;
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

export interface SmzCardsComponentContent extends SmzCardsBaseContent {
  type: SmzCardsContentType.COMPONENT;
  componentData: SmzInjectable;
  searchPath: string;
}

export interface SmzCardsImageContent extends SmzCardsBaseContent {
  type: SmzCardsContentType.IMAGE;
  useServerPath: boolean;
  title: {
    isVisible: boolean;
    getText: (item) => string;
  };

  maximize: boolean;
  openMaximized: boolean;

  transform: {
    callback: (item, content: SmzCardsImageContent) => SmzCardsImageContent;
    override: {
      dataPath: string;
    }
  };
}