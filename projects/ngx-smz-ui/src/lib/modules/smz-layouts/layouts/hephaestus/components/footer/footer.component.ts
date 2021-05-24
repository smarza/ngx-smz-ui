import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { UiSelectors } from '../../../../core/state/ui/ui.selectors';
import { LayoutState } from '../../../../core/models/layout';
import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';
import { SmzAppLogo } from '../../../../core/models/logo';
import { UiHephaestusSelectors } from '../../state/ui-layout.selectors';
import { UiHephaestusActions } from '../../state/ui-layout.actions';

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
  @Select(UiSelectors.appContentLogo) public appLogo$: Observable<SmzAppLogo>;
  public footerExtrasTemplate: TemplateRef<any>;
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
        case 'footerExtras':
          this.footerExtrasTemplate = item.template;
          break;
      }
    });
  }


}
