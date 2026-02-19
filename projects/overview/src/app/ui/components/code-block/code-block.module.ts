import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CodeBlockComponent } from './code-block.component';
import { HighlightModule } from 'ngx-highlightjs';
import { OnlyBuildCodePipe } from './only-build-code.pipe';
import { RemoveOneTabPipe } from './remove-one-tab.pipe';

@NgModule({
    declarations: [CodeBlockComponent, OnlyBuildCodePipe, RemoveOneTabPipe],
    imports: [
        CommonModule,
        ButtonModule,
        HighlightModule,
    ],
    exports: [
        CodeBlockComponent,
        ButtonModule
    ],
})
export class CodeBlockModule { }
