import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { UiSelectors } from '../../../../core/state/ui/ui.selectors';
import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';
import { UiHephaestusActions } from '../../state/ui-layout.actions';
import { SmzNotification } from '../../../../core/models/notifications';

@UntilDestroy()
@Component({
  selector: 'smz-ui-hephaestus-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class HephaestusTopbarComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public notifications: SmzNotification[];
  @Input() public profile: MenuItem[];
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
    this.store.dispatch(new UiHephaestusActions.ShowSidebar);
  }

  public hide(): void
  {
    this.store.dispatch(new UiHephaestusActions.HideSidebar);
  }

  public toggle(): void
  {
    this.store.dispatch(new UiHephaestusActions.ToggleSidebar);
  }

}
