import { MenuItem } from 'primeng/api';

export interface SmzMenuItem extends MenuItem {
  conditional?: SmzConditional<'visible' | 'disabled'>;
  transforms?: Array<(item: any) => Partial<MenuItem>>;
  items?: SmzMenuItem[];
}

export interface SmzConditional<T> {
  condition: (item: any) => boolean;
  property: T;
}