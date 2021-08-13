import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableClearExtensionDirective } from './table-clear-extension.directive';
import { InputClearExtensionDirective } from './input-clear-extension.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [TableClearExtensionDirective, InputClearExtensionDirective],
    exports: [TableClearExtensionDirective, InputClearExtensionDirective],
})

export class RbkTableFilterClearDirectivesModule { }