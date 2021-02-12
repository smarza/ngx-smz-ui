import { AfterContentInit, Component, ContentChildren, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { UiSelectors } from '../../../../core/state/ui/ui.selectors';
import { LayoutState } from '../../../../core/models/layout';
import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';
import { SmzAppLogo } from '../../../../core/models/logo';
import { UiApolloSelectors } from '../../state/ui-apollo/ui-apollo.selectors';
import { UiApolloActions } from '../../state/ui-apollo/ui-apollo.actions';

@UntilDestroy()
@Component({
  selector: 'smz-ui-apollo-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class ApolloFooterComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiApolloSelectors.state) public state$: Observable<LayoutState>;
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
    this.store.dispatch(new UiApolloActions.ShowSidebar);
  }

  public hide(): void
  {
    this.store.dispatch(new UiApolloActions.HideSidebar);
  }

  public toggle(): void
  {
    this.store.dispatch(new UiApolloActions.ToggleSidebar);
  }

}
