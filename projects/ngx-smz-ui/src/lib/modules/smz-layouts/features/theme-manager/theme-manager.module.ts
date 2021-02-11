import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemeManagerComponent } from './theme-manager.component';
import { SharedModule as PrimeSharedModule } from 'primeng/api';

@NgModule({
  declarations: [ThemeManagerComponent],
  imports: [
    CommonModule,
    PrimeSharedModule,
  ],
  exports: [ThemeManagerComponent]
})
export class SmzThemeManagerModule { }
