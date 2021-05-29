export interface ActionLink {

  routerLink?: any;
  command?: (item: ActionLink) => void;
  queryParams?: { [k: string]: any; };
}