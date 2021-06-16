import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoNestedLayout1Component } from './demo-nested-layout-1.component';
import { DemoNestedLayout2Component } from './demo-nested-layout-2.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [DemoNestedLayout1Component, DemoNestedLayout2Component],
    providers: []
})
export class DemoNestedRoutesModule
{
}
