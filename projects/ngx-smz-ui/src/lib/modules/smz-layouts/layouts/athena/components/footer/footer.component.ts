import { AfterContentInit, Component, ContentChildren, inject, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { PrimeTemplate } from 'primeng/api';
import { LayoutUiSelectors } from '../../../../../../state/ui/layout/layout.selectors';
import { UiAthenaSelectors } from '../../state/ui-layout.selectors';
import { UiAthenaActions } from '../../state/ui-layout.actions';
import { GlobalInjector } from '../../../../../../common/services/global-injector';

@Component({
    selector: 'smz-ui-athena-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    host: { 'class': 'z-10' },
    standalone: false
})
export class AthenaFooterComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  public state$ = inject(Store).select(UiAthenaSelectors.state);
  public appLogo$ = inject(Store).select(LayoutUiSelectors.appContentLogo);
  public footerExtrasTemplate: TemplateRef<any>;
  public uiConfig = GlobalInjector.config;
  constructor(private store: Store) { }

  ngOnInit(): void
  {

  }
  public ngAfterContentInit()
  {
    this.templates.forEach((item) =>
    {
      switch (item.getType())
      {
        case 'footerExtras':
          this.footerExtrasTemplate = item.template;
          break;
      }
    });
  }

  public show(): void
  {
    this.store.dispatch(new UiAthenaActions.ShowSidebar);
  }

  public hide(): void
  {
    this.store.dispatch(new UiAthenaActions.HideSidebar);
  }

  public toggle(): void
  {
    this.store.dispatch(new UiAthenaActions.ToggleSidebar);
  }

}
