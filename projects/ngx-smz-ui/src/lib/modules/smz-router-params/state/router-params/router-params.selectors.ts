import { createSelector } from '@ngxs/store';
import { RouterParamsState, RouterParamsStateModel } from './router-params.state';

// @dynamic
export class RouterParamsSelectors
{
    public static params(key: string): any
    {
        return createSelector([RouterParamsState], (state: RouterParamsStateModel) =>
        {
            return state.params[key] ?? {};
        });
    }

}
