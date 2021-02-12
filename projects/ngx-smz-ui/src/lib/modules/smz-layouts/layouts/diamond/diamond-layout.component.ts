import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PrimeTemplate } from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';
import { Observable } from 'rxjs/internal/Observable';
import { Assistance } from '../../core/models/assistance';
import { LayoutState } from '../../core/models/layout';
import { RouterDataListenerService } from '../../core/services/router-data-listener.service';
import { UiActions } from '../../core/state/ui/ui.actions';
import { UiSelectors } from '../../core/state/ui/ui.selectors';
import { SmzLayoutsConfig } from '../../core/globals/smz-layouts.config';
import { UiDiamondActions } from './state/ui-diamond/ui-diamond.actions';
import { UiDiamondSelectors } from './state/ui-diamond/ui-diamond.selectors';
import { DiamondLayout } from './layout.config';

@Component({
  selector: 'smz-ui-diamond-layout',
  templateUrl: './diamond-layout.component.html',
  styleUrls: ['./diamond-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DiamondLayoutComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiDiamondSelectors.state) public state$: Observable<LayoutState>;
  @Select(UiSelectors.assistance) public assistance$: Observable<Assistance>;
  @Input() public menu: MenuItem[];
  public headerExtrasTemplate: TemplateRef<any>;
  constructor(public readonly config: SmzLayoutsConfig, public readonly layout: DiamondLayout, public readonly routerListener: RouterDataListenerService, private store: Store, public cdr: ChangeDetectorRef)
  {
    this.store.dispatch(new UiActions.Initialize());
    this.store.dispatch(new UiDiamondActions.Initialize(config, layout));
  }

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

  public hideMenu(): void
  {
    this.store.dispatch(new UiDiamondActions.HideSidebar);
  }


}
