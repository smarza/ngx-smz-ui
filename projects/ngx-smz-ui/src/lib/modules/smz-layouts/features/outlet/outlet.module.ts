import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OutletComponent } from './outlet.component';
import { SharedModule } from 'primeng/api';
import { SmzThemeManagerModule } from '../theme-manager/theme-manager.module';
import { GlobalLoaderModule } from '../global-loader/global-loader.module';
import { NgxSmzDockModule } from '../../../smz-dock/smz-dock.module';
import { NgxSmzUiBlockModule } from '../../../smz-ui-block/smz-ui-block.module';
import { SmzExportDialogModule } from '../../../smz-export-dialog/smz-export-dialog.module';
import { SmzToastModule } from '../../../smz-toast/toast';

@NgModule({
  declarations: [OutletComponent],
  imports: [
    CommonModule,
    SharedModule,
    SmzThemeManagerModule,
    GlobalLoaderModule,
    SmzToastModule,
    NgxSmzDockModule,
    NgxSmzUiBlockModule,
    SmzExportDialogModule
  ],
  exports: [OutletComponent]
})
export class OutletModule { }
