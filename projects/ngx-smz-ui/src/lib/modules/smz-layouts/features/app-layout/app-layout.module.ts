import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { AppLayoutComponent } from './app-layout.component';
import { SharedModule as PrimeSharedModule } from 'primeng/api';

@NgModule({
  declarations: [AppLayoutComponent],
  imports: [
    CommonModule,
    PrimeSharedModule,
    MenubarModule,
  ],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
