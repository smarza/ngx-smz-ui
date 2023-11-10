import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { SmzMenuComponent } from './smz-menu.component';
import { SmzMenuPipe } from './pipes/smz-menu.pipe';
import { SmzMenuModule } from './components/menu';
import { SmzFlattenMenuPipe } from './pipes/smz-flatten-menu.pipe';
import { SmzMenuItemActionsDirective } from './directives/menu-item-actions.directive';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    SharedModule,
    SmzMenuModule,
    TooltipModule
  ],
  exports: [
    SmzMenuComponent,
    SharedModule,
    SmzMenuItemActionsDirective,
    SmzFlattenMenuPipe
  ],
  declarations: [
    SmzMenuComponent,
    SmzMenuPipe,
    SmzFlattenMenuPipe,
    SmzMenuItemActionsDirective
  ],
  providers: [],
})
export class NgxSmzMenuModule { }
