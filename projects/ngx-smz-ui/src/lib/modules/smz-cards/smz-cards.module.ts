import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSmzServerImageModule } from '../../common/directives/server-image/server-image.directive';
import { DataViewModule } from 'primeng/dataview';
import { SmzCardsComponent } from './features/smz-cards/smz-cards.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SmzGridItemComponent } from './components/grid-item/grid-item.component';
import { SmzListItemComponent } from './components/list-item/list-item.component';
import { SmzCardsContentPipe } from './pipes/card-content.pipe';
import { SmzImageContentComponent } from './components/contents/image/image-content.component';
import { SmzTextContentComponent } from './components/contents/text/text-content.component';
import { SmzImageWithDetailsTypeComponent } from './components/types/image-with-details/image-with-details-type.component';
import { SmzRawTypeComponent } from './components/types/raw/raw-type.component';
import { SmzCardsContentSelectorDirective } from './directives/content-selector.directive';
import { NgxSmzMenuModule } from '../smz-menu/smz-menu.module';
import { TooltipModule } from 'primeng/tooltip';
import { SafeContentPipeModule } from '../../common/pipes/safe-html.pipe';
import { SharedModule } from 'primeng/api';
import { SmzInfoATypeComponent } from './components/types/info-a/info-a-type.component';
import { NgxSmzDataPipesModule } from '../../common/data-pipes/data-pipes.module';
import { ButtonActionsDirective } from './directives/button-actions.directive';
import { ImgPlaceholderDirective } from './directives/img-placeholder.directive';
import { FormsModule } from '@angular/forms';
import { SmzCardsTransformContentPipe } from './pipes/transform-content.pipe';
import { SmzInjectDataPathComponent } from './directives/inject-component.directive';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DataViewModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    MultiSelectModule,
    NgxSmzServerImageModule,
    NgxSmzMenuModule,
    TooltipModule,
    SafeContentPipeModule,
    NgxSmzDataPipesModule
  ],
  exports: [SmzCardsComponent, SmzGridItemComponent, SharedModule],
  declarations: [
    // Features
    SmzCardsComponent,

    // Main Components
    SmzListItemComponent,
    SmzGridItemComponent,

    // Pipes
    SmzCardsContentPipe,
    SmzCardsTransformContentPipe,

    // Directives
    SmzCardsContentSelectorDirective,
    ButtonActionsDirective,
    ImgPlaceholderDirective,
    SmzInjectDataPathComponent,

    // Content Components
    SmzTextContentComponent,
    SmzImageContentComponent,

    // Type Components
    SmzRawTypeComponent,
    SmzImageWithDetailsTypeComponent,
    SmzInfoATypeComponent
  ],
  providers: [],
})
export class NgxSmzCardsModule { }
