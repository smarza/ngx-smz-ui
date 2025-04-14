import { MenuItem } from 'primeng/api';

export interface ActionLink extends Partial<MenuItem> {

  routerLink?: any;
  command?: (item: any) => void;
  queryParams?: { [k: string]: any; };
  disabled?: boolean;
}