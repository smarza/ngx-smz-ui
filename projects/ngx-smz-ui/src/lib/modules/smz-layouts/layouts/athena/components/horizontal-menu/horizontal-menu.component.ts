import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Input, OnChanges, QueryList, SimpleChanges, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Select } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { LayoutUiSelectors } from '../../../../../../state/ui/layout/layout.selectors';
import { SmzAppLogo } from '../../../../core/models/logo';
import { MenuType } from '../../../../core/models/menu-types';
import { UiAthenaSelectors } from '../../state/ui-layout.selectors';
import { AthenaLayout } from '../../layout.config';
import { RouterState } from '@ngxs/router-plugin';

@UntilDestroy()
@Component({
    selector: 'smz-ui-athena-horizontal-menu',
    templateUrl: './horizontal-menu.component.html',
    styleUrls: ['./horizontal-menu.component.scss'],
    host: { "(document:click)": "collapseFromOutside($event)" },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AthenaHorizontalMenuComponent implements AfterContentInit, OnChanges {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(LayoutUiSelectors.topbarTitle) public topbarTitle$: Observable<string>;
  @Select(LayoutUiSelectors.appContentLogo) public appLogo$: Observable<SmzAppLogo>;

  @Select(UiAthenaSelectors.layout) public layout$: Observable<AthenaLayout>;
  @Select(LayoutUiSelectors.appName) public appName$: Observable<string>;
  @Select(RouterState.state) public currentRoute$: Observable<any>;
  @Input() public menu: MenuItem[];
  public isAnyMenuExpanded = false;
  public menuType = MenuType;
  public headerExtrasTemplate: TemplateRef<any>;
  constructor(private _eref: ElementRef) { }

  public ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'headerExtras':
          this.headerExtrasTemplate = item.template;
          break;
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges): void
  {
      if (changes.menu != null)
      {
          const data = changes.menu.currentValue;

          if (data == null) {
            document.documentElement.style.setProperty('--layout-menu-height', '0em');
          }
          else {
            document.documentElement.style.setProperty('--layout-menu-height', '4em');
          }
      }
  }

  public toogleOnly(item: MenuItem, menu: MenuItem[]): void {
    this.collapseAll(menu);

    item.expanded = !item.expanded;
    this.isAnyMenuExpanded = item.expanded;
  }

  public collapseAll(menu: MenuItem[]): void {
    menu?.forEach(x => {
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
