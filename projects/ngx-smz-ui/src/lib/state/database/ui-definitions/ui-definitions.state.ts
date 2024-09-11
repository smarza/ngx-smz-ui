import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { UiDefinitionsDbActions } from './ui-definitions.actions';
import { UiDefinitionsService } from './ui-definitions.service';
import { Observable } from 'rxjs';
import { FormDefinitionData } from '../../../builders/smz-dialogs/dialog-input-conversion';

export const UI_DEFINITIONS_STATE_NAME = 'uiDefinitions';

export interface UiDefinitionsDbStateModel {
    lastUpdated: Date;
    data: {[key: string]: FormDefinitionData};
}

export const getUiDefinitionsInitialState = (): UiDefinitionsDbStateModel => ({
        lastUpdated: null,
        data: null
    });

// @dynamic
@State<UiDefinitionsDbStateModel>({
    name: UI_DEFINITIONS_STATE_NAME,
    defaults: getUiDefinitionsInitialState()
})
@Injectable()
export class UiDefinitionsDbState {
    constructor(private apiService: UiDefinitionsService) { }

    @Action(UiDefinitionsDbActions.LoadAll)
    public loadAll(ctx: StateContext<UiDefinitionsDbStateModel>, action: UiDefinitionsDbActions.LoadAll): Observable<any[]> {
        return this.apiService
            .withParameters<UiDefinitionsService>({ authentication: false, needToRefreshToken: false })
            .all()
            .pipe(
                tap((result: any) => ctx.patchState({
                    data: result,
                    lastUpdated: new Date()
                }))
        );
    }

    @Action(UiDefinitionsDbActions.Inject)
    public inject(ctx: StateContext<UiDefinitionsDbStateModel>, action: UiDefinitionsDbActions.Inject): void {
        ctx.patchState({
            data: action.data
        });
    }
}