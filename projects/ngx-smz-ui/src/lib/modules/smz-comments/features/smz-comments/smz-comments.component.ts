import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { TreeNode } from 'primeng/api';
import { CommentsUiActions } from '../../../../state/ui/comments/comments.actions';
import { SmzPresets } from '../../../smz-dialogs/models/smz-presets';
import { SmzDialogsService } from '../../../smz-dialogs/services/smz-dialogs.service';
import { CommentsDialogs } from './../../functions/comments.dialogs';
import { CreateComment } from './../../models/create-comment';

@Component({
  selector: 'smz-comments',
  template: `
  <!-- <mentionable-textarea [users]="users" class="w-full"></mentionable-textarea> -->
  <ng-container *ngIf="data.length > 0; else elseEmpty">
    <p-tree [value]="data">
        <ng-template let-node pTemplate="default">

          <!-- CONTAINER -->
          <div class="grid grid-nogutter items-start justify-start flex-nowrap gap-3 mb-3 py-1">

              <!-- AVATAR -->
              <img class="w-20" [src]="node.data.avatar | safeUrl"/>

              <!-- CONTENT -->
              <div class="col grid grid-nogutter flex-col items-start justify-start gap-2">

                  <!-- NAME AND DATE -->
                  <div class="grid grid-nogutter items-center justify-start gap-2">

                      <!-- DISPLAY NAME -->
                      <div class="font-bold leading-4">{{ node.data.displayName }}</div>

                      <!-- DATE -->
                      <div class="text-xs pt-px">{{ node.data.date | simpleCalendar : 'fromNow' }}</div>
                  </div>

                  <!-- MESSAGE -->
                  <div [innerHTML]="node.label | safeHtml"></div>

                  <!-- ACTIONS -->
                  <a *ngIf="state.response.enabled" class="cursor-pointer text-sm" (click)="showCreateDialog(node)">{{ state.locale.answser }}</a>
              </div>

          </div>
        </ng-template>
    </p-tree>
  </ng-container>

  <ng-template #elseEmpty>
    <smz-icon-message [icon]="'far fa-comment'" [message]="state.locale.emptyMessage" [comment]="state.locale.firstMessage"></smz-icon-message>
  </ng-template>
`,
  styleUrls: ['./smz-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})

export class SmzCommentsComponent {
  @Input() public state: SmzCommentsState;
  @Input() public data: TreeNode<SmzCommentsDetails>[] = [];
  // public users: string[] = ['john.doe', 'jane.doe', 'jim.beam'];

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

export interface SmzCommentsState {
  entityId: string;
  loadOnInit: boolean;
  fullWidth: boolean;
  focus: boolean;
  response: {
    enabled: boolean;
  }
  locale: {
    code: 'pt-BR' | 'en-US';
    title: string;
    emptyMessage: string;
    refreshButton: string;
    createButton: string;
    updateMessage: string;
    firstMessage: string;
    answser: string;
  }
}

export interface SmzCommentsDetails {
  username: string;
  avatar: string;
  date: Date;
}
