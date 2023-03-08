import { Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { cloneDeep } from 'lodash-es';
import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';

export class GlobalInjector {
  public static instance: Injector = null;
  public static _config: NgxSmzUiConfig = null;

  static get config(): NgxSmzUiConfig {
    return cloneDeep(this._config);
  }

  static set config(data: NgxSmzUiConfig) {
    GlobalInjector._config = data;
  }

  public static store: Store = null;
}