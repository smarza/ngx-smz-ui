import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OutletComponent } from './outlet.component';
import { SharedModule } from 'primeng/api';
import { SmzThemeManagerModule } from '../theme-manager/theme-manager.module';
import { GlobalLoaderModule } from '../global-loader/global-loader.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [OutletComponent],
  imports: [
    CommonModule,
    SharedModule,
    SmzThemeManagerModule,
    GlobalLoaderModule,
    ToastModule
  ],
  exports: [OutletComponent]
})
export class OutletModule { }
