import { AfterContentInit, Component, ContentChildren, forwardRef, HostListener, inject, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { RouterDataListenerService } from '../../core/services/router-data-listener.service';
import { PrimeTemplate, MenuItem } from 'primeng/api';
import { LayoutUiSelectors } from '../../../../state/ui/layout/layout.selectors';
import { PrimeConfigService } from '../../../../common/services/prime-config.service';
import { LayoutUiActions } from '../../../../state/ui/layout/layout.actions';
import { GlobalInjector } from '../../../../common/services/global-injector';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UiLocalizationDbActions } from '../../../../state/database/ui-localization/ui-localization.actions';

@Component({
    selector: 'smz-ui-outlet',
    templateUrl: './outlet.component.html',
    styleUrls: ['./outlet.component.scss'],
    standalone: false
})
export class OutletComponent implements OnInit, AfterContentInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;
  public toast$ = inject(Store).select(LayoutUiSelectors.toast);
  @Input() public menu: MenuItem[];
  public layoutTemplate: TemplateRef<any> | undefined;
  public contentTemplate: TemplateRef<any> | undefined;

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    if (GlobalInjector.config.layouts.monitoreMouseEvents) {
      this.store.dispatch(new LayoutUiActions.SetLastUserMouseEvent('mouseleave'));
    }
  }

  @HostListener('mouseenter')
  public onBeforeUnload(): void {
    if (GlobalInjector.config.layouts.monitoreMouseEvents) {
      this.store.dispatch(new LayoutUiActions.SetLastUserMouseEvent('mouseenter'));
    }
  }

  constructor(
    public readonly routerListener: RouterDataListenerService = inject(RouterDataListenerService),
    private store: Store,
    private primeConfig: PrimeConfigService,
    private breakpointObserver: BreakpointObserver) {
    this.primeConfig.init();

    const config = GlobalInjector.config.rbkUtils;

    if (config.uiLocalization?.isEnabled) {
      this.store.dispatch(new UiLocalizationDbActions.SetLocales(config.uiLocalization.locales));
      this.store.dispatch(new UiLocalizationDbActions.SetCurrent(config.uiLocalization.current));
    }

  }

  ngOnInit(): void {

    if (GlobalInjector.config.debugMode) {
      this.debugMode();
    }

  }

  private debugMode(): void {

    const breakpoints = [
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletLandscape,
      Breakpoints.WebLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait,
      Breakpoints.WebPortrait
    ];

    this.breakpointObserver
      .observe(breakpoints)
      .subscribe(result => {

      if (result.matches) {

        console.group('--- breakpointObserver');

        breakpoints.forEach(breakpoint => {
          if (this.breakpointObserver.isMatched(breakpoint)) {
            // this.store.dispatch(new ToastActions.Info(breakpoint));
            console.log(breakpoint);
          }
        })

        console.groupEnd();

      }
    });
  }

  public ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'layout':
          this.layoutTemplate = item.template;
          break;

        case 'content':
          this.contentTemplate = item.template;
          break;
      }
    });
  }

}
