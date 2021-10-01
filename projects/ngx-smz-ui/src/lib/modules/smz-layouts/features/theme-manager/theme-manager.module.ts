import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemeManagerComponent } from './theme-manager.component';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [ThemeManagerComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [ThemeManagerComponent]
})
export class SmzThemeManagerModule { }
