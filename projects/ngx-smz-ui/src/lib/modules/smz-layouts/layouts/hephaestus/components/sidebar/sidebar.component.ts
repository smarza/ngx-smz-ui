import { AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { Select } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { LayoutUiSelectors } from '../../../../../../state/ui/layout/layout.selectors';
import { RouterState } from '@ngxs/router-plugin';
import { SmzAppLogo } from '../../../../core/models/logo';
import { UiHephaestusSelectors } from '../../state/ui-layout.selectors';
import { HephaestusLayout } from '../../layout.config';
import { MenuType } from '../../../../core/models/menu-types';
import { GlobalInjector } from '../../../../../../common/services/global-injector';
import { SmzMenuItem } from '../../../../../smz-menu/models/smz-menu-item';

@UntilDestroy()
@Component({
  selector: 'smz-ui-hephaestus-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: { 'class': 'z-30' }
})
export class HephaestusSidebarComponent implements AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiHephaestusSelectors.layout) public layout$: Observable<HephaestusLayout>;
  @Select(LayoutUiSelectors.appName) public appName$: Observable<string>;
  @Select(RouterState.state) public currentRoute$: Observable<any>;
  @Select(LayoutUiSelectors.appDarkLogo) public appLayoutLogo$: Observable<SmzAppLogo>;
  public headerExtrasTemplate: TemplateRef<any>;
  @Input() public menu: SmzMenuItem[];
  public isAnyMenuExpanded = false;
  public menuType = MenuType;
  public uiConfig = GlobalInjector.config;
  constructor() { }

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

  public isCurrentRoute(routerUrl: string, routerLink: string[]): boolean {

    const currentPath = (routerLink as string[]).join('/');
    return `/${currentPath}` == routerUrl;

  }

}
