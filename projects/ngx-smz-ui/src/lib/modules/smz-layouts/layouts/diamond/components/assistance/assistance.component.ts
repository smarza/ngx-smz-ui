import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { cloneDeep } from 'lodash-es';
import { UiDiamondSelectors } from '../../state/ui-diamond/ui-diamond.selectors';
import { UiSelectors } from '../../../../core/state/ui/ui.selectors';
import { Assistance } from '../../../../core/models/assistance';
import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';
import { InputChangeData } from '../../../../../../common/input-detection/input-detection.directive';
import { UiDiamondActions } from '../../state/ui-diamond/ui-diamond.actions';
import { UiActions } from '../../../../core/state/ui/ui.actions';
import { DiamondLayout, DiamondMenuTypes } from '../../layout.config';
import { MenuType } from '../../../../core/models/menu-types';

@UntilDestroy()
@Component({
  selector: 'smz-ui-diamond-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiamondAssistanceComponent implements OnInit {
  @Select(UiSelectors.assistance) public assistance$: Observable<Assistance>;
  public isVisible = false;
  public menuTypes = [];
  public menuType: DiamondMenuTypes = MenuType.STATIC;
  public layout: DiamondLayout;
  constructor(public readonly config: SmzLayoutsConfig, private store: Store, private cdr: ChangeDetectorRef) {

    this.store
      .select(UiDiamondSelectors.layout)
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
    this.store.dispatch(new UiDiamondActions.SetSidebarWidth(event.new));
  }

  public setSidebarSlimWidth(event: InputChangeData): void {
    this.store.dispatch(new UiDiamondActions.SetSidebarSlimWidth(event.new));
  }

  public setupData(): void {
    this.menuTypes = [
      { label: 'Static', value: MenuType.STATIC },
      { label: 'Overlay', value: MenuType.OVERLAY },
      { label: 'Slim', value: MenuType.SLIM },
    ]
  }

  public onMenuTypeChange(): void {
    this.store.dispatch(new UiDiamondActions.SetMenu(this.menuType));
  }

  public onHide(): void {
    this.store.dispatch(new UiActions.HideConfigAssistance);
  }

  public onShow(): void {
    this.store.dispatch(new UiActions.ShowConfigAssistance);
  }

  public showMenu(): void {
    this.store.dispatch(new UiDiamondActions.ShowSidebar);
  }

  public hideMenu(): void {
    this.store.dispatch(new UiDiamondActions.HideSidebar);
  }

  public showAssistance(): void
  {
    this.store.dispatch(new UiActions.ShowConfigAssistance);
  }

}
