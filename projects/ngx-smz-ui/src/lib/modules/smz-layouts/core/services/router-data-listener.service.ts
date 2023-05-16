import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { RouteLayoutData, SmzRouteData } from '../models/route-layout-data';
import { LayoutUiActions } from '../../../../state/ui/layout/layout.actions';
import { mergeClone } from '../../../../common/utils/deep-merge';
import { SmzDialogsService } from '../../../smz-dialogs/services/smz-dialogs.service';
import { ApplicationActions } from '../../../../state/global/application/application.actions';
import { GlobalInjector } from '../../../../common/services/global-injector';

@Injectable({
  providedIn: 'root'
})
export class RouterDataListenerService
{
  public data: SmzRouteData = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private dialogs: SmzDialogsService, private store: Store)
  {
    if (GlobalInjector.config.layouts.debugMode) console.log('>> RouterDataListenerService constructor');
    if (GlobalInjector.config.layouts.debugMode) console.log('>> configuration', GlobalInjector.config);

    let currentRouteData = null;

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap((event: NavigationEnd) =>
        {
          if (GlobalInjector.config.layouts.debugMode) console.log('\n##########');
          if (GlobalInjector.config.layouts.debugMode) console.log('>> NavigationEnd');

          if (GlobalInjector.config.layouts.applicationActions.registerLogs)
          {
            if (GlobalInjector.config.layouts.debugMode) console.log('ApplicationActions.SetLogExtraData > urlAfterRedirects', event.urlAfterRedirects);
            this.store.dispatch(new ApplicationActions.SetLogExtraData(event.urlAfterRedirects));
          }

          if (GlobalInjector.config.layouts._internal?.specificThemeNavigationEndCallback != null) {
            GlobalInjector.config.layouts._internal.specificThemeNavigationEndCallback();
          }

        }),
        map((event) =>
        {
          if (GlobalInjector.config.layouts.debugMode) {
            console.group('router.events > mapping');
          }

          let route = this.activatedRoute;

          while (route.firstChild) {

            route.firstChild.data.subscribe(r => {
              const layout = r.layout;

              if (currentRouteData == null && layout !== null) {

                if (GlobalInjector.config.layouts.debugMode) {
                  console.log('> currentRouteData', currentRouteData);
                  console.log('   layout', layout);
                  console.log('   applying', layout);
                }

                currentRouteData = layout;
              }
              else {
                currentRouteData = layout == null ? currentRouteData : this.mergeLayoutDatas(currentRouteData, layout);
              }

            });

            route = route.firstChild;
          }

          return { event, route };
        }),
        filter((event) => event.route.outlet === 'primary'),
        mergeMap((x) => x.route.data),
      )
      .subscribe((data: SmzRouteData) =>
      {
        this.data = {
          ...data,
          layout: this.normalizeLayoutData(currentRouteData)
        };

        if (GlobalInjector.config.layouts.debugMode) {
          console.log('all routes layout data merged for this route', currentRouteData);
          console.log('final router data used', this.data);
          console.groupEnd();
        }

        if (GlobalInjector.config.layouts.applicationActions.registerLogs)
        {
          if (GlobalInjector.config.layouts.debugMode) console.log('ApplicationActions.SetLogApplicatinArea > appArea', data.appArea);
          this.store.dispatch(new ApplicationActions.SetLogApplicatinArea(data.appArea));
        }

        if (GlobalInjector.config.layouts.dialogs.closeAllAfterNavigate)
        {
          if (GlobalInjector.config.layouts.debugMode) console.log('>> Closing all dialogs');
          this.dialogs.closeAll();
        }

        if (GlobalInjector.config.layouts.debugMode) console.log('\n');

        this.store.dispatch(new LayoutUiActions.SetTopbarTitle(data.title));

      });

  }

  private normalizeLayoutData(data: RouteLayoutData): RouteLayoutData
  {
    return {
      mode: data?.mode ? data.mode : 'full',
      hideFooter: data?.hideFooter ?? false,
      contentPadding: data?.contentPadding ? data.contentPadding : '2em'
    }
  }

  private mergeLayoutDatas(before: SmzRouteData, current: SmzRouteData): SmzRouteData
  {
    if (GlobalInjector.config.layouts.debugMode) {
      console.log('> mergeLayoutDatas');
      console.log('   before', before);
      console.log('   current', current);
      console.log(`   merging`, before, current, mergeClone(before, current));
    }

    return mergeClone(before, current);
  }

}
