import { MenuItem } from 'primeng/api';
import { ActionLink } from './action-link';

export interface BreadcrumbsData {
  item: MenuItem,
  parent: MenuItem,
}