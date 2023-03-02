import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { cloneDeep } from 'lodash-es';
import { TreeNode } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GlobalInjector } from '../../../common/services/global-injector';
import { isWithinTime } from '../../../modules/rbk-utils/utils/utils';
import { SmzCommentsDetails } from '../../../modules/smz-comments/models/comments-details';
import { DbData } from '../../../modules/smz-faqs/models/faqs';
import { CommentsUiActions } from './comments.actions';
import { CommentsService } from './comments.service';

export const COMMENTS_STATE_NAME = 'comments';

export interface CommentsUiStateModel
{
    comments: { [key: string]: DbData<TreeNode<SmzCommentsDetails>[]> };
}

export const getInitialState = (): CommentsUiStateModel => ({
    comments: {}
});

@State<CommentsUiStateModel>({
    name: COMMENTS_STATE_NAME,
    defaults: getInitialState()
})

@Injectable()
export class CommentsUiState
{
    constructor(private apiService: CommentsService) { }

    @Action(CommentsUiActions.LoadAll)
    public onLoadAll$(ctx: StateContext<CommentsUiStateModel>, action: CommentsUiActions.LoadAll): Observable<TreeNode<SmzCommentsDetails>[]>
    {
        const query = ctx.getState().comments[action.orderId];
        const cacheTime = action.forceUpdate ? 0 : GlobalInjector.config.rbkUtils.state.database[COMMENTS_STATE_NAME].cacheTimeout;

        if (query == null || !isWithinTime(query.lastUpdated, cacheTime))
        {
            return this.apiService.all(action.orderId).pipe(
                tap((result: TreeNode<SmzCommentsDetails>[]) =>
                {
                    ctx.dispatch(new CommentsUiActions.LoadAllSuccess(action.orderId, result));
                })
            );
        }
        return of();

    }

    @Action(CommentsUiActions.LoadAllSuccess)
    public onLoadAllSuccess(ctx: StateContext<CommentsUiStateModel>, action: CommentsUiActions.LoadAllSuccess): void
    {
        const comments = cloneDeep(ctx.getState().comments);

        comments[action.orderId] = {
            lastUpdated: new Date(),
            items: action.items,
        };

        ctx.patchState({ comments });
    }

    @Action(CommentsUiActions.Create)
    public onCreate$(ctx: StateContext<CommentsUiStateModel>, action: CommentsUiActions.Create): Observable<TreeNode<SmzCommentsDetails>[]>
    {
        return this.apiService.create(action.creation).pipe(
            tap((result: TreeNode<SmzCommentsDetails>[]) =>
            {
                ctx.dispatch(new CommentsUiActions.CreateSuccess(action.creation.entityId, result));
            })
        );

    }

    @Action(CommentsUiActions.CreateSuccess)
    public onCreateSuccess(ctx: StateContext<CommentsUiStateModel>, action: CommentsUiActions.CreateSuccess): void
    {
        const comments = cloneDeep(ctx.getState().comments);

        comments[action.orderId] = {
            lastUpdated: new Date(),
            items: action.items,
        };

        ctx.patchState({ comments });
    }

}
