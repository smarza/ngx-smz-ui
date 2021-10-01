import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { cloneDeep } from 'lodash-es';
import { UiHephaestusSelectors } from '../../state/ui-layout.selectors';
import { LayoutUiSelectors } from '../../../../../../state/ui/layout/layout.selectors';
import { Assistance } from '../../../../core/models/assistance';
import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';
import { InputChangeData } from '../../../../../../common/input-detection/input-detection.directive';
import { UiHephaestusActions } from '../../state/ui-layout.actions';
import { LayoutUiActions } from '../../../../../../state/ui/layout/layout.actions';
import { HephaestusLayout, HephaestusMenuTypes } from '../../layout.config';
import { MenuType } from '../../../../core/models/menu-types';

@UntilDestroy()
@Component({
  selector: 'smz-ui-hephaestus-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HephaestusAssistanceComponent implements OnInit {
  @Select(LayoutUiSelectors.assistance) public assistance$: Observable<Assistance>;
  public isVisible = false;
  public menuTypes = [];
  public menuType: HephaestusMenuTypes = MenuType.STATIC;
  public layout: HephaestusLayout;
  constructor(public readonly config: SmzLayoutsConfig, private store: Store, private cdr: ChangeDetectorRef) {

    this.store
      .select(UiHephaestusSelectors.layout)
      .pipe(untilDestroyed(this))
      .subscribe(config => {
        this.layout = cloneDeep(config);
        this.menuType = config.menu;
      });

    this.store
      .select(LayoutUiSelectors.assistance)
      .pipe(untilDestroyed(this))
      .subscribe(assistance => {
        this.isVisible = assistance.isVisible;
      });

    this.setupData();
  }

  public ngOnInit(): void {
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
