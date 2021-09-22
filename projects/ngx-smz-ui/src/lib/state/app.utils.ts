import { DatabaseState, DATABASE_STATES } from './database/database.state';
import { GlobalState } from './global/global.state';
import { ApplicationState } from './global/application/application.state';
import { AuthenticationState } from './global/authentication/authentication.state';
import { FEATURE_STATES, FeaturesState } from './features/features.state';
import { UiState, UI_STATES } from './ui/ui.state';

export function buildState() {
    return [
        FeaturesState,
            ...FEATURE_STATES,
        DatabaseState,
            ...DATABASE_STATES,
        UiState,
            ...UI_STATES,
        GlobalState,
            ApplicationState,
            AuthenticationState
    ];
}