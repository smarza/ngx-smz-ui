import { AuthenticationState } from './authentication.state';
import { Selector, createSelector } from '@ngxs/store';
import { AppStateModel } from '../../app.state';

export class LegacyAuthenticationSelectors {

    // Retorna True se o usuário possuir todas as claims de acesso no token
    @Selector([AuthenticationState])
    public static hasGroupOfClaimAccess(claims: string[]): any {
        const selector = createSelector([AuthenticationState], (state: AppStateModel) => {

            if (state.global.authentication.userdata == null || state.global.authentication.userdata.roles == null) {
                return false;
            }

            let hasAccess = true;

            const roles: string[] = state.global.authentication.userdata.roles;

            for (const checkedClaim of claims) {
                hasAccess = hasAccess && (roles.includes(checkedClaim));
            }

            return hasAccess;
        });

        return selector;
    }

    // Retorna True se o usuário possuir pelo menos uma das claims de acesso no token
    @Selector([AuthenticationState])
    public static hasAnyOfClaimAccess(claims: string[]): any {
        const selector = createSelector([AuthenticationState], (state: AppStateModel) => {

            if (state.global.authentication.userdata == null || state.global.authentication.userdata.roles == null) {
                return false;
            }

            let hasAccess = claims?.length > 0 ? false : true;

            const roles: string[] = state.global.authentication.userdata.roles;

            for (const checkedClaim of claims) {
                if (roles.includes(checkedClaim)) {
                    return true;
                }
            }

            return hasAccess;
        });

        return selector;
    }

    // Retorna True se o usuário possuir a claim de acesso no token
    @Selector([AuthenticationState])
    public static hasClaimAccess(claim: string): any {
        const selector = createSelector([AuthenticationState], (state: AppStateModel) => {

            if (state.global.authentication.userdata == null || state.global.authentication.userdata.roles == null) {
                return false;
            }

            return state.global.authentication.userdata.roles.includes(claim);
        });

        return selector;
    }

}