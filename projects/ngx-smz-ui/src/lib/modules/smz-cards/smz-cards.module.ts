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

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DataViewModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    NgxSmzServerImageModule,
    NgxSmzMenuModule,
    TooltipModule,
    SafeContentPipeModule
  ],
  exports: [SmzCardsComponent, SharedModule],
  declarations: [
    // Features
    SmzCardsComponent,

    // Main Components
    SmzListItemComponent,
    SmzGridItemComponent,

    // Pipes
    SmzCardsContentPipe,

    // Directives
    SmzCardsContentSelectorDirective,

    // Content Components
    SmzTextContentComponent,
    SmzImageContentComponent,

    // Type Components
    SmzRawTypeComponent,
    SmzImageWithDetailsTypeComponent,
  ],
  providers: [],
})
export class NgxSmzCardsModule { }
