import { createSelector } from '@ngxs/store';
import { NotificationsUiState, NotificationsUiStateModel } from './notifications.state';
import { cloneDeep } from 'lodash-es';
import { FormGroupConfig } from '../../../builders/smz-dialogs/dialog-input-conversion';

// @dynamic
export class NotificationsUiSelectors {
    public static single(entity: string, mode: string): (state: NotificationsUiStateModel) => FormGroupConfig[] {
        return createSelector([NotificationsUiState], (state: NotificationsUiStateModel) => {
            if (mode === 'create') {
                return cloneDeep(state.data[entity].create);
            }
            else if (mode === 'update') {
                return cloneDeep(state.data[entity].update);
            }
            else {
                throw new Error('The only allowed options for "mode" are \'create\' or \'update\'');
            }
        });
    }
}