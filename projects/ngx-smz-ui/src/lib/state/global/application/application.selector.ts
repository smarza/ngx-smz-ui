import { Selector, createSelector } from '@ngxs/store';
import { ApplicationState, ApplicationStateModel, LogInfo } from './application.state';
import { AppStateModel } from '../../app.state';

export class ApplicationSelectors {
    @Selector([ApplicationState])
    public static globalIsLoading(state: ApplicationStateModel): boolean {
        return state.globalIsLoading;
    }

    @Selector([ApplicationState])
    public static isWaitingRequest(tag: string): any {
        const selector = createSelector([ApplicationState], (state: AppStateModel) => {
            return state.global.application.localIsLoading.findIndex(x => x.toLowerCase() === tag) !== -1;
        });

        return selector;
    }

    @Selector([ApplicationState])
    public static logInfo(state: ApplicationStateModel): LogInfo {
        return state.logInfo;
    }
}
