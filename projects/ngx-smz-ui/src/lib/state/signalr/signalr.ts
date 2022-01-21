export interface SignalRConfig {
  hub: string;
  method: string;
  dataBehavior: 'accumulate' | 'replace';
  retryDelays: number[];
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