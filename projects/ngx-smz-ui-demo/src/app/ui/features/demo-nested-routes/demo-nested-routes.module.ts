import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RbkAuthGuard } from 'ngx-rbk-utils';
import { SmzRouteData } from 'ngx-smz-ui';
import { DemoNestedLayout1Component } from './demo-nested-layout-1.component';
import { DemoNestedLayout2Component } from './demo-nested-layout-2.component';

const data: SmzRouteData = {
    layout: {
      mode: 'full',
    },
    title: 'Demo Nested Routes',
    appArea: 'demo-table',
    clearReusableRoutes: true,
    requiredStates: []
  };

const routes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Compras'
        },
        children: [
            {
                path: '',
                component: DemoNestedLayout1Component,
                canActivate: [RbkAuthGuard],
                data
            },
            {
                path: 'layout',
                component: DemoNestedLayout2Component,
                canActivate: [RbkAuthGuard],
                data
            },
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [DemoNestedLayout1Component, DemoNestedLayout2Component],
    providers: []
})
export class DemoNestedRoutesModule
{
}
