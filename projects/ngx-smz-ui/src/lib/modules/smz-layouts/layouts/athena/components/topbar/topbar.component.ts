import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, inject, Input, QueryList, TemplateRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { LayoutUiSelectors } from '../../../../../../state/ui/layout/layout.selectors';
import { UiAthenaActions } from '../../state/ui-layout.actions';
import { SmzNotification } from '../../../../core/models/notifications';
import { UiAthenaSelectors } from '../../state/ui-layout.selectors';
import { MenuType } from '../../../../core/models/menu-types';
import { GlobalInjector } from '../../../../../../common/services/global-injector';

@Component({
    selector: 'smz-ui-athena-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AthenaTopbarComponent implements AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  public topbarTitle$ = inject(Store).select(LayoutUiSelectors.topbarTitle);
  public appLogo$ = inject(Store).select(LayoutUiSelectors.appContentLogo);
  public layout$ = inject(Store).select(UiAthenaSelectors.layout);
  @Input() public notifications: SmzNotification[];
  @Input() public profile: MenuItem[];
  public headerExtrasTemplate: TemplateRef<any>;
  public horizontalMenuType = MenuType.HORIZONTAL;
  public uiConfig = GlobalInjector.config;

  constructor(private store: Store) { }

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
    this.store.dispatch(new UiAthenaActions.ShowSidebar);
  }

  public hide(): void
  {
    this.store.dispatch(new UiAthenaActions.HideSidebar);
  }

  public toggle(): void
  {
    this.store.dispatch(new UiAthenaActions.ToggleSidebar);
  }

}
