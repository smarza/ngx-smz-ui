import { AuthenticationState, AuthenticationStateModel } from './authentication.state';
import { Selector, createSelector } from '@ngxs/store';
import { AppStateModel } from '../../app.state';

export class AuthenticationSelectors {
    @Selector([AuthenticationState])
    public static accessToken(state: AuthenticationStateModel): string | null {
        return state.accessToken;
    }

    @Selector([AuthenticationState])
    public static refreshToken(state: AuthenticationStateModel): string | null {
        return state.refreshToken;
    }

    @Selector([AuthenticationState])
    public static isAuthenticated(state: AuthenticationStateModel): boolean {
        return !!state.accessToken;
    }

    @Selector([AuthenticationState])
    public static userdata<T>(state: AuthenticationStateModel): T {
        return state.userdata as T;
    }

    @Selector([AuthenticationState])
    public static username(state: AuthenticationStateModel): string {
        return state.userdata.username;
    }

    // Retorna True se o usuário possuir todas as claims de acesso no token
    @Selector([AuthenticationState])
    public static hasGroupOfClaimAccess(claims: string[]): any {
        const selector = createSelector([AuthenticationState], (state: AppStateModel) => {

            if (state.global.authentication.userdata == null || state.global.authentication.userdata.roles == null) {
                return false;
            }

            let hasAccess = true;

            const roles: string[] = state.global.authentication.userdata.roles;
            const domain = state.global.authentication.userdata.domain;
            for (const checkedClaim of claims) {
                hasAccess = hasAccess && (roles.includes(checkedClaim) || roles.includes(`${domain}|${checkedClaim}`));
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
            const domain = state.global.authentication.userdata.domain;
            for (const checkedClaim of claims) {
                if ((roles.includes(checkedClaim) || roles.includes(`${domain}|${checkedClaim}`))) {
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

            let hasAccess = state.global.authentication.userdata.roles.includes(claim);

            if (!hasAccess) {
                const domain = state.global.authentication.userdata.domain;
                hasAccess = state.global.authentication.userdata.roles.includes(`${domain}|${claim}`);
            }

            return hasAccess;
        });

        return selector;
    }
}