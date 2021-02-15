import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { cloneDeep } from 'lodash-es';
import { UiAthenaSelectors } from '../../state/ui-layout.selectors';
import { UiSelectors } from '../../../../core/state/ui/ui.selectors';
import { Assistance } from '../../../../core/models/assistance';
import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';
import { InputChangeData } from '../../../../../../common/input-detection/input-detection.directive';
import { UiAthenaActions } from '../../state/ui-layout.actions';
import { UiActions } from '../../../../core/state/ui/ui.actions';
import { SmzContentTheme } from '../../../../core/models/themes';
import { AthenaLayout, AthenaMenuTypes } from '../../layout.config';
import { MenuType } from '../../../../core/models/menu-types';

@UntilDestroy()
@Component({
  selector: 'smz-ui-athena-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AthenaAssistanceComponent implements OnInit {
  @Select(UiSelectors.assistance) public assistance$: Observable<Assistance>;
  public isVisible = false;
  public menuTypes = [];
  public menuType: AthenaMenuTypes = MenuType.STATIC;
  public layout: AthenaLayout;
  constructor(public readonly config: SmzLayoutsConfig, private store: Store, private cdr: ChangeDetectorRef) {

    this.store
      .select(UiAthenaSelectors.layout)
      .pipe(untilDestroyed(this))
      .subscribe(config => {
        this.layout = cloneDeep(config);
        this.menuType = config.menu;
      });

    this.store
      .select(UiSelectors.assistance)
      .pipe(untilDestroyed(this))
      .subscribe(assistance => {
        this.isVisible = assistance.isVisible;
      });

    this.setupData();
  }

  public ngOnInit(): void {
  }

  public setSidebarWidth(event: InputChangeData): void {
    this.store.dispatch(new UiAthenaActions.SetSidebarWidth(event.new));
  }

  public setSidebarSlimWidth(event: InputChangeData): void {
    this.store.dispatch(new UiAthenaActions.SetSidebarSlimWidth(event.new));
  }

  public setupData(): void {
    this.menuTypes = [
      { label: 'Static', value: MenuType.STATIC },
      { label: 'Overlay', value: MenuType.OVERLAY },
      { label: 'Slim', value: MenuType.SLIM },
      { label: 'Horizontal', value: MenuType.HORIZONTAL },
    ]
  }

  public onMenuTypeChange(): void {
    this.store.dispatch(new UiAthenaActions.SetMenu(this.menuType));
  }

  public onHide(): void {
    this.store.dispatch(new UiActions.HideConfigAssistance);
  }

  public onShow(): void {
    this.store.dispatch(new UiActions.ShowConfigAssistance);
  }

  public showMenu(): void {
    this.store.dispatch(new UiAthenaActions.ShowSidebar);
  }

  public hideMenu(): void {
    this.store.dispatch(new UiAthenaActions.HideSidebar);
  }

  public onSetContentTheme(theme: SmzContentTheme): void {
    this.store.dispatch(new UiActions.SetContentTheme(theme));
  }

  public showAssistance(): void
  {
    this.store.dispatch(new UiActions.ShowConfigAssistance);
  }

}
