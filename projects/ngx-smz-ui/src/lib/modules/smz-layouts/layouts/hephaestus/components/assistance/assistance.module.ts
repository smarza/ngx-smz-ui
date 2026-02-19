import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HephaestusAssistanceComponent } from './assistance.component';
import { SharedModule } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule  } from 'primeng/toggleswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputBlurDetectionModule } from '../../../../../../common/input-detection/input-detection.module';
import { GlobalAssistanceModule } from '../../../../features/global-assistance/global-assistance.module';

@NgModule({
  declarations: [HephaestusAssistanceComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DrawerModule,
    ButtonModule,
    SelectButtonModule,
    ToggleSwitchModule,
    InputTextModule,
    InputBlurDetectionModule,
    GlobalAssistanceModule
  ],
  exports: [HephaestusAssistanceComponent]
})
export class HephaestusAssistanceModule { }
