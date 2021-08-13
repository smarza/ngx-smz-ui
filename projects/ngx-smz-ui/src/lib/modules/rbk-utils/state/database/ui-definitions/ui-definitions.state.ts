import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { UiDefinitionsDbActions } from './ui-definitions.actions';
import { UiDefinitionsService } from './ui-definitions.service';
import { Observable } from 'rxjs';
import { FormDefinitionData } from 'ngx-smz-dialogs';

export const UI_DEFINITIONS_STATE_NAME = 'uiDefinitions';

export interface UiDefinitionsDbStateModel {
    lastUpdated: Date;
    data: {[key: string]: FormDefinitionData};
}

export const getInitialState = (): UiDefinitionsDbStateModel => ({
        lastUpdated: null,
        data: null
    });

// @dynamic
@State<UiDefinitionsDbStateModel>({
    name: UI_DEFINITIONS_STATE_NAME,
    defaults: getInitialState()
})
@Injectable()
export class UiDefinitionsDbState {
    constructor(private apiService: UiDefinitionsService) { }

    @Action(UiDefinitionsDbActions.LoadAll)
    public loadAll(ctx: StateContext<UiDefinitionsDbStateModel>, action: UiDefinitionsDbActions.LoadAll): Observable<any[]> {
        return this.apiService.all().pipe(
            tap((result: any) => ctx.patchState({
                data: result,
                lastUpdated: new Date()
            }))
        );
    }
}