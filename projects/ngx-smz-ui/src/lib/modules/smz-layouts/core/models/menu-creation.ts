export interface MenuCreation {
  claim?: string;
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  routerLink?: string[];
  items?: MenuCreation[];
  visible?: boolean;

}