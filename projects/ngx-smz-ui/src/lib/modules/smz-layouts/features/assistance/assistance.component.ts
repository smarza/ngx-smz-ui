import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { ApplicationActions, ApplicationSelectors, ToastActions } from 'ngx-rbk-utils';
import { Observable } from 'rxjs';
import { Assistance, SmzAssistanceButtonPositions, SmzAssistancePositions } from '../../core/models/assistance';
import { LayoutConfig } from '../../core/models/layout';
import { SmzLoader, SmzLoaders } from '../../core/models/loaders';
import { SmzMenuType } from '../../core/models/menu-types';
import { SmzContentTheme, SmzContentThemes, SmzLayoutTheme, SmzLayoutThemes } from '../../core/models/themes';
import { UiActions } from '../../core/state/ui/ui.actions';
import { UiSelectors } from '../../core/state/ui/ui.selectors';
import { SmzLayoutsConfig } from '../../globals/smz-layouts.config';
import { cloneDeep } from 'lodash-es';
import { InputChangeData } from '../../../../common/input-detection/input-detection.directive';
import { SmzToast, SmzToastPositions, SmzToasts } from '../../core/models/toasts';
import { EdgePositionType, LeftPositionType, RightPositionType, SidePositionType } from '../../core/models/positions';

@UntilDestroy()
@Component({
  selector: 'smz-ui-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssistanceComponent implements OnInit {
  @Select(UiSelectors.assistance) public assistance$: Observable<Assistance>;
  @Select(UiSelectors.config) public config$: Observable<LayoutConfig>;
  public globalIsLoading: boolean;
  public timer: number;
  public isVisible = false;
  public menuTypes = [];
  public menuType: SmzMenuType = SmzMenuType.STATIC;
  public contentThemes = SmzContentThemes;
  public layoutThemes = SmzLayoutThemes;
  public loaders = SmzLoaders;
  public toasts = SmzToasts;
  public toastPositions = SmzToastPositions;
  public assistancePositions = SmzAssistancePositions;
  public assistanceButtonPositions = SmzAssistanceButtonPositions;
  public layout: LayoutConfig;
  constructor(public readonly config: SmzLayoutsConfig, private store: Store, private cdr: ChangeDetectorRef) {
    this.store
      .select(UiSelectors.config)
      .pipe(untilDestroyed(this))
      .subscribe(config => {
        this.layout = cloneDeep(config);
        this.menuType = config.menuType;
      });

    this.store
      .select(UiSelectors.assistance)
      .pipe(untilDestroyed(this))
      .subscribe(assistance => {
        this.isVisible = assistance.isVisible;
      });

    this.store
      .select(ApplicationSelectors.globalIsLoading)
      .pipe(untilDestroyed(this))
      .subscribe((newValue) => {
        if (newValue !== this.globalIsLoading) {
          this.globalIsLoading = newValue;
          this.cdr.markForCheck();
        }
      });

    this.setupData();
  }

  public ngOnInit(): void {
  }

  public setSidebarWidth(event: InputChangeData): void {
    this.store.dispatch(new UiActions.SetSidebarWidth(event.new));
  }

  public setSidebarSlimWidth(event: InputChangeData): void {
    this.store.dispatch(new UiActions.SetSidebarSlimWidth(event.new));
  }

  public setupData(): void {
    this.menuTypes = [
      { label: 'Static', value: SmzMenuType.STATIC },
      { label: 'Overlay', value: SmzMenuType.OVERLAY },
      { label: 'Slim', value: SmzMenuType.SLIM },
    ]
  }

  public onMenuTypeChange(): void {
    this.store.dispatch(new UiActions.SetMenuType(this.menuType));
  }

  public onHide(): void {
    this.store.dispatch(new UiActions.HideConfigAssistance);
  }

  public onShow(): void {
    this.store.dispatch(new UiActions.ShowConfigAssistance);
  }

  public showMenu(): void {
    this.store.dispatch(new UiActions.ShowSidebar);
  }

  public hideMenu(): void {
    this.store.dispatch(new UiActions.HideSidebar);
  }

  public onSetLayoutTheme(theme: SmzLayoutTheme): void {
    this.store.dispatch(new UiActions.SetLayoutTheme(theme));
  }

  public onSetContentTheme(theme: SmzContentTheme): void {
    this.store.dispatch(new UiActions.SetContentTheme(theme));
  }

  public changeGlobalLoading(event: { checked: boolean }): void {
    if (event.checked) {
      this.timer = 5;
      this.store.dispatch(new ApplicationActions.StartGlobalLoading);
    }

    const timer = setInterval(() => {
      this.timer--;
    }, 1000);

    setTimeout(() => {
      this.store.dispatch(new ApplicationActions.StopGlobalLoading);
      this.timer = null;
      clearInterval(timer);
    }, 5000);
  }

  public onSetGlobalLoader(data: SmzLoader): void {
    this.store.dispatch(new UiActions.SetGlobalLoader(data));
  }

  public onShowToast(toast: SmzToast): void {
    switch (toast) {
      case SmzToast.CUSTOM:
        this.store.dispatch(new ToastActions.Custom({ }));
        break;

      case SmzToast.ERROR:
        this.store.dispatch(new ToastActions.Error('Error Message', 'Error'));
        break;

      case SmzToast.INFO:
        this.store.dispatch(new ToastActions.Info('Info Message', 'Info'));
        break;

      case SmzToast.SUCCESS:
        this.store.dispatch(new ToastActions.Success('Success Message', 'Success'));
        break;

      case SmzToast.WARNING:
        this.store.dispatch(new ToastActions.Warning('Warning Message', 'Warning'));
        break;

      default:
        break;
    }
  }

  public onSetToastPosition(data: EdgePositionType): void {
    this.store.dispatch(new UiActions.SetToastPosition(data));
  }

  public onSetAssistancePosition(data: SidePositionType): void {
    this.store.dispatch(new UiActions.SetAssistancePosition(data));
  }

  public onSetAssistanceButtonPosition(data: LeftPositionType | RightPositionType): void {
    this.store.dispatch(new UiActions.SetAssistanceButtonPosition(data));
  }

  public showAssistance(): void
  {
    this.store.dispatch(new UiActions.ShowConfigAssistance);
  }

}
