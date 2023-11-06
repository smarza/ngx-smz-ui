import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewAthenaFooterComponent } from './footer.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [NewAthenaFooterComponent],
  imports: [
    CommonModule,
    SidebarModule,
  ],
  exports: [NewAthenaFooterComponent]
})
export class SmzAthenaFooterModule { }
