import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Select } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { LayoutUiSelectors } from '../../../../../../state/ui/layout/layout.selectors';
import { LayoutState } from '../../../../core/models/layout';
import { SmzAppLogo } from '../../../../core/models/logo';
import { UiHephaestusSelectors } from '../../state/ui-layout.selectors';
import { GlobalInjector } from '../../../../../../common/services/global-injector';

@UntilDestroy()
@Component({
  selector: 'smz-ui-hephaestus-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  host: { 'class': 'z-10' }
})
export class HephaestusFooterComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiHephaestusSelectors.state) public state$: Observable<LayoutState>;
  @Select(LayoutUiSelectors.appContentLogo) public appLogo$: Observable<SmzAppLogo>;
  public footerExtrasTemplate: TemplateRef<any>;
  public uiConfig = GlobalInjector.config;
  constructor() { }

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


}
