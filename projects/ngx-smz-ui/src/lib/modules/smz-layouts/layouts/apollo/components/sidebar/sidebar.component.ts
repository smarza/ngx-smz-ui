import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { UiSelectors } from '../../../../core/state/ui/ui.selectors';
import { RouterState } from '@ngxs/router-plugin';
import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';
import { NgxRbkUtilsConfig } from 'ngx-rbk-utils';
import { SmzAppLogo } from '../../../../core/models/logo';
import { UiApolloSelectors } from '../../state/ui-apollo/ui-apollo.selectors';
import { UiApolloActions } from '../../state/ui-apollo/ui-apollo.actions';
import { ApolloLayout } from '../../layout.config';
import { MenuType } from '../../../../core/models/menu-types';

@UntilDestroy()
@Component({
  selector: 'smz-ui-apollo-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class ApolloSidebarComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiApolloSelectors.layout) public layout$: Observable<ApolloLayout>;
  @Select(UiSelectors.appName) public appName$: Observable<string>;
  @Select(RouterState.state) public currentRoute$: Observable<any>;
  @Select(UiSelectors.appLayoutLogo) public appLayoutLogo$: Observable<SmzAppLogo>;
  public headerExtrasTemplate: TemplateRef<any>;
  @Input() public menu: MenuItem[];
  public isAnyMenuExpanded = false;
  public menuType = MenuType;
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
    this.store.dispatch(new UiApolloActions.ShowSidebar);
  }

  public hide(): void
  {
    this.store.dispatch(new UiApolloActions.HideSidebar);
  }

  public toggle(): void
  {
    this.store.dispatch(new UiApolloActions.ToggleSidebar);
  }

}
