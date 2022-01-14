import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SignalRActions } from './signalr.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SignalRService } from './signalr.service';
import { cloneDeep } from 'lodash-es';
import { SignalRConfig, SignalRConnection } from './signalr';

export const SIGNALR_STATE_NAME = 'SignalR';

export interface SignalRStateModel {
  payloads: { [key: string]: SignalRConnection<unknown> };
}

export const getInitialSignalRState = (): SignalRStateModel => ({
  payloads: {}
});

@State<SignalRStateModel>({
  name: SIGNALR_STATE_NAME,
  defaults: getInitialSignalRState()
})

@Injectable()
export class SignalRState {
  constructor(private service: SignalRService) {}

  @Action(SignalRActions.Connect)
  public onConnect$(ctx: StateContext<SignalRStateModel>, action: SignalRActions.Connect): Observable<void> {
    return this.service.newConnection(action.data).pipe(
      tap((test) => {

        const payloads = cloneDeep(ctx.getState().payloads);
        const key = `${action.data.hub}/${action.data.method}`;

        payloads[key] = { config: action.data, data: action.data.dataBehavior === 'accumulate' ? [] : null };

        ctx.patchState({ payloads });

        this.service.addListener(action.data, (payload) => {

          console.log(payload);
          const payloads = cloneDeep(ctx.getState().payloads);

          const data = payloads[key].data as any;

          const newData = action.data.dataBehavior === 'accumulate' ?
            [ ...data, payload] :
            payload;

          payloads[key] = { config: action.data, data: newData };

          ctx.patchState({ payloads });
        })
      })
    );
  }

  @Action(SignalRActions.Send)
  public onSend$(ctx: StateContext<SignalRStateModel>, action: SignalRActions.Send): void {
    this.service.send(action.data);
  }

  @Action(SignalRActions.CloseHub)
  public onCloseHub$(ctx: StateContext<SignalRStateModel>, action: SignalRActions.CloseHub): void {
    this.service.closeHub(action.hub, (listeners) => {

      const payloads = cloneDeep(ctx.getState().payloads);

      listeners.forEach(method => {
        const key = `${action.hub}/${method}`;
        delete payloads[key];
      })

      ctx.patchState({ payloads });
    });
  }

  @Action(SignalRActions.CloseHubConnection)
  public onCloseHubConnection$(ctx: StateContext<SignalRStateModel>, action: SignalRActions.CloseHubConnection): void {
    this.service.closeConnection(action.data, (method) => {

      const payloads = cloneDeep(ctx.getState().payloads);

      const key = `${action.data.hub}/${method}`;

      delete payloads[key];

      ctx.patchState({ payloads });
    });
  }

}

