import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { NgxSmzTablesModule, SmzRouteData } from 'ngx-smz-ui';
import { RbkAuthGuard } from 'ngx-rbk-utils';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

const data: SmzRouteData = {
  layout: {
    mode: 'layout',
    contentPadding: '0px'
  },
  title: 'Details',
  appArea: 'details',
  clearReusableRoutes: true,
  requiredStates: []
};

const routes: Routes = [
  {
    path: '',
    canActivate: [RbkAuthGuard],
    component: DetailsComponent,
    data
  },
];

@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    TableModule,
    ButtonModule,
    NgxSmzTablesModule
  ],
  providers: [],
  bootstrap: [DetailsComponent]
})
export class DetailsModule { }
