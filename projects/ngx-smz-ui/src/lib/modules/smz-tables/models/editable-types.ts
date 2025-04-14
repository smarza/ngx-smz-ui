

export type SmzEditableTypes =
  SmzTextEditable |
  SmzCalendarEditable |
  SmzAreaEditable |
  SmzDropdownEditable |
  SmzNumberEditable;

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

  /*
  The currency to use in currency formatting.
  Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB.
  There is no default value; if the style is "currency", the currency property must be provided.
  */
  currency: string;

  /*
  Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators.
  */
  useGrouping: boolean;
  /*
  Determines whether the input field is empty.
  */
  allowEmpty: boolean;
  /*
  When enabled, a clear icon is displayed to clear the value.
  */
  showClear: boolean;
  /*
  Displays spinner buttons.
  */
  showButtons: boolean;
  /*
  Text to display before the value.
  */
  prefix: string;
  /*
  Text to display after the value.
  */
  suffix: string;
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