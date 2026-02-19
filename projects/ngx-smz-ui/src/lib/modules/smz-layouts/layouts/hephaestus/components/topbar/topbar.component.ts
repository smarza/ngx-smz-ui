import { AfterContentInit, Component, ContentChildren, inject, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { Location } from '@angular/common';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { LayoutUiSelectors } from '../../../../../../state/ui/layout/layout.selectors';
import { UiHephaestusActions } from '../../state/ui-layout.actions';
import { SmzNotification } from '../../../../core/models/notifications';
import { UiHephaestusSelectors } from '../../state/ui-layout.selectors';
import { MenuType } from '../../../../core/models/menu-types';
import { SidebarState } from '../../../../core/models/sidebar-states';
import { GlobalInjector } from '../../../../../../common/services/global-injector';

@Component({
    selector: 'smz-ui-hephaestus-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
    host: { 'class': 'z-10' },
    standalone: false
})
export class HephaestusTopbarComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public notifications: SmzNotification[];
  @Input() public profile: MenuItem[];
  public topbarTitle$ = inject(Store).select(LayoutUiSelectors.topbarTitle);
  public layout$ = inject(Store).select(UiHephaestusSelectors.layout);
  public headerExtrasTemplate: TemplateRef<any>;
  public sideBaseStateActive = SidebarState.ACTIVE;
  public uiConfig = GlobalInjector.config;
  public showLocalizationSwitch = GlobalInjector.config.rbkUtils.uiLocalization.allowLocalizationSwitching;
  public showTenantSwitch = GlobalInjector.config.rbkUtils.authentication.allowTenantSwitching;
  constructor(private store: Store, private location: Location) { }

  ngOnInit(): void
  {

  }
  public ngAfterContentInit()
  {
    this.templates.forEach((item) =>
    {
      switch (item.getType())
      {
        case 'headerExtras':
          this.headerExtrasTemplate = item.template;
          break;
      }
    });
  }

  public show(): void
  {
    this.store.dispatch(new UiHephaestusActions.ShowSidebar);
  }

  public hide(): void
  {
    this.store.dispatch(new UiHephaestusActions.HideSidebar);
  }

  public toggle(): void
  {
    const layout = this.store.selectSnapshot(UiHephaestusSelectors.layout);

    if (layout.menu === MenuType.SLIM)
    {
      this.store.dispatch(new UiHephaestusActions.ToggleMobileSidebar);
    }
    else {
      this.store.dispatch(new UiHephaestusActions.ToggleSidebar);
      this.store.dispatch(new UiHephaestusActions.ToggleMobileSidebar);
    }

  }

  public navigateBack(): void {
    this.location.back();
  }

}
