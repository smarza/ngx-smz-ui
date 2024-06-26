export type SmzContentTypes =
  SmzTextContent |
  SmzCalendarContent |
  SmzIconContent |
  SmzCurrencyContent |
  SmzDataTransform |
  SmzCustomContent |
  SmzMaskContent;

export enum SmzExportableContentType {
  NONE = 0,
  TEXT = 1,
  NUMBER = 2,
  DATETIME = 3,
  BOOLEAN = 4,
  HYPERLINK = 5,
  AUTODETECT = 6

}

export enum SmzExportableContentSource {
  DATA = 0,
  DATA_TRANSFORM = 1,
}

export enum SmzContentType {
  CUSTOM = 0,
  TEXT = 12,
  CALENDAR = 16,
  ICON = 18,
  CURRENCY = 4,
  DATA_TRANSFORM = 5
}

export interface SmzTextContent {

}

export interface SmzCustomContent {
  getFilterableData: (data: any, row: any, index: number) => string;
}

export interface SmzDataTransform {
  callback: (data: any, row: any, index: number) => string;
  getFilterableData: (data: any, row: any, index: number) => string;
}

export interface SmzCalendarContent {
  format?: 'shortDate' | 'short' | 'medium' | 'long' | 'mediumDate' | 'longDate' | 'shortTime';
}

export interface SmzIconContent {
  matches: SmzIconContentMatch[];
  getFilterableData: (data: any, row: any, index: number) => string;
}

export interface SmzCurrencyContent {

}

export interface SmzMaskContent {
  mask: string;
}

export interface SmzIconContentMatch {
  icon: string;
  class: string;
  value: any;
  tooltip?: string;
}