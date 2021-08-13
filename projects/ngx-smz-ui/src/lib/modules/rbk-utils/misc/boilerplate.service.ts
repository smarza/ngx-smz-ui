import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { TitleService } from './title.service';
import { AuthenticationActions } from '../state/global/authentication/authentication.actions';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';
import { DATABASE_REQUIRED_ACTIONS } from '../state/database/database.state';
import { ApplicationActions } from '../state/global/application/application.actions';
import { DatabaseActions } from '../state/database/database.actions';
import { Subscription } from 'rxjs';
import { FeaturesActions } from '../state/features/features.actions';
import { filter } from 'rxjs/operators';
import { GlobalActions } from '../state/global/global.actions';

@Injectable({ providedIn: 'root' })
export class BoilerplateService {
    private subs1: Subscription;
    private subs2: Subscription;
    private subs3: Subscription;

    constructor(private titleService: TitleService, private store: Store, private rbkConfig: NgxRbkUtilsConfig, private actions$: Actions) { }

    public init(): void {
        // if (this.rbkConfig.debugMode) console.log('[Boilerplate Service] Initializing Service');
        this.killSubscriptions();

        if (this.rbkConfig.useTitleService === true) {
            this.titleService.init();
        }

        this.subs1 = this.actions$.subscribe(dispatchData => {
            if (dispatchData.action.constructor.type === AuthenticationActions.RemoteLoginSuccess.type) {
                this.store.dispatch(new Navigate([this.rbkConfig.routes.authenticatedRoot]));
            }
        });

        this.subs3 = this.actions$.pipe(ofActionDispatched(AuthenticationActions.Logout)).subscribe(() => {
            this.store.dispatch(new Navigate([this.rbkConfig.routes.login]));

            this.store.dispatch(new DatabaseActions.Clear());
            this.store.dispatch(new FeaturesActions.Clear());
            this.store.dispatch(new GlobalActions.Clear());
        });

        this.store.dispatch(new AuthenticationActions.LocalLogin());
    }

    private killSubscriptions(): void {
        if (this.rbkConfig.debugMode) console.log('[Boilerplate Service] Killing subscriptions, if any');

        if (this.subs1 != null) this.subs1.unsubscribe();
        if (this.subs2 != null) this.subs2.unsubscribe();
        if (this.subs3 != null) this.subs3.unsubscribe();
    }
}