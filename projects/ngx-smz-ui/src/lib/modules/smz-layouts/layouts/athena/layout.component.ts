import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PrimeTemplate, MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { Assistance } from '../../core/models/assistance';
import { LayoutState } from '../../core/models/layout';
import { RouterDataListenerService } from '../../core/services/router-data-listener.service';
import { UiActions } from '../../core/state/ui/ui.actions';
import { UiSelectors } from '../../core/state/ui/ui.selectors';
import { SmzLayoutsConfig } from '../../core/globals/smz-layouts.config';
import { UiAthenaActions } from './state/ui-layout.actions';
import { UiAthenaSelectors } from './state/ui-layout.selectors';
import { AthenaLayout } from './layout.config';
import { SmzNotification } from '../../core/models/notifications';

@Component({
  selector: 'smz-ui-athena-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AthenaLayoutComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiAthenaSelectors.state) public state$: Observable<LayoutState>;
  @Select(UiSelectors.assistance) public assistance$: Observable<Assistance>;
  @Input() public menu: MenuItem[];
  @Input() public profile: MenuItem[];
  @Input() public notifications: SmzNotification[];
  public headerExtrasTemplate: TemplateRef<any>;
  constructor(public readonly config: SmzLayoutsConfig, public readonly layout: AthenaLayout, public readonly routerListener: RouterDataListenerService, private store: Store, public cdr: ChangeDetectorRef)
  {
    this.store.dispatch(new UiActions.Initialize());
    this.store.dispatch(new UiAthenaActions.Initialize(config, layout));
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
    this.store.dispatch(new UiAthenaActions.HideSidebar);
  }


}
