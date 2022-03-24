import { SmzMenuItem } from '../../../modules/smz-menu/models/smz-menu-item';

export type SmzEasyTableContentTypes =
  SmzEasyTableTextContent |
  SmzEasyTableActionContent;

export enum SmzEasyTableContentType {
  CUSTOM = 0,
  TEXT = 12,
  CALENDAR = 16,
  ICON = 18,
  CURRENCY = 4,
  DATA_TRANSFORM = 5,
  ACTION = 6
}

export interface SmzEasyTableBaseContent {
  type: SmzEasyTableContentType;
}

export interface SmzEasyTableTextContent extends SmzEasyTableBaseContent {
  type: SmzEasyTableContentType.TEXT;
  dataPath: string;
}

export interface SmzEasyTableActionContent extends SmzEasyTableBaseContent {
  type: SmzEasyTableContentType.ACTION;
  items: SmzMenuItem[];
  callback?: (row: any) => SmzMenuItem[];
}