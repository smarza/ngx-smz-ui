import { ClonePipe } from './pipes/clone.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ClonePipe,
        SafeHtmlPipe,
        SafeUrlPipe,
    ],
    exports: [
        ClonePipe,
        SafeHtmlPipe,
        SafeUrlPipe
    ],
})
export class DataPipesModule { }
