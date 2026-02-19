import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { SmzAssistanceButtonPositions, SmzAssistancePositions } from '../../core/models/assistance';
import { SmzLoader, SmzLoaders } from '../../core/models/loaders';
import { SmzContentTheme, SmzContentThemes } from '../../core/models/themes';
import { LayoutUiActions } from '../../../../state/ui/layout/layout.actions';
import { LayoutUiSelectors } from '../../../../state/ui/layout/layout.selectors';
import { SmzToast, SmzToastPositions, SmzToasts } from '../../core/models/toasts';
import { EdgePositionType, LeftPositionType, RightPositionType, SidePositionType } from '../../core/models/positions';
import { ColorSchemaDefinition, SmzColorSchemas } from '../../core/models/color-schemas';
import { ApplicationSelectors } from '../../../../state/global/application/application.selector';
import { ApplicationActions } from '../../../../state/global/application/application.actions';
import { ToastActions } from '../../../../state/global/application/application.actions.toast';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'smz-ui-global-assistance',
    templateUrl: './global-assistance.component.html',
    styleUrls: ['./global-assistance.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class GlobalAssistanceComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  public assistance$ = inject(Store).select(LayoutUiSelectors.assistance);
  public globalIsLoading: boolean;
  public timer: number | null;
  public contentThemes = SmzContentThemes;
  public colorSchemes = SmzColorSchemas;
  public loaders = SmzLoaders;
  public toasts = SmzToasts;
  public toastPositions = SmzToastPositions;
  public assistancePositions = SmzAssistancePositions;
  public assistanceButtonPositions = SmzAssistanceButtonPositions;
  constructor(private store: Store, private cdr: ChangeDetectorRef) {

    this.store
      .select(ApplicationSelectors.globalIsLoading)
      .pipe(takeUntilDestroyed(this.destroyRef))
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
    this.store.dispatch(new LayoutUiActions.HideConfigAssistance);
  }

  public onShow(): void {
    this.store.dispatch(new LayoutUiActions.ShowConfigAssistance);
  }

  public onSetContentTheme(data: SmzContentTheme): void {
    this.store.dispatch(new LayoutUiActions.SetContentTheme(data));
  }

  public onSetColorSchema(data: ColorSchemaDefinition | string): void {
    this.store.dispatch(new LayoutUiActions.SetColorSchema(data));
  }

  public changeGlobalLoading(event: { checked: boolean }, seconds: number): void {
    if (event.checked) {
      this.timer = seconds;
      this.store.dispatch(new ApplicationActions.StartGlobalLoading);
    }

    // TODO: Verificar se é está funcionando corretamente
    const timer = setInterval(() => {
      if (this.timer != null) {
        this.timer--;
      }
    }, 1000);

    setTimeout(() => {
      this.store.dispatch(new ApplicationActions.StopGlobalLoading);
      this.timer = null;
      clearInterval(timer);
    }, seconds * 1000);
  }

  public onSetGlobalLoader(data: SmzLoader): void {
    this.store.dispatch(new LayoutUiActions.SetGlobalLoader(data));
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
    this.store.dispatch(new LayoutUiActions.SetToastPosition(data));
  }

  public onSetAssistancePosition(data: SidePositionType): void {
    this.store.dispatch(new LayoutUiActions.SetAssistancePosition(data));
  }

  public onSetAssistanceButtonPosition(data: LeftPositionType | RightPositionType): void {
    this.store.dispatch(new LayoutUiActions.SetAssistanceButtonPosition(data));
  }

}
