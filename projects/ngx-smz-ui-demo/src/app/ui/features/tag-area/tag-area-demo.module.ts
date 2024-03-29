import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmzRouteData, NgxSmzFormsModule } from 'ngx-smz-ui';
import { RbkAuthGuard } from 'ngx-smz-ui';
import { TagAreaDemoComponent } from './tag-area-demo.component';
import { ButtonModule } from 'primeng/button';

const data: SmzRouteData = {
  layout: {
    mode: 'full',
    contentPadding: '0px'
  },
  title: 'Tag Area Demo',
  appArea: 'tag-area-demo',
  clearReusableRoutes: true,
  requiredStates: []
};

const routes: Routes = [
  {
    path: '',
    canActivate: [RbkAuthGuard],
    component: TagAreaDemoComponent,
    data
  },
];

@NgModule({
  declarations: [
    TagAreaDemoComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    NgxSmzFormsModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [TagAreaDemoComponent]
})
export class TagAreaDemoModule { }
