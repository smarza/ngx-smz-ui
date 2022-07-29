import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { downloadBase64File } from '../../../common/utils/utils';
import { NgxRbkUtilsConfig } from '../../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzExcelsDetails } from '../../../modules/smz-excels/models/smz-excel-table';
import { ToastActions } from '../../global/application/application.actions.toast';
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

        if (action.data.isRequestLimitExceeded) {
            ctx.dispatch(new ExcelsUiActions.GenerateTableSuccess(null));
            ctx.dispatch(new ToastActions.Warning('Não foi possível gerar o excel pois ultrapassou o limite de tamanho.'));
            return of();
        }
        else {
            return this.apiService.generateTables(action.data).pipe(
                tap((result: SmzExcelsDetails) =>
                {
                    if (action.downloadAfter) {
                        downloadBase64File(result.file, result.fileName, result.fileExtension);
                    }
                    else {
                        ctx.dispatch(new ExcelsUiActions.GenerateTableSuccess(result));
                    }

                    ctx.dispatch(new ToastActions.Success('Excel gerado com sucesso.'));
                })
            );
        }


    }

    @Action(ExcelsUiActions.GenerateTableSuccess)
    public onCreateSuccess(ctx: StateContext<ExcelsUiStateModel>, action: ExcelsUiActions.GenerateTableSuccess): void
    {

    }

}
