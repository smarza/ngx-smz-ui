import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RbkAuthGuard, RbkDatabaseStateGuard, UI_DEFINITIONS_STATE_NAME } from 'ngx-rbk-utils';
import { NgxSmzTablesModule, SmzRouteData } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';
import { CountriesDbName } from '../../state/database/countries/countries.state';

import { DemoEditableTableComponent } from './demo-editable-table.component';

const data: SmzRouteData = {
  layout: {
    mode: 'full',
  },
  title: 'Demo EditableTables',
  appArea: 'demo-editable-table',
  clearReusableRoutes: true,
  requiredStates: [UI_DEFINITIONS_STATE_NAME, CountriesDbName]
};

const routes: Routes = [
  {
    path: '',
    canActivate: [RbkAuthGuard, RbkDatabaseStateGuard],
    component: DemoEditableTableComponent,
    data
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    NgxSmzTablesModule,
  ],
  exports: [],
  declarations: [DemoEditableTableComponent],
  providers: [],
})
export class DemoEditableTableModule { }
