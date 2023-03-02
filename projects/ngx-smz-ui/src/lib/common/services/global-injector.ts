import { Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';

export class GlobalInjector {
  public static instance: Injector = null;
  public static config: NgxSmzUiConfig = null;
  public static store: Store = null;
}