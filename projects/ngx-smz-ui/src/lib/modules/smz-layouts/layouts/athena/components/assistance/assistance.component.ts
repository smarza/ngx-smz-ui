import { Component, DestroyRef, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { cloneDeep } from 'lodash-es';
import { UiAthenaSelectors } from '../../state/ui-layout.selectors';
import { LayoutUiSelectors } from '../../../../../../state/ui/layout/layout.selectors';
import { InputChangeData } from '../../../../../../common/input-detection/input-detection.directive';
import { UiAthenaActions } from '../../state/ui-layout.actions';
import { LayoutUiActions } from '../../../../../../state/ui/layout/layout.actions';
import { SmzContentTheme } from '../../../../core/models/themes';
import { AthenaLayout, AthenaMenuTypes } from '../../layout.config';
import { MenuType } from '../../../../core/models/menu-types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'smz-ui-athena-assistance',
    templateUrl: './assistance.component.html',
    styleUrls: ['./assistance.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class AthenaAssistanceComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  public assistance$ = inject(Store).select(LayoutUiSelectors.assistance);
  public isVisible = false;
  public menuTypes: { label: string, value: AthenaMenuTypes }[] = [];
  public menuType: AthenaMenuTypes = MenuType.STATIC;
  public layout: AthenaLayout;
  constructor(private store: Store) {

    this.store
      .select(UiAthenaSelectors.layout)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(config => {
        this.layout = cloneDeep(config);
        this.menuType = config.menu;
      });

    this.store
      .select(LayoutUiSelectors.assistance)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(assistance => {
        this.isVisible = assistance.isVisible ?? false;
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
    this.store.dispatch(new LayoutUiActions.HideConfigAssistance);
  }

  public onShow(): void {
    this.store.dispatch(new LayoutUiActions.ShowConfigAssistance);
  }

  public showMenu(): void {
    this.store.dispatch(new UiAthenaActions.ShowSidebar);
  }

  public hideMenu(): void {
    this.store.dispatch(new UiAthenaActions.HideSidebar);
  }

  public onSetContentTheme(theme: SmzContentTheme): void {
    this.store.dispatch(new LayoutUiActions.SetContentTheme(theme));
  }

  public showAssistance(): void
  {
    this.store.dispatch(new LayoutUiActions.ShowConfigAssistance);
  }

}
