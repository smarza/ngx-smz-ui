import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ClaimsPageComponent } from './features/claims-page/claims-page.component';
import { SmzRouteData } from '../../../smz-layouts/core/models/route-layout-data';
import { CLAIMS_STATE_NAME } from '../../state/claims/claims.state';
import { RbkAuthGuard } from '../../../rbk-utils/auth/auth.guard';
import { RbkDatabaseStateGuard } from '../../../rbk-utils/utils/state/state.guard';
import { NgxSmzDataPipesModule } from '../../../../common/data-pipes/data-pipes.module';
import { NgxSmzTablesModule } from '../../../smz-tables/ngx-smz-tables.module';

const data: SmzRouteData = {
  layout: {
    mode: 'full',
    contentPadding: '2em'
  },
  title: 'Permissões de Acesso',
  appArea: 'Claims',
  clearReusableRoutes: true,
  requiredStates: [CLAIMS_STATE_NAME]
};

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        canActivate: [RbkAuthGuard, RbkDatabaseStateGuard],
        component: ClaimsPageComponent,
        data
      },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSmzTablesModule,
    NgxSmzDataPipesModule,
    ButtonModule
  ],
  exports: [],
  declarations: [
    ClaimsPageComponent
  ],
  providers: [

  ],
})
export class ClaimsModule { }