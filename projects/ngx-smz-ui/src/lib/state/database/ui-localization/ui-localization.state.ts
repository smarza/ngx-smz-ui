import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { UiLocalizationDbActions } from './ui-localization.actions';
import { UiLocalizationService } from './ui-localization.service';
import { Observable } from 'rxjs';

export interface SmzUiLocale { code: string, name: string, country: string };

export const UI_LOCALIZATION_STATE_NAME = 'uiLocalization';

export interface UiLocalizationDbStateModel {
    lastUpdated: Date;
    current: string;
    locales: SmzUiLocale[];
    data: any;
}

export const getUiLocalizationInitialState = (): UiLocalizationDbStateModel => ({
    lastUpdated: null,
    current: null,
    locales: [],
    data: null
});

// @dynamic
@State<UiLocalizationDbStateModel>({
    name: UI_LOCALIZATION_STATE_NAME,
    defaults: getUiLocalizationInitialState()
})
@Injectable()
export class UiLocalizationDbState {
    constructor(private apiService: UiLocalizationService) { }

    @Action(UiLocalizationDbActions.LoadAll)
    public onLoadAll$(ctx: StateContext<UiLocalizationDbStateModel>, action: UiLocalizationDbActions.LoadAll): Observable<any[]> {
        const current = ctx.getState().current;

        return this.apiService.all(current).pipe(
            tap((result: any) => ctx.patchState({ data: result, lastUpdated: new Date() }))
        );
    }

    @Action(UiLocalizationDbActions.SetCurrent)
    public onSetCurrent$(ctx: StateContext<UiLocalizationDbStateModel>, action: UiLocalizationDbActions.SetCurrent): void {
        ctx.patchState({ current: action.current, lastUpdated: null });
        ctx.dispatch(new UiLocalizationDbActions.LoadAll());
    }

    @Action(UiLocalizationDbActions.SetLocales)
    public onSetLocales$(ctx: StateContext<UiLocalizationDbStateModel>, action: UiLocalizationDbActions.SetLocales): void {
        ctx.patchState({ locales: action.locales })
    }
}