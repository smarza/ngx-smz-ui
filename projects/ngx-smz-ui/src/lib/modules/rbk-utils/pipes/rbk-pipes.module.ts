import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { rbkSafeHtmlPipe } from './rbk-safe-html.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [rbkSafeHtmlPipe],
    exports: [rbkSafeHtmlPipe],
})

export class RbkPipesModule { }