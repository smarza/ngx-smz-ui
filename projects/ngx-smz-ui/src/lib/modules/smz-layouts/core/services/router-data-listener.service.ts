import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { SmzLayoutsConfig } from '../globals/smz-layouts.config';
import { RouteLayoutData, SmzRouteData } from '../models/route-layout-data';
import { LayoutUiActions } from '../state/ui/ui.actions';
import { mergeClone } from '../../../../common/utils/deep-merge';
import { SmzDialogsService } from '../../../smz-dialogs/services/smz-dialogs.service';
import { ApplicationActions } from '../../../../state/global/application/application.actions';

@Injectable({
  providedIn: 'root'
})
export class RouterDataListenerService
{
  public data: SmzRouteData = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private readonly config: SmzLayoutsConfig, private dialogs: SmzDialogsService, private store: Store)
  {
    if (this.config.debugMode) console.log('>> RouterDataListenerService constructor');
    if (this.config.debugMode) console.log('>> configuration', config);

    let currentRouteData = null;

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap((event: NavigationEnd) =>
        {
          if (this.config.debugMode) console.log('\n##########');
          if (this.config.debugMode) console.log('>> NavigationEnd');

          if (this.config.applicationActions.registerLogs)
          {
            if (this.config.debugMode) console.log('ApplicationActions.SetLogExtraData > urlAfterRedirects', event.urlAfterRedirects);
            this.store.dispatch(new ApplicationActions.SetLogExtraData(event.urlAfterRedirects));
          }
        }),
        map((event) =>
        {
          if (this.config.debugMode) {
            console.group('router.events > mapping');
          }

          let route = this.activatedRoute;

          while (route.firstChild) {

            route.firstChild.data.subscribe(r => {
              const layout = r.layout;

              if (currentRouteData == null && layout !== null) {
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

        if (this.config.debugMode) {
          console.log('all routes layout data merged for this route', currentRouteData);
          console.log('final router data used', this.data);
          console.groupEnd();
        }

        if (this.config.applicationActions.registerLogs)
        {
          if (this.config.debugMode) console.log('ApplicationActions.SetLogApplicatinArea > appArea', data.appArea);
          this.store.dispatch(new ApplicationActions.SetLogApplicatinArea(data.appArea));
        }

        if (this.config.dialogs.closeAllAfterNavigate)
        {
          if (this.config.debugMode) console.log('>> Closing all dialogs');
          this.dialogs.closeAll();
        }

        if (this.config.debugMode) console.log('\n');

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
    if (this.config.debugMode) {
      console.log(`merging`, before, current, mergeClone(before, current));
    }

    return mergeClone(before, current);
  }

}
