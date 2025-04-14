import { Observable, MonoTypeOperatorFunction} from 'rxjs';
import {map} from 'rxjs/operators';

import { replaceNgOnInit } from './replace-ng-oninit';

export interface SmzRouteConfig {
    observable?: boolean;
    pipe?: (MonoTypeOperatorFunction<{ this: any, value: any }>)[];
    inherit?: boolean;
}

/**
 * Traverses the routes, from the current route all the way up to the
 * root route and stores each for the route data, params or queryParams observable
 *
 * @param {ActivatedRoute} parent
 * @param {string} routeProperty
 * @returns {Observable<Data | Params>[]}
 */
function extractRoute(parent: any, routeProperty: string, inherit = false): Observable<any> {
    if (inherit) {
        // Move up to the highest level
        while (parent.firstChild) {
            parent = parent.firstChild;
        }
    }

    return parent[routeProperty];
}

/**
 * Merge all observables from {@link extractRoutes} into a single stream passing through only the data/params
 * of decorator. Depending on how the decorator was initialized (`{observable: false}`) the observable or the actual
 * values are passed into the callback.
 *
 * @param {Observable<Data | Params>[]} routes
 * @param {string[]} args list of the decorator's arguments
 * @param {SmzRouteConfig} config the decorator's configuration object
 * @param {(Observable<any> | any) => void} cb callback function receiving the final observable or the actual values as its arguments
 */
function extractValues(that: any, args: string[], stream$: Observable<any>): Observable<any> {

    return stream$.pipe(
        map(routeValues => {
            const values = args.reduce((data, arg) => {
                if (routeValues && routeValues[arg]) {
                    data[arg] = routeValues[arg];
                }

                return data;
            }, {});

            const response = args.length === 1 ? values[args[0]] : values;
            return { this: that, value: response };
        }),
    );
}

/**
 * Factory function which creates decorators for resolved route data, route params or query parameters.
 *
 * @param {string} routeProperty used to create a data, params or queryParams decorator function
 * @returns {(...args: string | SmzRouteConfig[]) => PropertyDecorator}
 */
function routeDecoratorFactory(routeProperty, args, extractor?): PropertyDecorator {
    const config = (typeof args[args.length - 1] === "object" ? args.pop() : {}) as SmzRouteConfig;

    return (prototype: { ngOnInit(): void }, key: string): void => {
        if (!args.length) {
            args = [key.replace(/\$$/, "")];
        }

        replaceNgOnInit(prototype, function(): void {
            // Finally we have the instance!!
            if (!this.route) {
                throw (new Error(`${this.constructor.name} uses a smzRoute @decorator without a 'route: ActivatedRoute' property`));
            }

            let stream$ = extractor(this.route, routeProperty, config.inherit);
            stream$ = extractValues(this, args, stream$);

            if (config.pipe) {
                stream$ = stream$.pipe(...config.pipe);
            }

            if (config.observable === false) {
                stream$.subscribe(data => {
                    this[key] = data;
                });
            } else {
                this[key] = stream$;
            }
        });
    };
}

/*
The factory is wrapped in a function for the AOT compiler
 */
export function SmzRouteDatas(...args: (string | SmzRouteConfig)[]): PropertyDecorator {
    return routeDecoratorFactory('data', args, extractRoute);
}

export function SmzRouteParams(...args: (string | SmzRouteConfig)[]): PropertyDecorator {
    return routeDecoratorFactory('params', args, extractRoute);
}

export function SmzRouteQueryParams(...args: (string | SmzRouteConfig)[]): PropertyDecorator {
    return routeDecoratorFactory('queryParams', args, route => route.queryParams);
}
