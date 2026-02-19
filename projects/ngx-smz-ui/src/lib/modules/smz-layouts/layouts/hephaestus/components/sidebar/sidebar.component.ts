import { AfterContentInit, Component, ContentChildren, inject, Input, QueryList, TemplateRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { LayoutUiSelectors } from '../../../../../../state/ui/layout/layout.selectors';
import { RouterState } from '@ngxs/router-plugin';
import { UiHephaestusSelectors } from '../../state/ui-layout.selectors';
import { MenuType } from '../../../../core/models/menu-types';
import { GlobalInjector } from '../../../../../../common/services/global-injector';
import { SmzMenuItem } from '../../../../../smz-menu/models/smz-menu-item';
import { Observable } from 'rxjs';

@Component({
    selector: 'smz-ui-hephaestus-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    host: { 'class': 'z-30' },
    standalone: false
})
export class HephaestusSidebarComponent implements AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  public layout$ = inject(Store).select(UiHephaestusSelectors.layout);
  public appName$ = inject(Store).select(LayoutUiSelectors.appName);
  public currentRoute$: Observable<any> = inject(Store).select(RouterState.state);
  public appLayoutLogo$ = inject(Store).select(LayoutUiSelectors.appDarkLogo);
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
