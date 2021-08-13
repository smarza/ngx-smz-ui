import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { NgxSmzTablesModule, SmzActionDispatchModule, SmzRouteData, SmzMessagesModule } from 'ngx-smz-ui';
import { RbkAuthGuard } from 'ngx-rbk-utils';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button'
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmzInputTagAreaModule } from './input-tag-area.component';

const data: SmzRouteData = {
  layout: {
    mode: 'full',
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
  {
    path: 'again',
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
    NgxSmzTablesModule,
    SmzActionDispatchModule,
    SmzMessagesModule,
    InputTextareaModule,
    FormsModule,
    SmzInputTagAreaModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [DetailsComponent]
})
export class DetailsModule { }
