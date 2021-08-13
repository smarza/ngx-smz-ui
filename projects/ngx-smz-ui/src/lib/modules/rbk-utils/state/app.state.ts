import { GlobalStateModel } from './global/global.state';
import { getGlobalInitialState as getGlobalInitialState } from './global/global.state';

export interface AppStateModel {
    global: GlobalStateModel;
}

export const defaultState: AppStateModel = {
    global: getGlobalInitialState(),
};

