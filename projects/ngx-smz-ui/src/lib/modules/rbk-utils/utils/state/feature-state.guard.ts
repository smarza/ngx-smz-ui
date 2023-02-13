import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { NgxRbkUtilsConfig } from '../../ngx-rbk-utils.config';
import { isWithinTime } from '../utils';
import { FeaturesSelectors } from '../../../../state/features/features.selectors';

@Injectable({ providedIn: 'root' })
export class RbkFeatureStateGuard implements CanActivate {
    constructor(private store: Store, private config: NgxRbkUtilsConfig) { }

    public canActivate(snapshot: ActivatedRouteSnapshot): Observable<boolean> {
        if (this.config.debugMode) console.groupCollapsed(`RbkFeatureStateGuard on route /${snapshot.routeConfig.path}`);

        const states = snapshot.routeConfig.data.requiredFeatureStates as string[];

        if (states == null ||
            states?.length === 0) {
            if (this.config.debugMode) console.groupEnd();
            return of(true);
        }

        if (this.config.debugMode) console.log('[RbkFeatureStateGuard] Required Feature states', states);

        for (const name of states) {

            const stateConfig = this.config.state.feature[name];

            if (stateConfig == null) {
                if (this.config.debugMode) console.groupEnd();
                throw new Error('The route is asking for a state that is not setup in the config file');
            }

            const stateValue = this.store.selectSnapshot(x => x.features[name]);

            if (stateValue == null) {
                if (this.config.debugMode) console.groupEnd();
                throw new Error(name + ' state is null, is it properly initialized with a default value?');
            }

            if (stateValue.lastUpdated === undefined) {
                if (this.config.debugMode) console.groupEnd();
                throw new Error('For a state to be automatically loaded by the route it needs to have a "lastUpdated" property');
            }

            let dispatchAction = false;

            if (stateValue.lastUpdated == null) {
                dispatchAction = true;
            }
            else {
                if (stateConfig.cacheTimeout === 0 || stateConfig.cacheTimeout == null) {
                    if (this.config.debugMode) console.log('  [RbkFeatureStateGuard] ' + name + ' state cache timeout was not set, no cache will be used');
                    dispatchAction = true;
                }
                else if (!isWithinTime(stateValue.lastUpdated, stateConfig.cacheTimeout)) {
                    if (this.config.debugMode) console.log('  [RbkFeatureStateGuard] ' + name + ' state cache has expired');
                    dispatchAction = true;
                }
                else {
                    if (this.config.debugMode) console.log('  [RbkFeatureStateGuard] ' + name + ' state cache is already loaded and valid');
                }
            }

            if (dispatchAction) {
                if (this.config.debugMode) console.log('  [RbkFeatureStateGuard] Dispatching', stateConfig.loadAction.type);
                this.store.dispatch(stateConfig.loadAction);
            }
        }

        if (this.config.debugMode) console.groupEnd();

        return this.store
            .select(FeaturesSelectors.areStatesInitialized(states))
            .pipe(
                filter(x => x !== false),
                tap(() => {
                    if (this.config.debugMode) {
                        if (this.config.debugMode) console.log('RbkFeatureStateGuard granted access to the route');
                        console.groupEnd();
                    }
                })
            ) as Observable<boolean>;
    }
}