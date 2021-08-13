import { ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle, UrlSegment } from '@angular/router';

export interface ReusableRouteConfig {
  isReusable?: boolean;
  reusableKeys?: string[];
  forceClearAllCache?: boolean;
  reusableKey?: string;
}

export class CachedRouteReuseStrategy implements RouteReuseStrategy {
  handlers: { [key: string]: DetachedRouteHandle } = {};
  private lastRoute: ActivatedRouteSnapshot;

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data?.cacheStrategy?.isReusable || false;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // console.log('store');
    const id = this.createIdentifier(route);
    if (route.data?.cacheStrategy?.isReusable) {
      if (handle != null)
      {
        this.handlers[id] = handle;
      }

      try {
        // console.log('handle', handle);
        // console.log('this.handlers', this.handlers);
        const instance = (this.handlers[id] as any).componentRef.instance;

        if (handle != null) {
          // console.log('-----onLeaving');
          if (instance.onLeaving != null) {
            instance.onLeaving();
          }
        }
        else
        {
          // console.log('-----onArriving');
          if (instance.onArriving != null) {
            instance.onArriving();
          }
        }

      } catch (error) {
        console.warn('CachedRouteReuseStrategy didnt found the Handler');
      }
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // console.log('shouldAttach');
    // console.log('------');

    if (this.lastRoute != null) {
      const currentCacheStrategy: ReusableRouteConfig = route.data.cacheStrategy ? route.data.cacheStrategy : undefined;
      const lastCacheStrategy: ReusableRouteConfig = this.lastRoute.data.cacheStrategy;

      // console.log('currentCacheStrategy', currentCacheStrategy);
      // console.log('lastCacheStrategy', lastCacheStrategy);

      if (currentCacheStrategy === undefined || currentCacheStrategy.forceClearAllCache) {
        // LIMPAR O CACHE DE TODAS AS ROTAS
        // console.log('FORÇANDO LIMPAR O CACHE DE TODAS AS ROTAS');
        this.destroyAll();
        this.lastRoute = route;

        return false;
      }

      // CASO EXISTA UMA NAVEGAÇÃO ANTERIOR E A MESMA TENHA CONDICIONAIS PARA CACHE
      if (
        lastCacheStrategy?.reusableKeys != null &&
        currentCacheStrategy?.reusableKey != null &&
        lastCacheStrategy.reusableKeys.findIndex(x => x === currentCacheStrategy.reusableKey) === -1) {

        // CASO A ROTA ATUAL NÃO EXISTA NAS ROTAS PERMITIDAS PARA MANTER O CACHE DA ANTERIOR
        // LIMPAR O CACHE DE TODAS AS ROTAS
        // console.log('LIMPAR O CACHE DE TODAS AS ROTAS');
        this.destroyAll();
        this.lastRoute = route;
        return false;
      }
    }

    const id = this.createIdentifier(route);
    const handle = this.handlers[id];
    const canAttach = !!route.routeConfig && !!handle;

    // console.log('handlers', this.handlers);
    // console.log('handle', handle);

    this.lastRoute = route;
    return canAttach;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    // console.log('retrieve');
    const id = this.createIdentifier(route);
    if (!route.routeConfig || !this.handlers[id]) return null;
    return this.handlers[id];
  }

  shouldReuseRoute(before: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // console.log('shouldReuseRoute');
    return before.routeConfig === curr.routeConfig;
  }

  private createIdentifier(route: ActivatedRouteSnapshot) {
    // Build the complete path from the root to the input route
    const segments: UrlSegment[][] = route.pathFromRoot.map(r => r.url);
    const subpaths = ([] as UrlSegment[]).concat(...segments).map(segment => segment.path);

    // Result: ${route_depth}-${path}
    return segments.length + '-' + subpaths.join('/');
  }

  private destroyAll(): void {
    // console.log('destroyAll');
    // console.log('this.handlers', this.handlers);

    const keys = Object.keys(this.handlers);

    for (const key of keys) {
      const handler = this.handlers[key] as any;
      if (handler.componentRef?.instance?.ngOnDestroy != null) {
        // console.log('calling ngOnDestroy');
        handler.componentRef.instance.ngOnDestroy();
      }
      // console.log('handler', handler);
    }

    this.handlers = {};
  }
}