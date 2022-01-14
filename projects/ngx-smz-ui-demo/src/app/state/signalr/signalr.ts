export interface SignalRConfig {
  hub: string;
  method: string;
  dataBehavior: 'accumulate' | 'replace'
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