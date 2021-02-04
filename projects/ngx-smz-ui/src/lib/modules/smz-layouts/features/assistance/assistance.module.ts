import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AssistanceComponent } from './assistance.component';
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AssistanceComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrimeSharedModule,
    SidebarModule,
    ButtonModule,
    SelectButtonModule
  ],
  exports: [AssistanceComponent]
})
export class AssistanceModule { }
