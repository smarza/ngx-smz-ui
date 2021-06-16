export interface MenuCreation {
  claim?: string;
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  routerLink?: any[];
  items?: MenuCreation[];
  visible?: boolean;

}