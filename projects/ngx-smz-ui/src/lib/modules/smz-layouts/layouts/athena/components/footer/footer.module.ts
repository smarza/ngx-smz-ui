import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AthenaFooterComponent } from './footer.component';
import { DrawerModule } from 'primeng/drawer';

@NgModule({
  declarations: [AthenaFooterComponent],
  imports: [
    CommonModule,
    DrawerModule,
  ],
  exports: [AthenaFooterComponent]
})
export class SmzAthenaFooterModule { }
