

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
  SWITCH = 6,
  NUMBER = 7,
}

export interface SmzTextEditable {

}

export interface SmzNumberEditable {
  mode: 'decimal' | 'currency';
  minFractionDigits: number;
  maxFractionDigits: number;
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
  placeholder: string;
}

export type SmzSourceType = 'object' | 'selector';