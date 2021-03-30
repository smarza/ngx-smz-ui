import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideContentComponent } from './components/side-content/side-content.component';
import { NgxSmzTablesModule, SmzRouteData, NgxSmzSideContentModule } from 'ngx-smz-ui';
import { RbkAuthGuard } from 'ngx-rbk-utils';
import { ButtonModule } from 'primeng/button';

const data: SmzRouteData = {
  layout: {
    mode: 'layout'
  },
  title: 'Side Content',
  appArea: 'side-content',
  clearReusableRoutes: true,
  requiredStates: []
};

const routes: Routes = [
  {
    path: '',
    canActivate: [RbkAuthGuard],
    component: SideContentComponent,
    data
  },
];

@NgModule({
  declarations: [
    SideContentComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ButtonModule,
    NgxSmzTablesModule,
    NgxSmzSideContentModule
  ],
  providers: [],
  bootstrap: [SideContentComponent]
})
export class SideContentModule { }
