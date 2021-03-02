import { ClonePipe } from './pipes/clone.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { UniqueFilterPipe } from './pipes/unique-filter.pipe';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ClonePipe,
        SafeHtmlPipe,
        SafeUrlPipe,
        UniqueFilterPipe
    ],
    exports: [
        ClonePipe,
        SafeHtmlPipe,
        SafeUrlPipe,
        UniqueFilterPipe
    ],
})
export class DataPipesModule { }
