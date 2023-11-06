import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';

import { TemplateRef } from '@angular/core';
import { RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ApplicationSelectors } from '../../../../state/global/application/application.selector';
import { LoaderData } from '../../core/models/layout';
import { SmzLoader } from '../../core/models/loaders';
import { LayoutUiSelectors } from '../../../../state/ui/layout/layout.selectors';

@UntilDestroy()
@Component({
  selector: 'smz-ui-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalLoaderComponent implements OnInit
{
  @Select(LayoutUiSelectors.loader) public loader$: Observable<LoaderData>;
  @Select(ApplicationSelectors.globalIsLoading) public isLoading$: Observable<LoaderData>;
  @Input() public template: TemplateRef<any>;
  public loaders = SmzLoader;
  public isRouterLoading: boolean = false;
  public test = false;
  public isNavigationEnded = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef)
  {
    // this.setupRouterListener();
  }

  public ngOnInit(): void
  {
  }

  public setupRouterListener(): void
  {
    this.router.events
      .pipe(filter(e => e instanceof RouteConfigLoadStart || e instanceof RouteConfigLoadEnd))
      .subscribe(
        // (event: RouterEvent): void =>
        (event: any): void =>
        {
          if (event instanceof RouteConfigLoadStart)
          {
            this.isNavigationEnded = false;

            setTimeout(() =>
            {
              if (!this.isNavigationEnded) this.isRouterLoading = true;
              this.cdr.markForCheck();
            }, 300);
          }
          else if (event instanceof RouteConfigLoadEnd)
          {
            this.isRouterLoading = false;
            this.isNavigationEnded = true;
            this.cdr.markForCheck();
          }
        }
      );
  }

}
