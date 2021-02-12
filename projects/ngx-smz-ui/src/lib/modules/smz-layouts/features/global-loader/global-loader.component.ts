import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';

import { TemplateRef } from '@angular/core';
import { RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { ApplicationSelectors } from 'ngx-rbk-utils';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoaderData } from '../../core/models/layout';
import { SmzLoader } from '../../core/models/loaders';
import { UiSelectors } from '../../core/state/ui/ui.selectors';

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
  @Select(UiSelectors.loader) public loader$: Observable<LoaderData>;
  @Input() public template: TemplateRef<any>;
  public loaders = SmzLoader;
  public isLoading: boolean = false;
  public test = false;
  public isNavigationEnded = false;

  constructor(private router: Router, private store: Store, private cdr: ChangeDetectorRef)
  {
    this.setupRouterListener();

    this.store
      .select(ApplicationSelectors.globalIsLoading)
      .pipe(untilDestroyed(this))
      .subscribe((newValue) =>
      {
        this.isLoading = newValue;
        this.cdr.markForCheck();
      });

  }

  public ngOnInit(): void
  {
  }

  public setupRouterListener(): void
  {
    this.router.events.pipe(filter(e => e instanceof RouteConfigLoadStart || e instanceof RouteConfigLoadEnd))
      .subscribe(
        (event: RouterEvent): void =>
        {
          if (event instanceof RouteConfigLoadStart)
          {
            this.isNavigationEnded = false;

            setTimeout(() =>
            {
              if (!this.isNavigationEnded) this.isLoading = true;
              this.cdr.markForCheck();
            }, 300);
          }
          else if (event instanceof RouteConfigLoadEnd)
          {
            this.isLoading = false;
            this.isNavigationEnded = true;
            this.cdr.markForCheck();
          }
        }
      );
  }

}
