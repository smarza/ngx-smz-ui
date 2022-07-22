import { SmzControlType } from '../../smz-forms/models/control-types';

export type SmzContentTypes =
  SmzTextContent |
  SmzCalendarContent |
  SmzIconContent |
  SmzCurrencyContent |
  SmzDataTransform |
  SmzMaskContent;

export enum SmzExportableContentType {
  NONE = 0,
  TEXT = 1,
  NUMBER = 2,
  DATETIME = 3,
  BOOLEAN = 4,

}

export enum SmzContentType {
  CUSTOM = 0,
  TEXT = 12,
  CALENDAR = 16,
  ICON = 18,
  CURRENCY = 4,
  DATA_TRANSFORM = 5
}

export const ExportableContentTypeOf: { [key: string]: SmzExportableContentType } = {
  [SmzContentType.TEXT]: SmzExportableContentType.TEXT,
  [SmzContentType.CALENDAR]: SmzExportableContentType.DATETIME,
  [SmzContentType.CURRENCY]: SmzExportableContentType.NUMBER,
  [SmzContentType.CUSTOM]: SmzExportableContentType.NONE,
  [SmzContentType.DATA_TRANSFORM]: SmzExportableContentType.TEXT,
  [SmzContentType.ICON]: SmzExportableContentType.NONE,
}

export const FromControlTypeToContentType = [
 { from: SmzControlType.TEXT, to: SmzContentType.TEXT },
 { from: SmzControlType.DROPDOWN, to: SmzContentType.TEXT },
];

export interface SmzTextContent {

}

export interface SmzDataTransform {
  callback: (data: any, row: any, index: number) => string;
}

export interface SmzCalendarContent {
  format?: 'shortDate' | 'short' | 'medium' | 'long' | 'mediumDate' | 'longDate' | 'shortTime';
}

export interface SmzIconContent {
  matches: SmzIconContentMatch[];
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