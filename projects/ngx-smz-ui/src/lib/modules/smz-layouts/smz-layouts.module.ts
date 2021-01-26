import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './containers/main/main.component';
import { SmzLayoutsConfig } from './globals/smz-layouts.config';
import { defaultSmzLayoutsConfig } from './globals/default-smz-layouts.config';

import { MenubarModule } from 'primeng/menubar';
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { mergeClone } from '../../common/utils/deep-merge';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        MenubarModule,
        PrimeSharedModule,
    ],
    exports: [
        MainComponent
    ],
})
export class SmzLayoutsModule
{
    public static forRoot(configuration: SmzLayoutsConfig): ModuleWithProviders<SmzLayoutsModule>
    {
        return {
            ngModule: SmzLayoutsModule,
            providers: [
                {
                    provide: SmzLayoutsConfig,
                    useValue: mergeClone(defaultSmzLayoutsConfig, configuration)
                }
            ]
        };
    }
}

