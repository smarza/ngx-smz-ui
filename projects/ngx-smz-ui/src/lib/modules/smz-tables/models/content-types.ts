

export type SmzContentTypes =
  SmzTextContent |
  SmzCalendarContent |
  SmzIconContent |
  SmzCurrencyContent;

export enum SmzContentType {
  TEXT = 12,
  CALENDAR = 16,
  ICON = 18,
  CURRENCY = 4,

}

export interface SmzBaseContent {

  /**
  * Define se o conteúdo da célula será baseado no ng-template
  */
  useTemplate?: boolean;

}


export interface SmzTextContent extends SmzBaseContent {

}

export interface SmzCalendarContent extends SmzBaseContent {
  format?: 'shortDate' | 'short' | 'medium' | 'long' | 'mediumDate' | 'longDate' | 'shortTime';
}

export interface SmzIconContent extends SmzBaseContent {
  matches: SmzIconContentMatch[];
}

export interface SmzCurrencyContent extends SmzBaseContent {

}

export interface SmzIconContentMatch {
  icon: string;
  class: string;
  value: any;

}