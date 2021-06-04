

export type SmzEditableTypes =
  SmzTextEditable |
  SmzCalendarEditable |
  SmzAreaEditable |
  SmzDropdownEditable;

export enum SmzEditableType {
  NONE = 0,
  CUSTOM = 1,
  TEXT = 2,
  CALENDAR = 3,
  AREA = 4,
  DROPDOWN = 5,
}

export interface SmzTextEditable {

}

export interface SmzCalendarEditable {
  format?: 'shortDate' | 'short' | 'medium' | 'long' | 'mediumDate' | 'longDate' | 'shortTime';
}

export interface SmzAreaEditable {
  rows: number;
}

export interface SmzDropdownEditable {
  sourceType: SmzSourceType;
  sourceData: any;
}


export type SmzSourceTypes =
  SmzSource |
  SmzCalendarEditable |
  SmzAreaEditable |
  SmzDropdownEditable;
export type SmzSourceType = 'items' | 'model' | 'selector';

export interface SmzDropdownEditable {
  sourceType: SmzSourceType;
  sourceData: any;
}