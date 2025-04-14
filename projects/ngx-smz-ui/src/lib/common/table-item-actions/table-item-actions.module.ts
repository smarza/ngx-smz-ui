import { NgModule } from '@angular/core';
import { TableItemActionsDirective } from './table-item-actions.directive';

@NgModule({
    declarations: [
        TableItemActionsDirective
    ],
    exports: [
        TableItemActionsDirective
    ],
})
export class TableItemActionsModule { }
