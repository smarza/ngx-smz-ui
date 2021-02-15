import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AthenaAssistanceComponent } from './assistance.component';
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputBlurDetectionModule } from '../../../../../../common/input-detection/input-detection.module';
import { GlobalAssistanceModule } from '../../../../features/global-assistance/global-assistance.module';

@NgModule({
  declarations: [AthenaAssistanceComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrimeSharedModule,
    SidebarModule,
    ButtonModule,
    SelectButtonModule,
    InputSwitchModule,
    InputTextModule,
    InputBlurDetectionModule,
    GlobalAssistanceModule
  ],
  exports: [AthenaAssistanceComponent]
})
export class AthenaAssistanceModule { }
