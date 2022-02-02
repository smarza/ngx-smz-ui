import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { cloneDeep } from 'lodash-es';
import { from, Observable, of } from 'rxjs';
import { SendSignalRData, SignalRConfig } from './signalr';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  public hubs: { config: SignalRConfig, connection: HubConnection, listeners: string[] }[] = [];

  constructor() {
  }

  public newConnection(config: SignalRConfig): Observable<any> {

    var exists = this.hubs.find(x => x.config.hub === config.hub);

    if (exists) return of(true);

    const newConnection = new HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl(`${environment.serverUrl}/${config.hub}`, { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets})
      // .withUrl(`https://localhost:7229/${config.hub}`, { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets})
      .withAutomaticReconnect(config.retryDelays)
      .build();

    this.hubs.push({ config, connection: newConnection, listeners: [] });

    return from(newConnection.start());

  }

  public addListener(config: SignalRConfig, receive: (data) => void): void {
    var exists = this.hubs.find(x => x.config.hub === config.hub);

    if (exists) {
      this.setupListener(exists.connection, config, receive);
      exists.listeners.push(config.method);
    }
  }

  public send(event: SendSignalRData<unknown>): void {

    var exists = this.hubs.find(x => x.config.hub === event.hub);

    if (exists) {

      exists.connection
        .invoke(event.method, event.data)
        .catch((err) => {
          return console.error(err.toString());
        })
        .then((event) => {
          // console.log('invoke Then', event);
        });
    }

  }

  public closeHub(hub: string, success: (methods: string[]) => void) {
    var exists = this.hubs.find(x => x.config.hub === hub);

    if (exists) {

      exists.connection.stop()
        .catch((err) => {
          return console.error(err.toString());
        })
        .then(() => {
          const listeners = cloneDeep(exists.listeners);

          const index = this.hubs.findIndex(x => x.config.hub === hub);

          if (this.hubs.length === 1) {
            this.hubs = [];
          }
          else {
            delete this.hubs[index];
          }

          success(listeners);
        });
    }
  }

  public closeConnection(config: SignalRConfig, success: (method: string) => void) {
    var exists = this.hubs.find(x => x.config.hub === config.hub);

    if (exists) {

      exists.connection.off(`${config.method}Payload`);

      const index = exists.listeners.findIndex(x => x === config.method);
      delete exists.listeners[index];

      success(config.method);
    }
  }

  private setupListener(connection: signalR.HubConnection, config: SignalRConfig, receive: (data) => void): void {
    connection.on(`${config.method}Payload`, (data) => receive(data));
  }

}