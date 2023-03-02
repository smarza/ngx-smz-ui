import { Injectable, Injector } from '@angular/core';
import { GlobalInjector } from './global-injector';

@Injectable({
  providedIn: 'root'
})
export class SmzInjectorService {

  static setInjector(injector: Injector) {
    console.log('setInjector', injector);
    GlobalInjector.instance = injector;
  }

  static getInjector(): Injector {
    console.log('getInjector', GlobalInjector.instance);
    return GlobalInjector.instance;
  }
}
