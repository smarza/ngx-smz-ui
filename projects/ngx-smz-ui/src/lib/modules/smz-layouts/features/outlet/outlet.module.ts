import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OutletComponent } from './outlet.component';
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { AssistanceModule } from '../assistance/assistance.module';
import { SmzThemeManagerModule } from '../theme-manager/theme-manager.module';

@NgModule({
  declarations: [OutletComponent],
  imports: [
    CommonModule,
    PrimeSharedModule,
    AssistanceModule,
    SmzThemeManagerModule
  ],
  exports: [OutletComponent]
})
export class OutletModule { }
