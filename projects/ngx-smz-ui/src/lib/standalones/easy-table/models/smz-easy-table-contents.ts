import { SmzMenuItem } from '../../../modules/smz-menu/models/smz-menu-item';

export type SmzEasyTableContentTypes =
  SmzEasyTableTextContent |
  SmzEasyTableCalendarContent |
  SmzEasyTableCustomContent |
  SmzEasyTableDataTransformContent |
  SmzEasyTableActionContent;

export enum SmzEasyTableContentType {
  CUSTOM = 0,
  TEXT = 12,
  CALENDAR = 16,
  // ICON = 18,
  // CURRENCY = 4,
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

export interface SmzEasyTableCustomContent extends SmzEasyTableBaseContent {
  type: SmzEasyTableContentType.CUSTOM;
  dataPath: string;
  searchPath: string;
}

export interface SmzEasyTableCalendarContent extends SmzEasyTableBaseContent {
  type: SmzEasyTableContentType.CALENDAR;
  dataPath: string;
  format: 'shortDate' | 'short' | 'medium' | 'long' | 'mediumDate' | 'longDate' | 'shortTime';
}

export interface SmzEasyTableDataTransformContent extends SmzEasyTableBaseContent {
  type: SmzEasyTableContentType.DATA_TRANSFORM;
  dataPath: string;
  searchPath: string;
  callback: (data: any, row: any, index: number) => string;
  styleClass: string;
}