import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ERROR_HANDLING_TYPE_HEADER, RESTORE_STATE_ON_ERROR_HEADER, IGNORE_ERROR_HANDLING } from '../http/base-api.service';
import { ApplicationActions } from '../state/global/application/application.actions';
import { tap } from 'rxjs/operators';
import { DatabaseActions } from '../state/database/database.actions';
import { FeaturesActions } from '../state/features/features.actions';
import { GlobalActions } from '../state/global/global.actions';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private store: Store, private route: ActivatedRoute, private router: Router) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const restoreStateOnError = request.headers.get(RESTORE_STATE_ON_ERROR_HEADER);

        if (restoreStateOnError === 'true') {
            this.store.dispatch(new GlobalActions.Restore());
            this.store.dispatch(new DatabaseActions.Restore());
            this.store.dispatch(new FeaturesActions.Restore());
        }

        const errorHandlingType = request.headers.get(ERROR_HANDLING_TYPE_HEADER);
        if (errorHandlingType === 'none') {
            return next.handle(request);
        }
        else {
            return next.handle(request).pipe(
                tap({
                    error: (err: any) => {
                        if (request.headers.get(IGNORE_ERROR_HANDLING) === 'true'){
                            return;
                        }

                        let handled = false;

                        if (err instanceof HttpErrorResponse) {
                            // Se a API retornar 302 tem que ter a url relativa no campo error, para usar diretamente no router.
                            // Nesse caso não deve ser tratado como erro normal, por isso o handled para pular o tratamento de
                            // erros em diálogo ou toast
                            if (err.status === 302) {
                                handled = true;
                                this.router.navigate([err.error]);
                            }

                            if (err.status === 400 || err.status === 500) {
                                // Maybe log something here?
                            }
                        }
                        if (!handled) {
                            if (errorHandlingType === 'dialog') {
                                this.store.dispatch(new ApplicationActions.HandleHttpErrorWithDialog(err));
                            }

                            if (errorHandlingType === 'toast') {
                                this.store.dispatch(new ApplicationActions.HandleHttpErrorWithToast(err));
                            }
                        }

                    }
                })
            );
        }
    }
}
