import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgxRbkUtilsConfig } from '../../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzExcelsDetails } from '../../../modules/smz-excels/models/smz-excel-table';
import { ExcelsUiActions } from './excels.actions';
import { ExcelsService } from './excels.service';

export const EXCELS_STATE_NAME = 'excels';

export interface ExcelsUiStateModel
{
}

export const getInitialState = (): ExcelsUiStateModel => ({
});

@State<ExcelsUiStateModel>({
    name: EXCELS_STATE_NAME,
    defaults: getInitialState()
})

@Injectable()
export class ExcelsUiState
{
    constructor(private apiService: ExcelsService, private rbkConfig: NgxRbkUtilsConfig) { }


    @Action(ExcelsUiActions.GenerateTable)
    public onCreate$(ctx: StateContext<ExcelsUiStateModel>, action: ExcelsUiActions.GenerateTable): Observable<SmzExcelsDetails>
    {
        return this.apiService.generateTables(action.data).pipe(
            tap((result: SmzExcelsDetails) =>
            {
                ctx.dispatch(new ExcelsUiActions.GenerateTableSuccess(result));
            })
        );

    }

    @Action(ExcelsUiActions.GenerateTableSuccess)
    public onCreateSuccess(ctx: StateContext<ExcelsUiStateModel>, action: ExcelsUiActions.GenerateTableSuccess): void
    {

    }

}
