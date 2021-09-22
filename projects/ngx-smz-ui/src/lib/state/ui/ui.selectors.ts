import { createSelector } from '@ngxs/store';
import { UiState } from './ui.state';

export class UiSelectors {
    public static areStatesInitialized(states: string[]): (state) => boolean {
        const selector = createSelector([UiState], (state: any) => {
            let allLoaded = true;

            for (const stateName of states) {
                allLoaded = allLoaded && state[stateName].lastUpdated != null;
            }
            return allLoaded;
        });

        return selector;
    }
}