import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewAthenaFooterComponent } from './footer.component';
import { DrawerModule } from 'primeng/drawer';

@NgModule({
  declarations: [NewAthenaFooterComponent],
  imports: [
    CommonModule,
    DrawerModule,
  ],
  exports: [NewAthenaFooterComponent]
})
export class SmzAthenaFooterModule { }
