import { DEFAULT_CURRENCY_CODE, LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSmzLayoutsRoutingModule } from './ngx-smz-layouts-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { NgxSmzRouterParamsModule } from '../smz-router-params/ngx-smz-router-params.module';
import moment from 'moment';

// Register the localization
registerLocaleData(localePt, 'pt-BR');
moment.locale('pt-br');

@NgModule({
    declarations: [],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        NgxSmzLayoutsRoutingModule,
        NgxSmzRouterParamsModule,
    ],
    exports: [],
})
export class NgxSmzLayoutsModule
{
    public static forRoot(): ModuleWithProviders<NgxSmzLayoutsModule>
    {

        return {
            ngModule: NgxSmzLayoutsModule,
            providers: [
                { provide: LOCALE_ID, useValue: 'pt-BR' },
                { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
            ]
        };
    }
}

