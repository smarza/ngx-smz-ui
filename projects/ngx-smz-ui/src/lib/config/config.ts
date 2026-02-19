import { Injectable } from '@angular/core';

export type SmzEnvironmentConfigType = {
    serverUrl: string;
    authenticationApi: string;
    baseHref: string;
    production: boolean;
};

@Injectable({ providedIn: 'root' })
export class SmzEnvironment {

  public serverUrl: string = '';
  public authenticationApi: string = '';
  public baseHref: string = '';
  public production: boolean = false;
  setConfig(config: SmzEnvironmentConfigType): void {
    const { serverUrl, authenticationApi, baseHref, production } = config || {};

    if (serverUrl) {
      this.serverUrl = serverUrl;
    }

    if (authenticationApi) {
      this.authenticationApi = authenticationApi;
    }

    if (baseHref) {
      this.baseHref = baseHref;
    }

    if (production) {
      this.production = production;
    }
  }
}
