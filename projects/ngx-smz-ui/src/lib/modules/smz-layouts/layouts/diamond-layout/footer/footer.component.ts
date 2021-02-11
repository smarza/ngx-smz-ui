import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { UiSelectors } from '../../../core/state/ui/ui.selectors';
import { LayoutState } from '../../../core/models/layout';
import { SmzLayoutsConfig } from '../../../core/globals/smz-layouts.config';
import { SmzAppLogo } from '../../../core/models/logo';
import { UiLayoutSelectors } from '../state/ui-layout/ui-layout.selectors';
import { UiLayoutActions } from '../state/ui-layout/ui-layout.actions';

@UntilDestroy()
@Component({
  selector: 'smz-ui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiLayoutSelectors.state) public state$: Observable<LayoutState>;
  @Select(UiSelectors.appLogo) public appLogo$: Observable<SmzAppLogo>;
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
    this.store.dispatch(new UiLayoutActions.ShowSidebar);
  }

  public hide(): void
  {
    this.store.dispatch(new UiLayoutActions.HideSidebar);
  }

  public toggle(): void
  {
    this.store.dispatch(new UiLayoutActions.ToggleSidebar);
  }

}
