import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { isWithinTime } from '../utils';
import { FeaturesSelectors } from '../../../../state/features/features.selectors';
import { GlobalInjector } from '../../../../common/services/global-injector';

@Injectable({ providedIn: 'root' })
export class RbkFeatureStateGuard implements CanActivate {
    constructor(private store: Store) { }

    public canActivate(snapshot: ActivatedRouteSnapshot): Observable<boolean> {
        if (GlobalInjector.config.debugMode) console.groupCollapsed(`RbkFeatureStateGuard on route /${snapshot.routeConfig.path}`);

        const states = snapshot.routeConfig.data.requiredFeatureStates as string[];

        if (states == null ||
            states?.length === 0) {
            if (GlobalInjector.config.debugMode) console.groupEnd();
            return of(true);
        }

        if (GlobalInjector.config.debugMode) console.log('[RbkFeatureStateGuard] Required Feature states', states);

        for (const name of states) {

            const stateConfig = GlobalInjector.config.rbkUtils.state.feature[name];

            if (stateConfig == null) {
                if (GlobalInjector.config.debugMode) console.groupEnd();
                throw new Error('The route is asking for a state that is not setup in the config file');
            }

            const stateValue = this.store.selectSnapshot(x => x.features[name]);

            if (stateValue == null) {
                if (GlobalInjector.config.debugMode) console.groupEnd();
                throw new Error(name + ' state is null, is it properly initialized with a default value?');
            }

            if (stateValue.lastUpdated === undefined) {
                if (GlobalInjector.config.debugMode) console.groupEnd();
                throw new Error('For a state to be automatically loaded by the route it needs to have a "lastUpdated" property');
            }

            let dispatchAction = false;

            if (stateValue.lastUpdated == null) {
                dispatchAction = true;
            }
            else {
                if (stateConfig.cacheTimeout === 0 || stateConfig.cacheTimeout == null) {
                    if (GlobalInjector.config.debugMode) console.log('  [RbkFeatureStateGuard] ' + name + ' state cache timeout was not set, no cache will be used');
                    dispatchAction = true;
                }
                else if (!isWithinTime(stateValue.lastUpdated, stateConfig.cacheTimeout)) {
                    if (GlobalInjector.config.debugMode) console.log('  [RbkFeatureStateGuard] ' + name + ' state cache has expired');
                    dispatchAction = true;
                }
                else {
                    if (GlobalInjector.config.debugMode) console.log('  [RbkFeatureStateGuard] ' + name + ' state cache is already loaded and valid');
                }
            }

            if (dispatchAction) {
                if (GlobalInjector.config.debugMode) console.log('  [RbkFeatureStateGuard] Dispatching', stateConfig.loadAction.type);
                this.store.dispatch(stateConfig.loadAction);
            }
        }

        if (GlobalInjector.config.debugMode) console.groupEnd();

        return this.store
            .select(FeaturesSelectors.areStatesInitialized(states))
            .pipe(
                filter(x => x !== false),
                tap(() => {
                    if (GlobalInjector.config.debugMode) {
                        if (GlobalInjector.config.debugMode) console.log('RbkFeatureStateGuard granted access to the route');
                        console.groupEnd();
                    }
                })
            ) as Observable<boolean>;
    }
}