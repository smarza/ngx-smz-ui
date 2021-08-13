import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ApplicationSelectors } from '../../state/global/application/application.selector';
import { NgxRbkUtilsConfig } from '../../ngx-rbk-utils.config';
import { DatabaseSelectors } from '../../state/database/database.selectors';
import { isWithinTime } from '../utils';

@Injectable({ providedIn: 'root' })
export class RbkDatabaseStateGuard implements CanActivate {
    constructor(private store: Store, private config: NgxRbkUtilsConfig) { }

    public canActivate(snapshot: ActivatedRouteSnapshot): Observable<boolean> {
        if (this.config.debugMode) console.groupCollapsed(`RbkDatabaseStateGuard on route /${snapshot.routeConfig.path}`);

        const states = snapshot.routeConfig.data.requiredStates;

        if (snapshot.routeConfig.data.requiredStates == null ||
            snapshot.routeConfig.data.requiredStates?.length === 0) {
            return of(true);
        }

        if (this.config.debugMode) console.log('[RbkDatabaseStateGuard] Required states', states);

        for (const name of states) {
            const stateConfig = this.config.state.database[name];
            if (stateConfig == null) {
                throw new Error('The route is asking for a state that is not setup in the config file');
            }

            const stateValue = this.store.selectSnapshot(x => x.database[name]);

            if (stateValue == null) {
                throw new Error(name + ' state is null, is it properly initialized with a default value?');
            }

            if (stateValue.lastUpdated === undefined) {
                throw new Error('For a state to be automatically loaded by the route it needs to have a "lastUpdated" property');
            }

            let dispatchAction = false;

            if (stateValue.lastUpdated == null) {
                dispatchAction = true;
            }
            else {
                if (stateConfig.cacheTimeout === 0 || stateConfig.cacheTimeout == null) {
                    if (this.config.debugMode) console.log('  [RbkDatabaseStateGuard] ' + name + ' state cache timeout was not set, no cache will be used');
                    dispatchAction = true;
                }
                else if (!isWithinTime(stateValue.lastUpdated, stateConfig.cacheTimeout)) {
                    if (this.config.debugMode) console.log('  [RbkDatabaseStateGuard] ' + name + ' state cache has expired');
                    dispatchAction = true;
                }
                else {
                    if (this.config.debugMode) console.log('  [RbkDatabaseStateGuard] ' + name + ' state cache is already loaded and valid');
                }
            }

            if (dispatchAction) {
                if (this.config.debugMode) console.log('  [RbkDatabaseStateGuard] Dispatching', stateConfig.loadAction.type);
                this.store.dispatch(stateConfig.loadAction);
            }
        }

        return this.store
            .select(DatabaseSelectors.areStatesInitialized(states))
            .pipe(
                filter(x => x !== false),
                tap(() => {
                    if (this.config.debugMode) {
                        if (this.config.debugMode) console.log('RbkDatabaseStateGuard granted access to the route');
                        console.groupEnd();
                    }
                })
            ) as Observable<boolean>;
    }
}