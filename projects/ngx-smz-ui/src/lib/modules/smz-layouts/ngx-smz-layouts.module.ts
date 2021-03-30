import { DEFAULT_CURRENCY_CODE, LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmzLayoutsConfig } from './core/globals/smz-layouts.config';
import { defaultSmzLayoutsConfig } from './core/globals/default-smz-layouts.config';

import { mergeClone } from '../../common/utils/deep-merge';
import { NgxSmzLayoutsRoutingModule } from './ngx-smz-layouts-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { UiState } from './core/state/ui/ui.state';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

// Register the localization
registerLocaleData(localePt, 'pt-BR');

export const ngxsModuleForFeatureUiState = NgxsModule.forFeature([UiState]);

@NgModule({
    declarations: [],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        NgxSmzLayoutsRoutingModule,
        ngxsModuleForFeatureUiState
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
                },
                { provide: LOCALE_ID, useValue: 'pt-BR' },
                { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
            ]
        };
    }
}

