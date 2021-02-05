import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { SmzLayoutsConfig } from '../../../../public-api';
import { Observable } from 'rxjs';
import { UiManagerSelectors } from '../../../../core/state/ui-manager/ui-manager.selectors';
import { UiManagerActions } from '../../../../core/state/ui-manager/ui-manager.actions';
import { LayoutState } from '../../../../core/models/layout';
import { RouterState } from '@ngxs/router-plugin';

@UntilDestroy()
@Component({
  selector: 'smz-ui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiManagerSelectors.layoutState) public state$: Observable<LayoutState>;
  @Select(RouterState.state) public currentRoute$: Observable<any>;
  public headerExtrasTemplate: TemplateRef<any>;
  @Input() public menu: MenuItem[];
  constructor(public readonly config: SmzLayoutsConfig, private store: Store) { }

  ngOnInit(): void
  {

  }
  public test(event): void
  {
    console.log(event);
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

  public show(): void
  {
    this.store.dispatch(new UiManagerActions.ShowSidebar);
  }

  public hide(): void
  {
    this.store.dispatch(new UiManagerActions.HideSidebar);
  }

  public toggle(): void
  {
    this.store.dispatch(new UiManagerActions.ToggleSidebar);
  }

}
