import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Assistance } from '../../core/models/assistance';
import { SmzMenuType } from '../../core/models/menu-types';
import { UiManagerActions } from '../../core/state/ui-manager/ui-manager.actions';
import { UiManagerSelectors } from '../../core/state/ui-manager/ui-manager.selectors';
import { SmzLayoutsConfig } from '../../globals/smz-layouts.config';
import { SmzContentTheme, SmzContentThemes, SmzLayoutTheme, SmzLayoutThemes } from '../../public-api';

@UntilDestroy()
@Component({
  selector: 'smz-ui-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssistanceComponent implements OnInit
{
  @Select(UiManagerSelectors.assistance) public assistance$: Observable<Assistance>;
  public isVisible = false;
  public menuTypes = [];
  public menuType: SmzMenuType = SmzMenuType.STATIC;

  public contentThemes = SmzContentThemes;
  public layoutThemes = SmzLayoutThemes;
  constructor(public readonly config: SmzLayoutsConfig, private store: Store) { }

  ngOnInit(): void
  {
    this.store
      .select(UiManagerSelectors.assistance)
      .pipe(untilDestroyed(this))
      .subscribe(assistance =>
      {
        this.isVisible = assistance.isVisible;
      });

    this.setupData();
  }

  public setupData(): void
  {
    this.menuTypes = [
      { label: 'Static', value: SmzMenuType.STATIC },
      { label: 'Overlay', value: SmzMenuType.OVERLAY },
      { label: 'Slim', value: SmzMenuType.SLIM },
    ]
  }

  public onMenuTypeChange(): void
  {
    this.store.dispatch(new UiManagerActions.SetMenuType(this.menuType));
  }

  public onHide(): void
  {
    this.store.dispatch(new UiManagerActions.HideConfigAssistance);
  }

  public onShow(): void
  {
    this.store.dispatch(new UiManagerActions.ShowConfigAssistance);
  }

  public showMenu(): void
  {
    this.store.dispatch(new UiManagerActions.ShowSidebar);
  }

  public hideMenu(): void
  {
    this.store.dispatch(new UiManagerActions.HideSidebar);
  }

  public onSetLayoutTheme(theme: SmzLayoutTheme): void
  {
    this.store.dispatch(new UiManagerActions.SetLayoutTheme(theme));
  }

  public onSetContentTheme(theme: SmzContentTheme): void
  {
    this.store.dispatch(new UiManagerActions.SetContentTheme(theme));
  }

}
