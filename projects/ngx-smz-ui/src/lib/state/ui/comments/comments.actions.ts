import { TreeNode } from 'primeng/api';
import { SmzCommentsDetails } from '../../../modules/smz-comments/models/comments-details';
import { CreateComment } from '../../../modules/smz-comments/models/create-comment';


export namespace CommentsUiActions
{
    export class LoadAll
    {
        public static readonly type = '[Comments API] Load All';
        constructor(public orderId: string, public forceUpdate = false, public loaderOverride = false) { }
    }

    export class LoadAllSuccess
    {
        public static readonly type = '[Comments API] Load All Success';
        constructor(public orderId: string, public items: TreeNode<SmzCommentsDetails>[]) {}
    }

    export class Create
    {
        public static readonly type = '[Comments API] Create';
        constructor(public creation: CreateComment, public loaderOverride = false) { }
    }

    export class CreateSuccess
    {
        public static readonly type = '[Comments API] Create Success';
        constructor(public orderId: string, public items: TreeNode<SmzCommentsDetails>[]) {}
    }
}
