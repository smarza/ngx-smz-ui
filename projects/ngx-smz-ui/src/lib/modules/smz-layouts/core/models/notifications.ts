import { ActionLink } from './action-link';

export interface SmzNotification extends ActionLink {
  summary: string;
  details: string;
  icon?: string;
}