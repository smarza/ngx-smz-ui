import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PrimeTemplate } from 'primeng/api';
import { SmzLayoutsConfig } from '../../../../public-api';
import { Observable } from 'rxjs';
import { UiManagerSelectors } from '../../../../core/state/ui-manager/ui-manager.selectors';
import { UiManagerActions } from '../../../../core/state/ui-manager/ui-manager.actions';
import { LayoutState } from '../../../../core/models/layout';

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
  public headerExtrasTemplate: TemplateRef<any>;
  constructor(public readonly config: SmzLayoutsConfig, private store: Store) { }

  ngOnInit(): void
  {

  }
  public ngAfterContentInit()
  {
    console.log(this.templates);
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
