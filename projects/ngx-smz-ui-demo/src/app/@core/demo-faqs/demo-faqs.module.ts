import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoFaqsComponent } from './components/demo-faqs/demo-faqs.component';
import { SmzRouteData } from 'ngx-smz-ui';
import { RbkAuthGuard } from 'ngx-rbk-utils';
import { ButtonModule } from 'primeng/button';

const data: SmzRouteData = {
  layout: {
    mode: 'layout',
    contentPadding: '2em'
  },
  title: 'Demo Faqs',
  appArea: 'demo-faqs',
  clearReusableRoutes: true,
  requiredStates: [],
  faqs: {
    enabled: true,
    tag: 'demo-faqs'
  }
};

const routes: Routes = [
  {
    path: '',
    canActivate: [RbkAuthGuard],
    component: DemoFaqsComponent,
    data
  },
];

@NgModule({
  declarations: [
    DemoFaqsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ButtonModule,
  ],
  providers: [],
  bootstrap: [DemoFaqsComponent]
})
export class DemoFaqsModule { }
