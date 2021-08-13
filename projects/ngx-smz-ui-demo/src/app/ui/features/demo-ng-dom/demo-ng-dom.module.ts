import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxSmzDataPipesModule, SmzRouteData } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DemoNgDomContentComponent } from './demo-ng-dom-content.component';
import { DemoNgDomComponent } from './demo-ng-dom.components';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgDomModule } from '../../../ng-dom/ng-dom.module';

const data: SmzRouteData = {
  title: 'Demo NgDom',
  appArea: 'demo-ng-dom',
  clearReusableRoutes: true,
  requiredStates: []
};

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: DemoNgDomComponent,
    data
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    FormsModule,
    NgDomModule,
    InputTextModule,
    InputNumberModule,
    NgxSmzDataPipesModule
  ],
  exports: [],
  declarations: [
    DemoNgDomComponent,
    DemoNgDomContentComponent
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DemoNgDomModule { }
