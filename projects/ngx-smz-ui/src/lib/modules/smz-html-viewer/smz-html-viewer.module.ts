import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RbkPipesModule } from 'ngx-rbk-utils';

import { SmzHtmlViewerComponent } from './smz-html-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RbkPipesModule
  ],
  exports: [
    SmzHtmlViewerComponent
  ],
  declarations: [
    SmzHtmlViewerComponent,
  ],
  providers: [],
})
export class SmzHtmlViewerModule { }
