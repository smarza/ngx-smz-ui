import { AfterContentInit, Component, ContentChildren, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { UiSelectors } from '../../../../core/state/ui/ui.selectors';
import { UiActions } from '../../../../core/state/ui/ui.actions';
import { LayoutState } from '../../../../core/models/layout';
import { SmzLayoutsConfig } from '../../../../globals/smz-layouts.config';

@UntilDestroy()
@Component({
  selector: 'smz-ui-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiSelectors.state) public state$: Observable<LayoutState>;
  @Select(UiSelectors.topbarTitle) public topbarTitle$: Observable<string>;
  public headerExtrasTemplate: TemplateRef<any>;
  constructor(public readonly config: SmzLayoutsConfig, private store: Store) { }

  ngOnInit(): void
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

  public show(): void
  {
    this.store.dispatch(new UiActions.ShowSidebar);
  }

  public hide(): void
  {
    this.store.dispatch(new UiActions.HideSidebar);
  }

  public toggle(): void
  {
    this.store.dispatch(new UiActions.ToggleSidebar);
  }

}
