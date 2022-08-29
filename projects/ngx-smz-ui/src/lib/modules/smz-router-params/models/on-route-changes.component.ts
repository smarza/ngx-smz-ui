import {
  InjectableType,
  ɵComponentType as ComponentType,
  ɵDirectiveType as DirectiveType,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalInjector } from '../../rbk-utils/misc/global.injector';
import { routerParamsListener } from '../router-params-listener';
import { ActivatedRoute } from '@angular/router';

import {
  getSymbol,
  UntilDestroyOptions,
  completeSubjectOnTheInstance,
  markAsDecorated,
} from './internals';

function unsubscribe(property: unknown): void {
  if (property instanceof Subscription) {
    property.unsubscribe();
  }
}

function unsubscribeIfPropertyIsArrayLike(property: unknown[]): void {
  Array.isArray(property) && property.forEach(unsubscribe);
}

function decorateNgOnDestroy(
  ngOnDestroy: (() => void) | null | undefined,
  options: UntilDestroyOptions
) {
  return function (this: any) {
    // Invoke the original `ngOnDestroy` if it exists
    ngOnDestroy && ngOnDestroy.call(this);

    // It's important to use `this` instead of caching instance
    // that may lead to memory leaks
    completeSubjectOnTheInstance(this, getSymbol());

    // Check if subscriptions are pushed to some array
    if (options.arrayName) {
      unsubscribeIfPropertyIsArrayLike(this[options.arrayName]);
    }

    // Loop through the properties and find subscriptions
    if (options.checkProperties) {
      for (const property in this) {
        if (options.blackList?.includes(property)) {
          continue;
        }

        unsubscribe(this[property]);
      }
    }
  };
}

function decorateNgRoute(
  call: (() => void) | null | undefined) {
  return function (this: any) {
    console.log('call', call);
    console.log('this', this);
  };
}

function decorateProviderDirectiveOrComponent<T>(
  type: InjectableType<T> | DirectiveType<T> | ComponentType<T>,
  options: UntilDestroyOptions
): void {

  console.log('decorateProviderDirectiveOrComponent', type);
  console.log('prototype', type.prototype);
  console.log('prototype constructor', decorateNgRoute(type.prototype));
  console.log('name', type.name);
  // type.prototype.ngOnDestroy = decorateNgOnDestroy(type.prototype.ngOnDestroy, options);

  // const route = GlobalInjector.instance.get(ActivatedRoute);

  // routerParamsListener(type.name, route, (routeData: { key: string }) => {
  //   console.log('route listener', routeData);
  // });

  setTimeout(() => {
    console.log('prototype', type.prototype);
  }, 2000);
}

export function SmzRoute(options: UntilDestroyOptions = {}): ClassDecorator {
  return (type: any) => {
    console.log(type);
    decorateProviderDirectiveOrComponent(type, options);

    markAsDecorated(type);
  };
}