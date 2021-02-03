import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './containers/main/main.component';
import { SmzLayoutsConfig } from './globals/smz-layouts.config';
import { defaultSmzLayoutsConfig } from './globals/default-smz-layouts.config';

import { mergeClone } from '../../common/utils/deep-merge';
import { NgxSmzLayoutsRoutingModule } from './ngx-smz-layouts-routing.module';
import { OutletModule } from './features/outlet/outlet.module';

@NgModule({
    declarations: [
        MainComponent,
    ],
    imports: [
        CommonModule,
        OutletModule,
        NgxSmzLayoutsRoutingModule
    ],
    exports: [
        MainComponent
    ],
})
export class NgxSmzLayoutsModule
{
    public static forRoot(configuration: SmzLayoutsConfig): ModuleWithProviders<NgxSmzLayoutsModule>
    {
        return {
            ngModule: NgxSmzLayoutsModule,
            providers: [
                {
                    provide: SmzLayoutsConfig,
                    useValue: mergeClone(defaultSmzLayoutsConfig, configuration)
                }
            ]
        };
    }
}

