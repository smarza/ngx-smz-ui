import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { RouterParamsState } from './state/router-params/router-params.state';

export const ngxsModuleForFeatureRouterParamsState = NgxsModule.forFeature([RouterParamsState]);

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ngxsModuleForFeatureRouterParamsState
    ],
    exports: [],
})
export class NgxSmzRouterParamsModule { }