import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { TreeNode } from 'primeng/api';
import { CommentsUiActions } from '../../../../state/ui/comments/comments.actions';
import { SmzPresets } from '../../../smz-dialogs/models/smz-presets';
import { SmzDialogsService } from '../../../smz-dialogs/services/smz-dialogs.service';
import { CommentsDialogs } from './../../functions/comments.dialogs';
import { CreateComment } from './../../models/create-comment';
import { SmzCommentsDetails } from '../../models/comments-details';
import { SmzCommentsState } from '../../models/smz-comments-state';

@Component({
  selector: 'smz-comments',
  templateUrl: 'smz-comments.component.html',
  styleUrls: ['./smz-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})

export class SmzCommentsComponent {
  @Input() public state: SmzCommentsState;
  @Input() public data: TreeNode<SmzCommentsDetails>[] = [];

  constructor(public cdf: ChangeDetectorRef, private dialogs: SmzDialogsService, private store: Store) {

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