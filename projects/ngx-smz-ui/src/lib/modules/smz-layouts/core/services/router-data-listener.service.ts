import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ApplicationActions } from 'ngx-rbk-utils';
import { SmzDialogsService } from 'ngx-smz-dialogs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { SmzLayoutsConfig } from '../../globals/smz-layouts.config';
import { RouteLayoutData, SmzRouteData } from '../models/route-layout-data';
import { UiActions } from '../state/ui/ui.actions';

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
          let route = this.activatedRoute;
          while (route.firstChild) { route = route.firstChild; }
          return { event, route };
        }),
        filter((event) => event.route.outlet === 'primary'),
        mergeMap((x) => x.route.data),
      )
      .subscribe((data: SmzRouteData) =>
      {
        this.data = data;

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

        this.store.dispatch(new UiActions.SetTopbarTitle(data.title));

      });

  }

}
