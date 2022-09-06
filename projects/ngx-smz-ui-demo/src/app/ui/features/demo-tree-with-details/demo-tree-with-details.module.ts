import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmzRouteData, NgxSmzDataPipesModule, NgxSmzTreeWithDetailsModule, NgxSmzFormsModule } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';
import { DemoTreeWithDetailsComponent } from './demo-tree-with-details.components';

const data: SmzRouteData = {
  layout: {
    mode: 'full',
  },
  title: 'Demo Tree',
  appArea: 'demo-tree',
  clearReusableRoutes: true,
  requiredStates: []
};

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: DemoTreeWithDetailsComponent,
    data
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    NgxSmzTreeWithDetailsModule,
    NgxSmzDataPipesModule,
    NgxSmzFormsModule
  ],
  exports: [],
  declarations: [
    DemoTreeWithDetailsComponent,
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DemoTreeWithDetailsModule { }
