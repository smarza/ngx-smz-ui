import { NgModule, ErrorHandler, ModuleWithProviders } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TitleService } from './misc/title.service';
import { MessageService } from 'primeng/api';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HttpErrorInterceptor } from './error-handler/error.interceptor';
import { GlobalPendingInterceptorService } from './http/global.pending.interceptor';
import { LocalPendingInterceptorService } from './http/local.pending.interceptor';
import { Router, RouteReuseStrategy } from '@angular/router';
import { CachedRouteReuseStrategy } from './utils/reusable-route';
import { GlobalErrorHandler } from './error-handler/global-error.interceptor';

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [],
    declarations: [],
    providers: [
        AuthService,
        TitleService,
        MessageService,
        {
            provide: RouteReuseStrategy,
            useClass: CachedRouteReuseStrategy,
        },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalPendingInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LocalPendingInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
    ],
})
export class NgxRbkUtilsModule {
    constructor(private router: Router) {
    }

    public static forRoot(): ModuleWithProviders<NgxRbkUtilsModule> {
        return {
            ngModule: NgxRbkUtilsModule,
            providers: []
        };
    }

}