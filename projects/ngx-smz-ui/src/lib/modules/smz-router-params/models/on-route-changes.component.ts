// import { ɵComponentType as ComponentType } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { GlobalInjector } from '../../rbk-utils/misc/global.injector';
// import { routerParamsListener } from '../router-params-listener';
// import { getSymbol, completeSubjectOnTheInstance, markAsDecorated } from './internals';

// export const ANNOTATIONS = '__annotations__';
// export const PARAMETERS = '__parameters__';
// export const PROP_METADATA = '__prop__metadata__';

// export interface SmzRouteOptions {
//   selector: string;
// }

// export function SmzRoute(options: SmzRouteOptions = { selector: 'test' }): ClassDecorator {
//   return (target: any) => {
//     console.log('SmzRoute');
//     decorateComponent(target, options);
//     markAsDecorated(target);
//   };
// }

// function decorateComponent<T>(
//   target: ComponentType<T>,
//   options: SmzRouteOptions
// ): void {
//   console.log('decorateComponent');

//   target.prototype.route = GlobalInjector.instance.get(ActivatedRoute);
//   target.prototype.smzOnRouteChange = decorateSmzOnRouteChange(target.prototype.smzOnRouteChange, options);
//   target.prototype.ngAfterViewInit = decorateNgAfterViewInit(target.prototype.ngAfterViewInit, options);
// }

// function decorateNgAfterViewInit(
//   ngAfterViewInit: (() => void) | null | undefined,
//   options: SmzRouteOptions,
// ) {
//   return function (this: any) {
//     // Invoke the original `ngOnInit` if it exists
//     ngAfterViewInit && ngAfterViewInit.call(this);

//     // It's important to use `this` instead of caching instance
//     // that may lead to memory leaks
//     completeSubjectOnTheInstance(this, getSymbol());

//     console.log(' this >', this);
//     console.log(' this .route >', this.route);
//     routerParamsListener(options.selector, this.route, (routeData: { key: string }) => {
//       this.smzOnRouteChange(routeData);
//     });

//   };
// }

// function decorateSmzOnRouteChange(
//   smzOnRouteChange: ((events: any) => void) | null | undefined,
//   options: SmzRouteOptions,
// ) {
//   return function (this: any, events) {
//     // Invoke the original `ngOnInit` if it exists
//     smzOnRouteChange && smzOnRouteChange.call(this, events);

//     // It's important to use `this` instead of caching instance
//     // that may lead to memory leaks
//     completeSubjectOnTheInstance(this, getSymbol());

//     console.log('Executing... smzOnRouteChange()', events);

//   };
// }

// function decorateConstructor(
//   constructor: (() => void) | null | undefined,
//   options: SmzRouteOptions,
// ) {
//   return function (this: any) {
//     // Invoke the original `ngOnInit` if it exists
//     constructor && constructor.call(this);

//     // It's important to use `this` instead of caching instance
//     // that may lead to memory leaks
//     completeSubjectOnTheInstance(this, getSymbol());

//     console.log('Executing... decorateConstructor()');

//   };
// }