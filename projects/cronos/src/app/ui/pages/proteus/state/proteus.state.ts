import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { Injectable } from '@angular/core';
import { ProteusActions } from './proteus.actions';
import { CADetails } from '@models/cadetails';
import { CaService } from '@services/api/ca.service';
import { UsersActions } from '@ngx-smz/core';
import { UserDetails } from '@models/user-details';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs';

export const PROTEUS_STATE_NAME = 'proteus';

export interface ProteusStateModel {
  employeeDetails: CADetails;
  requestCAErrors: string[];
}
export const getInitialProteusState = (): ProteusStateModel => ({
  employeeDetails: null,
  requestCAErrors: null,
});

@State<ProteusStateModel>({
  name: PROTEUS_STATE_NAME,
  defaults: getInitialProteusState(),
})
@Injectable()
export class ProteusState {

  constructor(private apiService: CaService) {}

  @Action(ProteusActions.GetCaEmployee)
  public onImportTopsideSystems$( ctx: StateContext<ProteusStateModel>, action: ProteusActions.GetCaEmployee): Observable<CADetails> {
    return this.apiService
      .withParameters<CaService>({ errorHandlingType: 'toast' })
      .getEmployeeDetails(action.data)
        .pipe(
          tap((result: CADetails) => {
            ctx.patchState({ employeeDetails: result, requestCAErrors: null });
          }),
          catchError(() => {
            ctx.patchState({ employeeDetails: null });
            return of(null);
          })
        );
  }

  @Action(ProteusActions.ClearCaEmployee)
  public onClearCaEmployee( ctx: StateContext<ProteusStateModel>): void {
    ctx.patchState(getInitialProteusState());
  }

  @Action(ProteusActions.UpdateEmployee)
  public onUpdateEmployee$( ctx: StateContext<ProteusStateModel>, action: ProteusActions.UpdateEmployee): Observable<UserDetails> {
    return this.apiService.updateEmployee(action.data).pipe(
      tap((result: UserDetails) => {
        ctx.dispatch(new UsersActions.LocalUpdate<UserDetails>(result));
      })
    );
  }

}