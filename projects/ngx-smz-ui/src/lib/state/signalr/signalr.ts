export interface SignalRConfig {
  hub: string;
  method: string;
  retryDelays: number[];
  dataBehavior: 'store' | 'action';
}

export interface SendSignalRData<T> {
  hub: string;
  method: string;
  data: T;
}

export interface SignalRConnection<T> {
  config: SignalRConfig;
  data: T;
}