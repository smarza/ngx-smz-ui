import { DemoCreationData, DemoItem, DemoUpdateData } from '../../models/demo';
import { SendSignalRData, SignalRConfig } from './signalr';

export namespace SignalRActions {

  export class Connect {
    public static readonly type = '[SIGNALR] Connect';
    constructor(public data: SignalRConfig) {}
  }

  export class Send {
    public static readonly type = '[SIGNALR] Send';
    constructor(public data: SendSignalRData<unknown>) {}
  }

  export class CloseHub {
    public static readonly type = '[SIGNALR] Close Hub';
    constructor(public hub: string) {}
  }

  export class CloseHubConnection {
    public static readonly type = '[SIGNALR] Close Hub Connection';
    constructor(public data: SignalRConfig) {}
  }

}