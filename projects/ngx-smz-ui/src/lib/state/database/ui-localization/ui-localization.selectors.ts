import {  Selector } from '@ngxs/store';
import { SmzUiLocale, UiLocalizationDbState, UiLocalizationDbStateModel } from './ui-localization.state';

// @dynamic
export class UiLocalizationDbSelectors {
    @Selector([UiLocalizationDbState])
    public static all(state: UiLocalizationDbStateModel): any
    {
        return state.data;
    }

    @Selector([UiLocalizationDbState])
    public static locales(state: UiLocalizationDbStateModel): SmzUiLocale[]
    {
        return state.locales;
    }

    @Selector([UiLocalizationDbState])
    public static current(state: UiLocalizationDbStateModel): SmzUiLocale
    {
        return state.locales.find(x => x.code == state.current);
    }
}