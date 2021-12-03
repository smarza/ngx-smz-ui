import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { SmzMenuComponent } from './smz-menu.component';
import { SmzMenuPipe } from './pipes/smz-menu.pipe';
import { SmzMenuModule } from './components/menu';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    SharedModule,
    SmzMenuModule
  ],
  exports: [
    SmzMenuComponent,
    SharedModule
  ],
  declarations: [
    SmzMenuComponent,
    SmzMenuPipe
  ],
  providers: [],
})
export class NgxSmzMenuModule { }
