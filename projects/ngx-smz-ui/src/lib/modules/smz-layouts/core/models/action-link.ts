export interface ActionLink {

  routerLink?: any;
  command?: (item: ActionLink) => void;
}