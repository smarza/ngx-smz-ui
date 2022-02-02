import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AthenaFooterComponent } from './footer.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [AthenaFooterComponent],
  imports: [
    CommonModule,
    SidebarModule,
  ],
  exports: [AthenaFooterComponent]
})
export class SmzAthenaFooterModule { }
