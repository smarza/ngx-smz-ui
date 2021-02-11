import { SimpleEntity, SimpleNamedEntity } from 'ngx-smz-dialogs';
import { EdgePositionType } from './positions';

export enum SmzToast {
  CUSTOM = 'custom',
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export const SmzToasts: SimpleNamedEntity[] = [
  { id: SmzToast.CUSTOM, name: 'Custom' },
  { id: SmzToast.ERROR, name: 'Error' },
  { id: SmzToast.INFO, name: 'Info' },
  { id: SmzToast.SUCCESS, name: 'Success' },
  { id: SmzToast.WARNING, name: 'Warning' },
];

export const SmzToastPositions: SimpleEntity<EdgePositionType>[] = [
  { id: 'bottom-center', name: 'Bottom Center' },
  { id: 'bottom-left', name: 'Bottom Left' },
  { id: 'bottom-right', name: 'Bottom Right' },
  { id: 'center', name: 'Center' },
  { id: 'top-center', name: 'Top Center' },
  { id: 'top-left', name: 'Top Left' },
  { id: 'top-right', name: 'Top Right' },
];

export interface SmzToastData {
  position: EdgePositionType;
}