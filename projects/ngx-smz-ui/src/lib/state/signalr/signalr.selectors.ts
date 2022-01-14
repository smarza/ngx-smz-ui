import { createSelector, Selector } from '@ngxs/store';
import { SignalRConfig, SignalRConnection } from './signalr';
import { SignalRState, SignalRStateModel } from './signalr.state';

export class SignalRSelectors {

  @Selector([SignalRState])
  public static connections(state: SignalRStateModel): SignalRConfig[] {
    const keys = Reflect.ownKeys(state.payloads) as string[];

    const results = [];

    keys.forEach(key => {
      results.push(state.payloads[key].config);
    })
    return results;
  }

  public static connection<T>(config: SignalRConfig): (state) => SignalRConnection<T> {

    return createSelector([SignalRState], (state: SignalRStateModel) => {
      const payload = state.payloads[`${config.hub}/${config.method}`];
      return payload as SignalRConnection<T>;
    });

  }

}