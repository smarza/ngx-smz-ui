import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { ApplicationActions, ApplicationSelectors, ToastActions } from 'ngx-rbk-utils';
import { Observable } from 'rxjs';
import { Assistance, SmzAssistanceButtonPositions, SmzAssistancePositions } from '../../core/models/assistance';
import { SmzLoader, SmzLoaders } from '../../core/models/loaders';
import { SmzContentTheme, SmzContentThemes } from '../../core/models/themes';
import { UiActions } from '../../core/state/ui/ui.actions';
import { UiSelectors } from '../../core/state/ui/ui.selectors';
import { SmzLayoutsConfig } from '../../core/globals/smz-layouts.config';
import { SmzToast, SmzToastPositions, SmzToasts } from '../../core/models/toasts';
import { EdgePositionType, LeftPositionType, RightPositionType, SidePositionType } from '../../core/models/positions';
import { ColorSchemaDefinition, SmzColorSchemas } from '../../core/models/color-schemas';

@UntilDestroy()
@Component({
  selector: 'smz-ui-global-assistance',
  templateUrl: './global-assistance.component.html',
  styleUrls: ['./global-assistance.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GlobalAssistanceComponent implements OnInit {
  @Select(UiSelectors.assistance) public assistance$: Observable<Assistance>;
  public globalIsLoading: boolean;
  public timer: number;
  public contentThemes = SmzContentThemes;
  public colorSchemes = SmzColorSchemas;
  public loaders = SmzLoaders;
  public toasts = SmzToasts;
  public toastPositions = SmzToastPositions;
  public assistancePositions = SmzAssistancePositions;
  public assistanceButtonPositions = SmzAssistanceButtonPositions;
  constructor(public readonly config: SmzLayoutsConfig, private store: Store, private cdr: ChangeDetectorRef) {

    this.store
      .select(ApplicationSelectors.globalIsLoading)
      .pipe(untilDestroyed(this))
      .subscribe((newValue) => {
        if (newValue !== this.globalIsLoading) {
          this.globalIsLoading = newValue;
          this.cdr.markForCheck();
        }
      });

  }

  public ngOnInit(): void {
  }

  public onHide(): void {
    this.store.dispatch(new UiActions.HideConfigAssistance);
  }

  public onShow(): void {
    this.store.dispatch(new UiActions.ShowConfigAssistance);
  }

  public onSetContentTheme(data: SmzContentTheme): void {
    this.store.dispatch(new UiActions.SetContentTheme(data));
  }

  public onSetColorSchema(data: ColorSchemaDefinition): void {
    this.store.dispatch(new UiActions.SetColorSchema(data));
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

}
