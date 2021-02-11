import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { cloneDeep } from 'lodash-es';
import { UiLayoutSelectors } from '../state/ui-layout/ui-layout.selectors';
import { UiSelectors } from '../../../core/state/ui/ui.selectors';
import { Assistance } from '../../../core/models/assistance';
import { DiamondMenuType } from '../../../core/models/menu-types';
import { DiamondLayout } from '../../../core/models/layout';
import { SmzLayoutsConfig } from '../../../core/globals/smz-layouts.config';
import { InputChangeData } from '../../../../../common/input-detection/input-detection.directive';
import { UiLayoutActions } from '../state/ui-layout/ui-layout.actions';
import { UiActions } from '../../../core/state/ui/ui.actions';
import { SmzContentTheme, SmzLayoutTheme } from '../../../core/models/themes';

@UntilDestroy()
@Component({
  selector: 'smz-ui-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssistanceComponent implements OnInit {
  @Select(UiSelectors.assistance) public assistance$: Observable<Assistance>;
  public isVisible = false;
  public menuTypes = [];
  public menuType: DiamondMenuType = DiamondMenuType.STATIC;
  public layout: DiamondLayout;
  constructor(public readonly config: SmzLayoutsConfig, private store: Store, private cdr: ChangeDetectorRef) {

    this.store
      .select(UiLayoutSelectors.layout)
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
    this.store.dispatch(new UiLayoutActions.SetSidebarWidth(event.new));
  }

  public setSidebarSlimWidth(event: InputChangeData): void {
    this.store.dispatch(new UiLayoutActions.SetSidebarSlimWidth(event.new));
  }

  public setupData(): void {
    this.menuTypes = [
      { label: 'Static', value: DiamondMenuType.STATIC },
      { label: 'Overlay', value: DiamondMenuType.OVERLAY },
      { label: 'Slim', value: DiamondMenuType.SLIM },
    ]
  }

  public onMenuTypeChange(): void {
    this.store.dispatch(new UiLayoutActions.SetMenu(this.menuType));
  }

  public onHide(): void {
    this.store.dispatch(new UiActions.HideConfigAssistance);
  }

  public onShow(): void {
    this.store.dispatch(new UiActions.ShowConfigAssistance);
  }

  public showMenu(): void {
    this.store.dispatch(new UiLayoutActions.ShowSidebar);
  }

  public hideMenu(): void {
    this.store.dispatch(new UiLayoutActions.HideSidebar);
  }

  public onSetLayoutTheme(theme: SmzLayoutTheme): void {
    this.store.dispatch(new UiActions.SetLayoutTheme(theme));
  }

  public onSetContentTheme(theme: SmzContentTheme): void {
    this.store.dispatch(new UiActions.SetContentTheme(theme));
  }

  public showAssistance(): void
  {
    this.store.dispatch(new UiActions.ShowConfigAssistance);
  }

}
