import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { LayoutUiSelectors } from '../../../../../../state/ui/layout/layout.selectors';
import { UiAthenaActions } from '../../state/ui-layout.actions';
import { SmzAppLogo } from '../../../../core/models/logo';
import { SmzNotification } from '../../../../core/models/notifications';
import { UiAthenaSelectors } from '../../state/ui-layout.selectors';
import { AthenaLayout } from '../../layout.config';
import { MenuType } from '../../../../core/models/menu-types';
import { GlobalInjector } from '../../../../../../common/services/global-injector';

@UntilDestroy()
@Component({
  selector: 'smz-ui-athena-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AthenaTopbarComponent implements AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(LayoutUiSelectors.topbarTitle) public topbarTitle$: Observable<string>;
  @Select(LayoutUiSelectors.appContentLogo) public appLogo$: Observable<SmzAppLogo>;
  @Select(UiAthenaSelectors.layout) public layout$: Observable<AthenaLayout>;
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
