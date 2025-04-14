import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { NgxSmzFormsModule } from '../../../smz-forms/smz-forms.module';
import { SmzLoginComponent } from './login.component';
import { NgxSmzDataPipesModule } from '../../../../common/data-pipes/data-pipes.module';
import { NgxSmzMenuModule } from '../../../smz-menu/smz-menu.module';

@NgModule({
  declarations: [SmzLoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    NgxSmzFormsModule,
    NgxSmzDataPipesModule,
    NgxSmzMenuModule
  ],
  exports: [SmzLoginComponent]
})
export class SmzLoginModule { }
