import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemeManagerComponent } from './theme-manager.component';
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { AssistanceModule } from '../assistance/assistance.module';

@NgModule({
  declarations: [ThemeManagerComponent],
  imports: [
    CommonModule,
    PrimeSharedModule,
    AssistanceModule
  ],
  exports: [ThemeManagerComponent]
})
export class SmzThemeManagerModule { }
