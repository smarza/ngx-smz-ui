import { TreeNode } from 'primeng/api';
import { CommentsForms } from './comments.forms';
import { SmzCommentsDetails } from '../models/comments-details';
import { SmzDialogFeature } from '../../smz-dialogs/models/smz-dialogs';


export namespace CommentsDialogs
{

    export function getComment(focus = false, comment: TreeNode<SmzCommentsDetails> = null): SmzDialogFeature
    {
        return {
            type: 'form',
            data: CommentsForms.getCommentForm(focus)
        };

    }

}