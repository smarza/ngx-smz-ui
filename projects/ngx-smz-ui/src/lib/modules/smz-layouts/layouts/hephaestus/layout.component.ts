import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, inject, Input, OnInit, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { PrimeTemplate, MenuItem } from 'primeng/api';
import { RouterDataListenerService } from '../../core/services/router-data-listener.service';
import { LayoutUiActions } from '../../../../state/ui/layout/layout.actions';
import { LayoutUiSelectors } from '../../../../state/ui/layout/layout.selectors';
import { UiHephaestusActions } from './state/ui-layout.actions';
import { UiHephaestusSelectors } from './state/ui-layout.selectors';
import { HephaestusLayout } from './layout.config';
import { SmzNotification } from '../../core/models/notifications';
import { SidebarState } from '../../core/models/sidebar-states';
import { MenuType } from '../../core/models/menu-types';
import { GlobalInjector } from '../../../../common/services/global-injector';
import { SmzMenuItem } from '../../../smz-menu/models/smz-menu-item';

@Component({
    selector: 'smz-ui-hephaestus-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: false
})
export class HephaestusLayoutComponent implements OnInit, AfterContentInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  public state$ = inject(Store).select(UiHephaestusSelectors.state);
  public assistance$ = inject(Store).select(LayoutUiSelectors.assistance);
  public contentClass$ = inject(Store).select(LayoutUiSelectors.contentClass);
  @Input() public menu: SmzMenuItem[];
  @Input() public profile: MenuItem[];
  @Input() public notifications: SmzNotification[];
  public headerExtrasTemplate: TemplateRef<any>;
  public footerExtrasTemplate: TemplateRef<any>;

  public sideBarStateActive = SidebarState.ACTIVE;

  constructor(public readonly layout: HephaestusLayout, public readonly routerListener: RouterDataListenerService, private store: Store, public cdr: ChangeDetectorRef) {
    this.store.dispatch(new LayoutUiActions.Initialize());
    this.store.dispatch(new UiHephaestusActions.Initialize(layout));

    if (this.layout.hideSidebarAfterNavigationEnd) {
      GlobalInjector.config.layouts._internal = {
        ...GlobalInjector.config.layouts._internal,
        specificThemeNavigationEndCallback: () => {

          const layout = this.store.selectSnapshot(UiHephaestusSelectors.layout);

          if (layout.menu === MenuType.STATIC && layout.sidebarState === SidebarState.ACTIVE) {

            const width = window.innerWidth;

            if (width <= 991) {
              // Mobile
              this.store.dispatch(new UiHephaestusActions.HideSidebar());
            }
          }

        }
      }
    }

  }

  public ngOnInit(): void {
  }

  public ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'headerExtras':
          this.headerExtrasTemplate = item.template;
          break;
        case 'footerExtras':
          this.footerExtrasTemplate = item.template;
          break;
      }
    });
  }

  public hideMenu(): void {
    this.store.dispatch(new UiHephaestusActions.HideSidebar);
  }


}
