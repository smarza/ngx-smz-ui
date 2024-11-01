import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RbkPipesModule } from '../rbk-utils/pipes/rbk-pipes.module';

import { OverlayPanelModule } from '../prime/overlaypanel/overlaypanel';
import { NgxSmzFormsModule } from '../smz-forms/smz-forms.module';
import { TreeModule } from 'primeng/tree';
import { NgxSmzDataPipesModule } from '../../common/data-pipes/data-pipes.module';
import { SmzCommentsComponent } from './features/smz-comments/smz-comments.component';
import { SmzCommentsSectionComponent } from './features/smz-comments-section/smz-comments-section.component';
import { SmzMessagesModule } from '../smz-messages/smz-messages.module';
import { ButtonModule } from 'primeng/button';
import { MentionableTextareaComponent } from './features/smz-comments/mentionable-textarea.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    RbkPipesModule,
    OverlayPanelModule,
    NgxSmzFormsModule,
    TreeModule,
    NgxSmzDataPipesModule,
    SmzMessagesModule,
    MentionableTextareaComponent
  ],
  exports: [
    SmzCommentsSectionComponent
  ],
  declarations: [
    SmzCommentsComponent,
    SmzCommentsSectionComponent
  ],
  providers: [],
})
export class NgxSmzCommentsModule { }
