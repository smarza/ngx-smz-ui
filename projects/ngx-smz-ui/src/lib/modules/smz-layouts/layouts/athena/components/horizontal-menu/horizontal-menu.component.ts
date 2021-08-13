import { AfterContentInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { UiSelectors } from '../../../../core/state/ui/ui.selectors';
import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';
import { SmzAppLogo } from '../../../../core/models/logo';
import { MenuType } from '../../../../core/models/menu-types';
import { UiAthenaSelectors } from '../../state/ui-layout.selectors';
import { AthenaLayout } from '../../layout.config';
import { RouterState } from '@ngxs/router-plugin';
import { NgxRbkUtilsConfig } from '../../../../../rbk-utils/ngx-rbk-utils.config';

@UntilDestroy()
@Component({
  selector: 'smz-ui-athena-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss'],
  host: { "(document:click)": "collapseFromOutside($event)" },
  encapsulation: ViewEncapsulation.None
})
export class AthenaHorizontalMenuComponent implements OnInit, AfterContentInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiSelectors.topbarTitle) public topbarTitle$: Observable<string>;
  @Select(UiSelectors.appContentLogo) public appLogo$: Observable<SmzAppLogo>;

  @Select(UiAthenaSelectors.layout) public layout$: Observable<AthenaLayout>;
  @Select(UiSelectors.appName) public appName$: Observable<string>;
  @Select(RouterState.state) public currentRoute$: Observable<any>;
  @Input() public menu: MenuItem[];
  public isAnyMenuExpanded = false;
  public menuType = MenuType;
  public headerExtrasTemplate: TemplateRef<any>;
  constructor(public readonly rbkConfig: NgxRbkUtilsConfig, public readonly config: SmzLayoutsConfig, private store: Store, private _eref: ElementRef) { }

  ngOnInit(): void {

  }
  public ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'headerExtras':
          this.headerExtrasTemplate = item.template;
          break;
      }
    });
  }


  public toogleOnly(item: MenuItem, menu: MenuItem[]): void {
    this.collapseAll(menu);

    item.expanded = !item.expanded;
    this.isAnyMenuExpanded = item.expanded;
  }

  public collapseAll(menu: MenuItem[]): void {
    menu.forEach(x => {
      x.expanded = false;
      if (x.items != null && x.items.length > 0) {
        this.collapseAll(x.items);
      }
    });

    this.isAnyMenuExpanded = false;
  }

  public collapseFromOutside(event: any): void {

    const target: HTMLElement = event.target;

    if (target.className === 'layout-menu' || !this._eref.nativeElement.contains(target)) {
      this.collapseAll(this.menu);
    }

  }

}
