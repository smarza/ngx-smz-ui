import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { NgxSmzFormsModule } from '../../../smz-forms/smz-forms.module';
import { SmzLoginComponent } from './login.component';

@NgModule({
  declarations: [SmzLoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    NgxSmzFormsModule,
  ],
  exports: [SmzLoginComponent]
})
export class SmzLoginModule { }
