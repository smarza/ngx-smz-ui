import { AfterContentInit, Component, ContentChildren, HostListener, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { UiSelectors } from '../../../../core/state/ui/ui.selectors';
import { UiActions } from '../../../../core/state/ui/ui.actions';
import { LayoutConfig, LayoutState } from '../../../../core/models/layout';
import { RouterState } from '@ngxs/router-plugin';
import { SmzLayoutsConfig } from '../../../../globals/smz-layouts.config';
import { SmzMenuType } from '../../../../core/models/menu-types';
import { NgxRbkUtilsConfig } from 'ngx-rbk-utils';
import { SmzAppLogo } from '../../../../core/models/logo';

@UntilDestroy()
@Component({
  selector: 'smz-ui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiSelectors.config) public config$: Observable<LayoutConfig>;
  @Select(UiSelectors.state) public state$: Observable<LayoutState>;
  @Select(RouterState.state) public currentRoute$: Observable<any>;
  @Select(UiSelectors.appLayoutLogo) public appLayoutLogo$: Observable<SmzAppLogo>;
  public headerExtrasTemplate: TemplateRef<any>;
  @Input() public menu: MenuItem[];
  public isAnyMenuExpanded = false;
  public menuType = SmzMenuType;
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
    this.store.dispatch(new UiActions.ShowSidebar);
  }

  public hide(): void
  {
    this.store.dispatch(new UiActions.HideSidebar);
  }

  public toggle(): void
  {
    this.store.dispatch(new UiActions.ToggleSidebar);
  }

}
