import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GlobalAssistanceComponent } from './global-assistance.component';
import { SharedModule } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputBlurDetectionModule } from '../../../../common/input-detection/input-detection.module';

@NgModule({
  declarations: [GlobalAssistanceComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SidebarModule,
    ButtonModule,
    SelectButtonModule,
    InputSwitchModule,
    InputTextModule,
    InputBlurDetectionModule
  ],
  exports: [GlobalAssistanceComponent]
})
export class GlobalAssistanceModule { }
