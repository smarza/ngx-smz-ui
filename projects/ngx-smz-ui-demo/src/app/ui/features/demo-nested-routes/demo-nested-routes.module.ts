import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RbkAuthGuard } from 'ngx-smz-ui';
import { SmzRouteData } from 'ngx-smz-ui';
import { DemoNestedLayout1Component } from './demo-nested-layout-1.component';
import { DemoNestedLayout2Component } from './demo-nested-layout-2.component';


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
                data: {
                    layout: {
                      mode: 'full',
                      contentPadding: '10em'
                    },
                    title: 'Demo Nested Routes 1',
                    appArea: 'demo-table',
                    clearReusableRoutes: true,
                    requiredStates: []
                }
            },
            {
                path: 'layout',
                component: DemoNestedLayout2Component,
                canActivate: [RbkAuthGuard],
                data: {
                    layout: {
                      mode: 'full',
                      contentPadding: '20em'
                    },
                    title: 'Demo Nested Routes 2',
                    appArea: 'demo-table',
                    clearReusableRoutes: true,
                    requiredStates: []
                }
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
