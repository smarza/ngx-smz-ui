import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RbkAuthGuard, RbkDatabaseStateGuard } from 'ngx-rbk-utils';
import { NgxSmzTablesModule } from 'ngx-smz-ui';
import { ShopsDbActions } from '../../state/database/shops/shops.actions';
import { ShopsDbSelectors } from '../../state/database/shops/shops.selector';
import { ShopsDbName } from '../../state/database/shops/shops.state';
import { DemoResolver } from './demo-resolver';
import { DemoResolversDetailsComponent } from './demo-resolvers-details.component';
import { DemoResolversListComponent } from './demo-resolvers-list.component';

const routes: Routes = [
    {
        path: '',
        component: DemoResolversListComponent,
        canActivate: [RbkAuthGuard, RbkDatabaseStateGuard],
        data: {
          layout: {
            mode: 'full',
          },
          title: 'Demo Resolvers',
          appArea: 'demo-resolvers',
          clearReusableRoutes: true,
          requiredStates: [ShopsDbName]
        }
    },
    {
      path: 'details/:id',
      component: DemoResolversDetailsComponent,
      resolve: {
        details: DemoResolver,
      },
      canActivate: [RbkAuthGuard],
      data: {
        action: ShopsDbActions.LoadDetails,
        selector: ShopsDbSelectors.current,
        layout: {
          mode: 'full',
        },
        title: 'Demo Resolvers',
        appArea: 'demo-resolvers',
        clearReusableRoutes: true,
        requiredStates: []
      }
  },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxSmzTablesModule
    ],
    declarations: [DemoResolversListComponent, DemoResolversDetailsComponent],
    providers: []
})
export class DemoResolversRoutesModule
{
}
