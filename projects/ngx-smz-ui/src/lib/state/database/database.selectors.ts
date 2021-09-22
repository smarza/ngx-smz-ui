import { createSelector } from '@ngxs/store';
import { DatabaseState } from './database.state';

export class DatabaseSelectors {
    public static areStatesInitialized(states: string[]): (state) => boolean {
        const selector = createSelector([DatabaseState], (state: any) => {
            let allLoaded = true;

            for (const stateName of states) {
                allLoaded = allLoaded && state[stateName].lastUpdated != null;
            }
            return allLoaded;
        });

        return selector;
    }
}