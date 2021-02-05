import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { ApplicationActions, ApplicationSelectors } from 'ngx-rbk-utils';
import { Observable } from 'rxjs';
import { Assistance } from '../../core/models/assistance';
import { SmzLoader, SmzLoaders } from '../../core/models/loaders';
import { SmzMenuType } from '../../core/models/menu-types';
import { SmzContentTheme, SmzContentThemes, SmzLayoutTheme, SmzLayoutThemes } from '../../core/models/themes';
import { UiManagerActions } from '../../core/state/ui-manager/ui-manager.actions';
import { UiManagerSelectors } from '../../core/state/ui-manager/ui-manager.selectors';
import { SmzLayoutsConfig } from '../../globals/smz-layouts.config';

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
  public globalIsLoading: boolean;
  public timer: number;
  public isVisible = false;
  public menuTypes = [];
  public menuType: SmzMenuType = SmzMenuType.STATIC;
  public contentThemes = SmzContentThemes;
  public layoutThemes = SmzLayoutThemes;
  public loaders = SmzLoaders;
  constructor(public readonly config: SmzLayoutsConfig, private store: Store, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void
  {
    this.store
      .select(UiManagerSelectors.assistance)
      .pipe(untilDestroyed(this))
      .subscribe(assistance =>
      {
        this.isVisible = assistance.isVisible;
      });

    this.store
      .select(ApplicationSelectors.globalIsLoading)
      .pipe(untilDestroyed(this))
      .subscribe((newValue) =>
      {
        if (newValue !== this.globalIsLoading)
        {
          this.globalIsLoading = newValue;
          this.cdr.markForCheck();
        }
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

  public changeGlobalLoading(event: { checked: boolean }): void
  {
    if (event.checked)
    {
      this.timer = 5;
      this.store.dispatch(new ApplicationActions.StartGlobalLoading);
    }

    const timer = setInterval(() =>
    {
      this.timer--;
    }, 1000);

    setTimeout(() =>
    {
      this.store.dispatch(new ApplicationActions.StopGlobalLoading);
      this.timer = null;
      clearInterval(timer);
    }, 5000);
  }

  public onSetGlobalLoader(data: SmzLoader): void
  {
    this.store.dispatch(new UiManagerActions.SetGlobalLoader(data));
  }

}
