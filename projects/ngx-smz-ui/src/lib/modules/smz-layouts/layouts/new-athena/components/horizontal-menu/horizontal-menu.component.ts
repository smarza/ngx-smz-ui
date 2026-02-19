import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, inject, Input, OnChanges, OnInit, QueryList, SimpleChanges, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { LayoutUiSelectors } from '../../../../../../state/ui/layout/layout.selectors';
import { MenuType } from '../../../../core/models/menu-types';
import { UiAthenaSelectors } from '../../state/ui-layout.selectors';
import { RouterState } from '@ngxs/router-plugin';
import { Observable } from 'rxjs';

@Component({
    selector: 'smz-ui-new-athena-horizontal-menu',
    templateUrl: './horizontal-menu.component.html',
    styleUrls: ['./horizontal-menu.component.scss'],
    host: { "(document:click)": "collapseFromOutside($event)" },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class NewAthenaHorizontalMenuComponent implements OnInit, AfterContentInit, OnChanges {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  public topbarTitle$ = inject(Store).select(LayoutUiSelectors.topbarTitle);
  public appLogo$ = inject(Store).select(LayoutUiSelectors.appContentLogo);
  public layout$ = inject(Store).select(UiAthenaSelectors.layout);
  public appName$ = inject(Store).select(LayoutUiSelectors.appName);
  public currentRoute$: Observable<any> = inject(Store).select(RouterState.state);
  @Input() public menu: MenuItem[];
  public isAnyMenuExpanded = false;
  public menuType = MenuType;
  public headerExtrasTemplate: TemplateRef<any>;
  constructor(private _eref: ElementRef) { }

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

  public ngOnChanges(changes: SimpleChanges): void
  {
      if (changes['menu'] != null)
      {
          const data = changes['menu'].currentValue;

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
