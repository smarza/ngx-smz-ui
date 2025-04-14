import { createSelector } from '@ngxs/store';
import { cloneDeep } from 'lodash-es';
import { CommentsUiState, CommentsUiStateModel } from './comments.state';
import { sortArray } from '../../../common/utils/utils';
import { DbData } from '../../../modules/smz-faqs/models/faqs';
import { TreeNode } from 'primeng/api';
import { SmzCommentsDetails } from '../../../modules/smz-comments/models/comments-details';

export class CommentsUiSelector
{
    public static comments(id: string): any
    {
        return createSelector([CommentsUiState], (state: CommentsUiStateModel) =>
        {
            const data = cloneDeep(state.comments[id]);

            return data != null ? { ...data, items: sortArray(data.items, 'data.date', -1) } : {
                items: [],
                lastUpdated: new Date()
            } as DbData<TreeNode<SmzCommentsDetails>[]>;
        });
    }

}
