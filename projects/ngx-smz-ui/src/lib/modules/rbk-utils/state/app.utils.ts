import { DatabaseState, DATABASE_STATES } from './database/database.state';
import { GlobalState } from './global/global.state';
import { ApplicationState } from './global/application/application.state';
import { AuthenticationState } from './global/authentication/authentication.state';
import { FEATURE_STATES, FeaturesState } from './features/features.state';

export function buildState() {
    return [
        FeaturesState,
            ...FEATURE_STATES,
        DatabaseState,
            ...DATABASE_STATES,
        GlobalState,
            ApplicationState,
            AuthenticationState
    ];
}