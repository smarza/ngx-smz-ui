import { SmzControlType } from 'ngx-smz-dialogs';


export type SmzContentTypes =
  SmzTextContent |
  SmzCalendarContent |
  SmzIconContent |
  SmzCurrencyContent |
  SmzMaskContent;

export enum SmzContentType {
  CUSTOM = 0,
  TEXT = 12,
  CALENDAR = 16,
  ICON = 18,
  CURRENCY = 4,
}

export const FromControlTypeToContentType = [
 { from: SmzControlType.TEXT, to: SmzContentType.TEXT },
 { from: SmzControlType.DROPDOWN, to: SmzContentType.TEXT },
];

export interface SmzTextContent {

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