import { SmzAdvancedInjectable } from './smz-cards-component';

export type SmzCardsContentTypes<TData> =
  SmzCardsTextContent<TData> |
  SmzCardsCustomContent<TData> |
  SmzCardsImageContent<TData> |
  SmzCardsComponentContent<TData>;

export enum SmzCardsContentType {
  CUSTOM = 0,
  TEXT = 1,
  IMAGE = 2,
  COMPONENT = 3
}

export interface SmzCardsBaseContent<TData> {
  key: string;
  type: SmzCardsContentType;
  dataPath: string;
  styleClass: string;
  conditionalStyleClass: (data: TData) => string;
  listStyleClass: string;
  gridStyleClass: string;
  hideInGrid: boolean;
  hideInList: boolean;
}

export interface SmzCardsTextContent<TData> extends SmzCardsBaseContent<TData> {
  type: SmzCardsContentType.TEXT;
  maxLength: number;
  shortenSuffix: string;
  callback?: (data: any, row: any) => string;
}

export interface SmzCardsCustomContent<TData> extends SmzCardsBaseContent<TData> {
  type: SmzCardsContentType.CUSTOM;
  searchPath: string;
}

export interface SmzCardsComponentContent<TData> extends SmzCardsBaseContent<TData> {
  type: SmzCardsContentType.COMPONENT;
  componentData: SmzAdvancedInjectable;
  searchPath: string;
}

export interface SmzCardsImageContent<TData> extends SmzCardsBaseContent<TData> {
  type: SmzCardsContentType.IMAGE;
  useServerPath: boolean;
  title: {
    isVisible: boolean;
    getText: (item) => string;
  };

  maximize: boolean;
  openMaximized: boolean;

  transform: {
    callback: (item, content: SmzCardsImageContent<TData>) => SmzCardsImageContent<TData>;
    override: {
      dataPath: string;
    }
  };
}