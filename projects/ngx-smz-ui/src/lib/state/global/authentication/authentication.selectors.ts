import { AuthenticationState, AuthenticationStateModel } from './authentication.state';
import { Selector, Store, createSelector } from '@ngxs/store';
import { AppStateModel } from '../../app.state';
import { BaseUserData } from '../../../modules/smz-access/models/base-user-data';
import { GlobalInjector } from '../../../common/services/global-injector';

export class AuthenticationSelectors {
    @Selector([AuthenticationState])
    public static accessToken(state: AuthenticationStateModel<BaseUserData>): string | null {
        return state.accessToken;
    }

    @Selector([AuthenticationState])
    public static refreshToken(state: AuthenticationStateModel<BaseUserData>): string | null {
        return state.refreshToken;
    }

    @Selector([AuthenticationState])
    public static isAuthenticated(state: AuthenticationStateModel<BaseUserData>): boolean {
        return !!state.accessToken;
    }

    @Selector([AuthenticationState])
    public static userdata(state: AuthenticationStateModel<BaseUserData>): BaseUserData {
        return state.userdata;
    }

    @Selector([AuthenticationState])
    public static userdataPicture(state: AuthenticationStateModel<BaseUserData>): string {
        return state.userdata.picture;
    }

    @Selector([AuthenticationState])
    public static username(state: AuthenticationStateModel<BaseUserData>): string {
        return state.userdata.username;
    }

    @Selector([AuthenticationState])
    public static isSuperuserLogged(state: AuthenticationStateModel<BaseUserData>): boolean {
        return state.userdata?.tenant === '';
    }

    // Retorna True se o usuário possuir todas as claims de acesso no token
    @Selector([AuthenticationState])
    public static hasGroupOfClaimAccess(claims: string[]): any {
        const selector = createSelector([AuthenticationState], (state: AppStateModel) => {

            if (state.global.authentication.userdata == null || state.global.authentication.userdata.roles == null) {
                return false;
            }

            const validationSelectors = GlobalInjector.config.rbkUtils.authorization.validationSelectors;

            if (validationSelectors?.hasGroupOfClaimAccess) {
                const store: Store = GlobalInjector.instance.get(Store);
                return store.selectSnapshot(validationSelectors.hasGroupOfClaimAccess(claims));
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

            const validationSelectors = GlobalInjector.config.rbkUtils.authorization.validationSelectors;

            if (validationSelectors?.hasAnyOfClaimAccess) {
                const store: Store = GlobalInjector.instance.get(Store);
                return store.selectSnapshot(validationSelectors.hasAnyOfClaimAccess(claims));
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

            if (GlobalInjector.config.debugMode) {
                console.log(`> hasClaimAccess('${claim}')...`)
            }

            const validationSelectors = GlobalInjector.config.rbkUtils.authorization.validationSelectors;

            if (validationSelectors?.hasClaimAccess) {

                const store: Store = GlobalInjector.instance.get(Store);

                const hasClaimAccess = store.selectSnapshot(validationSelectors.hasClaimAccess(claim));

                if (GlobalInjector.config.debugMode) {
                    console.log(`> calling customized hasClaimAccess('${claim}') => '${hasClaimAccess}'`)
                }

                return hasClaimAccess;
            }

            return state.global.authentication.userdata.roles.includes(claim);
        });

        return selector;
    }

}