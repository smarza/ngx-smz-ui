import { createSelector, Selector } from '@ngxs/store';
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

    @Selector([RouterParamsState])
    public static queryParams(state: RouterParamsStateModel): any {
      return state.queryParams;
    }

    public static singleQueryParam(key: string): any
    {
        return createSelector([RouterParamsState], (state: RouterParamsStateModel) =>
        {
            return state.queryParams[key];
        });
    }

}
