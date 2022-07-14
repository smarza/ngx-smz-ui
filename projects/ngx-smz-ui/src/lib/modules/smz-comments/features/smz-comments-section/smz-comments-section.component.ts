import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { CommentsUiActions } from '../../../../state/ui/comments/comments.actions';
import { CommentsUiSelector } from '../../../../state/ui/comments/comments.selector';
import { SmzPresets } from '../../../smz-dialogs/models/smz-presets';
import { SmzDialogsService } from '../../../smz-dialogs/services/smz-dialogs.service';
import { DbData } from '../../../smz-faqs/models/faqs';
import { CommentsDialogs } from '../../functions/comments.dialogs';
import { SmzCommentsDetails } from '../../models/comments-details';
import { CreateComment } from '../../models/create-comment';
import { SmzCommentsState } from '../../models/smz-comments-state';

@Component({
  selector: 'smz-comments-section',
  templateUrl: './smz-comments-section.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SmzCommentsSectionComponent implements OnInit {
  @Input() public state: SmzCommentsState;
  public comments$: Observable<DbData<TreeNode<SmzCommentsDetails>[]>>;

  constructor(private store: Store, private dialogs: SmzDialogsService) {

  }

  public ngOnInit(): void {
    if (this.state?.loadOnInit) {
      this.loadComments();
    }
  }
  public loadComments(): void {
    if (this.state.entityId == null) throw new Error("Nenhum Id de comentários foi informado.");

    setTimeout(() => {
      this.store.dispatch(new CommentsUiActions.LoadAll(this.state.entityId, true, true));
    }, 0);

    this.comments$ = this.store.select(CommentsUiSelector.comments(this.state.entityId));

  }

  public showCreateDialog(parent: TreeNode<SmzCommentsDetails>): void
  {
    this.dialogs.open({
      presetId: SmzPresets.SimpleCrud,
      title: 'Novo Comentário',
      features: [CommentsDialogs.getComment(this.state.focus)],
      callbacks: {
        onConfirm: (data) =>
        {
          const comment = data.comment;

          const creation: CreateComment = {
            entityId: this.state.entityId,
            parentId: parent?.key,
            comment: comment.replace(/(?:\r\n|\r|\n)/g, '<br>',).replace(/<br><br>/mg, '<br>')
          };

          this.store.dispatch(new CommentsUiActions.Create(creation));
        }
      }
    });

  }

}
