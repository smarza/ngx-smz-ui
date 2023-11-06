import { MenuItem } from 'primeng/api';

export interface SmzMenuItem extends MenuItem {
  hasClaimAccess?: string;
  conditional?: SmzConditional<'visible' | 'disabled'>;
  transforms?: Array<(item: any) => Partial<MenuItem>>;
  dataMap?: (item: any) => any;
  items?: SmzMenuItem[];
  confirmable?: {
    message: string;
    title: string;
    isCritical?: boolean;
  }
  // Hephaestus layout only
  hideSeparator?: boolean;
  showAsCaption?: boolean;
  command?(event: any): void;
}

export interface SmzConditional<T> {
  condition: (item: any) => boolean;
  property: T;
}