export interface MenuCreation {
  claims?: string[];
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  routerLink?: any[];
  items?: MenuCreation[];
  visible?: boolean;
  disabled?: boolean;
  sortChildren?: boolean;
  hideSeparator?: boolean;
  showAsCaption?: boolean;

}