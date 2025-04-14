import { createSelector, Store } from '@ngxs/store';
import { FeaturesState } from './features.state';
import { GlobalInjector } from '../../common/services/global-injector';

export class FeaturesSelectors {
    public static areStatesInitialized(states: string[]): (state) => boolean {
        const store: Store = GlobalInjector.instance.get(Store);

        const selector = createSelector([FeaturesState], (state: any) => {
            let allLoaded = true;

            for (const stateName of states) {
                allLoaded = allLoaded && state[stateName].lastUpdated != null;
            }
            return allLoaded;
        });

        return selector;
    }
}