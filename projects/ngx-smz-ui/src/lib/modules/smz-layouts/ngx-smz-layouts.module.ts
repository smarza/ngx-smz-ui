import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmzLayoutsConfig } from './globals/smz-layouts.config';
import { defaultSmzLayoutsConfig } from './globals/default-smz-layouts.config';

import { mergeClone } from '../../common/utils/deep-merge';
import { NgxSmzLayoutsRoutingModule } from './ngx-smz-layouts-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { UiManagerState } from './core/state/ui/ui.state';

export const ngxsModuleForFeatureUiManagerState = NgxsModule.forFeature([UiManagerState]);

@NgModule({
    declarations: [],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        NgxSmzLayoutsRoutingModule,
        ngxsModuleForFeatureUiManagerState
    ],
    exports: [],
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

