import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { UiSelectors } from '../../../../core/state/ui/ui.selectors';
import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';
import { SmzAppLogo } from '../../../../core/models/logo';
import { NgxRbkUtilsConfig } from 'ngx-rbk-utils';
import { MenuType } from '../../../../core/models/menu-types';
import { UiApolloSelectors } from '../../state/ui-apollo/ui-apollo.selectors';
import { ApolloLayout } from '../../layout.config';
import { RouterState } from '@ngxs/router-plugin';

@UntilDestroy()
@Component({
  selector: 'smz-ui-apollo-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss']
})
export class ApolloHorizontalMenuComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiSelectors.topbarTitle) public topbarTitle$: Observable<string>;
  @Select(UiSelectors.appLogo) public appLogo$: Observable<SmzAppLogo>;

  @Select(UiApolloSelectors.layout) public layout$: Observable<ApolloLayout>;
  @Select(UiSelectors.appName) public appName$: Observable<string>;
  @Select(RouterState.state) public currentRoute$: Observable<any>;
  @Input() public menu: MenuItem[];
  public isAnyMenuExpanded = false;
  public menuType = MenuType;
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


}
