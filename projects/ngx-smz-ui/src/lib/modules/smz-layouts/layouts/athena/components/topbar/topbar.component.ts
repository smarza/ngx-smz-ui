import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { UiSelectors } from '../../../../core/state/ui/ui.selectors';
import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';
import { UiAthenaActions } from '../../state/ui-layout.actions';
import { SmzAppLogo } from '../../../../core/models/logo';
import { NgxRbkUtilsConfig } from 'ngx-rbk-utils';
import { SmzNotification } from '../../../../core/models/notifications';

@UntilDestroy()
@Component({
  selector: 'smz-ui-athena-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AthenaTopbarComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiSelectors.topbarTitle) public topbarTitle$: Observable<string>;
  @Select(UiSelectors.appLayoutLogo) public appLogo$: Observable<SmzAppLogo>;
  @Input() public notifications: SmzNotification[];
  @Input() public profile: MenuItem[];
  public headerExtrasTemplate: TemplateRef<any>;
  constructor(public readonly rbkConfig: NgxRbkUtilsConfig, public readonly config: SmzLayoutsConfig, private store: Store) { }

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
