import { NgModule } from '@angular/core';
import { MenuItemActionsDirective } from './menu-item-actions.directive';

@NgModule({
    declarations: [
        MenuItemActionsDirective
    ],
    exports: [
        MenuItemActionsDirective
    ],
})
export class MenuItemActionsModule { }
