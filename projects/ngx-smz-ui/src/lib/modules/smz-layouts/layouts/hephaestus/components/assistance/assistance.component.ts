import { Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { cloneDeep } from 'lodash-es';
import { UiHephaestusSelectors } from '../../state/ui-layout.selectors';
import { LayoutUiSelectors } from '../../../../../../state/ui/layout/layout.selectors';
import { InputChangeData } from '../../../../../../common/input-detection/input-detection.directive';
import { UiHephaestusActions } from '../../state/ui-layout.actions';
import { LayoutUiActions } from '../../../../../../state/ui/layout/layout.actions';
import { HephaestusLayout, HephaestusMenuTypes } from '../../layout.config';
import { MenuType } from '../../../../core/models/menu-types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'smz-ui-hephaestus-assistance',
    templateUrl: './assistance.component.html',
    styleUrls: ['./assistance.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class HephaestusAssistanceComponent{
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);
  public assistance$ = inject(Store).select(LayoutUiSelectors.assistance);
  public isVisible = false;
  public menuTypes: { label: string, value: HephaestusMenuTypes }[] = [];
  public menuType: HephaestusMenuTypes = MenuType.STATIC;
  public layout: HephaestusLayout;
  constructor() {

    this.store
      .select(UiHephaestusSelectors.layout)
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

  public setSidebarWidth(event: InputChangeData): void {
    this.store.dispatch(new UiHephaestusActions.SetSidebarWidth(event.new));
  }

  public setSidebarSlimWidth(event: InputChangeData): void {
    this.store.dispatch(new UiHephaestusActions.SetSidebarSlimWidth(event.new));
  }

  public setupData(): void {
    this.menuTypes = [
      { label: 'Static', value: MenuType.STATIC },
      { label: 'Overlay', value: MenuType.OVERLAY },
      { label: 'Slim', value: MenuType.SLIM },
    ]
  }

  public onMenuTypeChange(): void {
    this.store.dispatch(new UiHephaestusActions.SetMenu(this.menuType));
  }

  public onHide(): void {
    this.store.dispatch(new LayoutUiActions.HideConfigAssistance);
  }

  public onShow(): void {
    this.store.dispatch(new LayoutUiActions.ShowConfigAssistance);
  }

  public showMenu(): void {
    this.store.dispatch(new UiHephaestusActions.ShowSidebar);
  }

  public hideMenu(): void {
    this.store.dispatch(new UiHephaestusActions.HideSidebar);
  }

  public showAssistance(): void
  {
    this.store.dispatch(new LayoutUiActions.ShowConfigAssistance);
  }

}
