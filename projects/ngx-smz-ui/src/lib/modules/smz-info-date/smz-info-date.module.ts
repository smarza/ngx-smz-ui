import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmzInfoDateComponent } from './smz-info-date.component';
import { SmzInfoDatePipe } from './smz-info-date.pipe';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    declarations: [
        SmzInfoDateComponent,
        SmzInfoDatePipe
    ],
    imports: [
        CommonModule,
        TooltipModule
    ],
    exports: [SmzInfoDateComponent]
})
export class SmzInfoDateModule { }
