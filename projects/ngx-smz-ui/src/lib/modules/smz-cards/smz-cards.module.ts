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
import { SmzCardContentPipe } from './pipes/card-content.pipe';
import { SmzImageContentComponent } from './components/contents/image/image-content.component';
import { SmzTextContentComponent } from './components/contents/text/text-content.component';
import { SmzImageWithDetailsTypeComponent } from './components/types/image-with-details/image-with-details-type.component';
import { SmzRawTypeComponent } from './components/types/raw/raw-type.component';

@NgModule({
  imports: [
    CommonModule,
    DataViewModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    NgxSmzServerImageModule
  ],
  exports: [SmzCardsComponent],
  declarations: [
    // Features
    SmzCardsComponent,

    // Main Components
    SmzListItemComponent,
    SmzGridItemComponent,

    // Pipes
    SmzCardContentPipe,

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
