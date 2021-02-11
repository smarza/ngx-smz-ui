import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { UiSelectors } from '../../../core/state/ui/ui.selectors';
import { DiamondLayout } from '../../../core/models/layout';
import { RouterState } from '@ngxs/router-plugin';
import { SmzLayoutsConfig } from '../../../core/globals/smz-layouts.config';
import { DiamondMenuType } from '../../../core/models/menu-types';
import { NgxRbkUtilsConfig } from 'ngx-rbk-utils';
import { SmzAppLogo } from '../../../core/models/logo';
import { UiLayoutSelectors } from '../state/ui-layout/ui-layout.selectors';
import { UiLayoutActions } from '../state/ui-layout/ui-layout.actions';

@UntilDestroy()
@Component({
  selector: 'smz-ui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiLayoutSelectors.layout) public layout$: Observable<DiamondLayout>;
  @Select(UiSelectors.appName) public appName$: Observable<string>;
  @Select(RouterState.state) public currentRoute$: Observable<any>;
  @Select(UiSelectors.appLayoutLogo) public appLayoutLogo$: Observable<SmzAppLogo>;
  public headerExtrasTemplate: TemplateRef<any>;
  @Input() public menu: MenuItem[];
  public isAnyMenuExpanded = false;
  public menuType = DiamondMenuType;
  constructor(public readonly rbkConfig: NgxRbkUtilsConfig, public readonly config: SmzLayoutsConfig, private store: Store) { }

  public ngOnInit(): void
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

  public toogleOnly(item: MenuItem, menu: MenuItem[]): void
  {
    this.collapseAll(menu);

    item.expanded = !item.expanded;
    this.isAnyMenuExpanded = item.expanded;
  }

  public collapseAll(menu: MenuItem[]): void
  {
    menu.forEach(x =>
    {
      x.expanded = false;
      if (x.items != null && x.items.length > 0)
      {
        this.collapseAll(x.items);
      }
    });

    this.isAnyMenuExpanded = false;
  }

  public show(): void
  {
    this.store.dispatch(new UiLayoutActions.ShowSidebar);
  }

  public hide(): void
  {
    this.store.dispatch(new UiLayoutActions.HideSidebar);
  }

  public toggle(): void
  {
    this.store.dispatch(new UiLayoutActions.ToggleSidebar);
  }

}
