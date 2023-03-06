import { MenuItem } from 'primeng/api';

export interface SmzMenuItem extends MenuItem {
  hasClaimAccess?: string;
  conditional?: SmzConditional<'visible' | 'disabled'>;
  transforms?: Array<(item: any) => Partial<MenuItem>>;
  items?: SmzMenuItem[];
  confirmable?: {
    message: string;
    title: string;
    isCritical?: boolean;
  }
}

export interface SmzConditional<T> {
  condition: (item: any) => boolean;
  property: T;
}