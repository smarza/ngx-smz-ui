import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmzRouteData, NgxSmzFormsModule } from 'ngx-smz-ui';
import { RbkAuthGuard } from 'ngx-smz-ui';
import { SignalsDemoComponent } from './signals-demo.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

const data: SmzRouteData = {
  layout: {
    mode: 'full',
    contentPadding: '2em'
  },
  title: 'Signals Demo',
  appArea: 'signals-demo',
  clearReusableRoutes: true,
  requiredStates: []
};

const routes: Routes = [
  {
    path: '',
    canActivate: [RbkAuthGuard],
    component: SignalsDemoComponent,
    data
  },
];

@NgModule({
  declarations: [
    SignalsDemoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule
  ],
  providers: [],
  bootstrap: [SignalsDemoComponent]
})
export class SignalsDemoModule { }
