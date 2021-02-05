import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PrimeTemplate } from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';
import { Observable } from 'rxjs/internal/Observable';
import { Assistance } from '../../../core/models/assistance';
import { LayoutState } from '../../../core/models/layout';
import { RouterDataListenerService } from '../../../core/services/router-data-listener.service';
import { UiManagerActions } from '../../../core/state/ui-manager/ui-manager.actions';
import { UiManagerSelectors } from '../../../core/state/ui-manager/ui-manager.selectors';
import { SmzLayoutsConfig } from '../../../globals/smz-layouts.config';

@Component({
  selector: 'smz-ui-diamond-layout',
  templateUrl: './diamond-layout.component.html',
  styleUrls: ['./diamond-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DiamondLayoutComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiManagerSelectors.state) public state$: Observable<LayoutState>;
  @Select(UiManagerSelectors.assistance) public assistance$: Observable<Assistance>;
  @Input() public menu: MenuItem[];
  public headerExtrasTemplate: TemplateRef<any>;
  constructor(public readonly config: SmzLayoutsConfig, public readonly routerListener: RouterDataListenerService, private store: Store, public cdr: ChangeDetectorRef)
  {
    this.store.dispatch(new UiManagerActions.Initialize());
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

  public showAssistance(): void
  {
    this.store.dispatch(new UiManagerActions.ShowConfigAssistance);
  }

  public hideMenu(): void
  {
    this.store.dispatch(new UiManagerActions.HideSidebar);
  }


}
