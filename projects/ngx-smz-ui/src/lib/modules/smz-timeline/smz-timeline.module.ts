import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSmzServerImageModule } from '../../common/directives/server-image/server-image.directive';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgxSmzMenuModule } from '../smz-menu/smz-menu.module';
import { TooltipModule } from 'primeng/tooltip';
import { SafeContentPipeModule } from '../../common/pipes/safe-html.pipe';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { TimelineModule } from 'primeng/timeline';
import { NgxSmzDataPipesModule } from '../../common/data-pipes/data-pipes.module';
import { SmzTimelineComponent } from './features/smz-timeline/smz-timeline.component';
import { NgxSmzCardsModule } from '../smz-cards/smz-cards.module';

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
    NgxSmzDataPipesModule,
    TimelineModule,
    NgxSmzCardsModule
  ],
  exports: [SmzTimelineComponent, SharedModule],
  declarations: [SmzTimelineComponent],
  providers: [],
})
export class NgxSmzTimelineModule { }
