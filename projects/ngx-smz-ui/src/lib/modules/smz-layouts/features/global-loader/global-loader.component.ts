import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, inject } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { RouteConfigLoadStart, RouteConfigLoadEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs/operators';
import { ApplicationSelectors } from '../../../../state/global/application/application.selector';
import { SmzLoader } from '../../core/models/loaders';
import { LayoutUiSelectors } from '../../../../state/ui/layout/layout.selectors';

@Component({
    selector: 'smz-ui-global-loader',
    templateUrl: './global-loader.component.html',
    styleUrls: ['./global-loader.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class GlobalLoaderComponent
{
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  public loader$ = inject(Store).select(LayoutUiSelectors.loader);
  public isLoading$ = inject(Store).select(ApplicationSelectors.globalIsLoading);
  @Input() public template: TemplateRef<any>;
  public loaders = SmzLoader;
  public isRouterLoading: boolean = false;
  public isNavigationEnded = false;

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
