import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalInjector } from '../../../../common/services/global-injector';
import { DropdownModule } from 'primeng/dropdown';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { SmzResponsiveComponent } from '../../../smz-responsive/smz-responsive.component';
import { showSwitchLocalizationDialog } from './show-localization-switch-dialog';
import { SmzUiLocale } from '../../../../state/database/ui-localization/ui-localization.state';
import { UiLocalizationDbSelectors } from '../../../../state/database/ui-localization/ui-localization.selectors';
import { UiLocalizationDbActions } from '../../../../state/database/ui-localization/ui-localization.actions';


@Component({
  selector: 'smz-localization-switch',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule, SharedModule, SmzResponsiveComponent],
  host: { class: 'h-full relative' },
  styles: [
    '.smz-localization-switch-small .p-inputtext { padding: 0.5rem 0.75rem !important; }'
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
  <ng-container *ngIf="showLocalizationSwitch">

    <smz-responsive class="col grid grid-nogutter w-full items-center justify-start">

    <!-- LANDSCAPE -->
      <ng-template pTemplate="landscape">

        <div  class="h-full grid grid-nogutter items-center justify-center">
          <p-dropdown [options]="locales$ | async" styleClass="smz-tenant-switch-small" optionLabel="alias" dataKey="name" appendTo="body" [(ngModel)]="selected" (onChange)="onSelectorChange($event.value)">

            <ng-template pTemplate="selectedItem">
                <div class="flex align-items-center gap-2" *ngIf="selected">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + selected.country.toLowerCase()" style="width: 18px"/>
                    <div>{{ selected.name }}</div>
                </div>
            </ng-template>
            <ng-template let-locale pTemplate="item">
                <div class="flex align-items-center gap-2">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + locale.country.toLowerCase()" style="width: 18px"/>
                    <div>{{ locale.name }}</div>
                </div>
            </ng-template>

        </p-dropdown>

        </div>

      </ng-template>

      <!-- PORTRAIT -->
      <ng-template pTemplate="portrait">
        <i class="fa-solid fa-repeat cursor-pointer text-2xl text-text-color switch-tenant" (click)="showSwitchDialog()">
      </i>
      </ng-template>

    </smz-responsive>

  </ng-container>
  `,
})
export class SmzLocalizationSwitchComponent implements OnInit {
  public showLocalizationSwitch = GlobalInjector.config.rbkUtils.uiLocalization.allowLocalizationSwitching;
  public selected: SmzUiLocale;
  @Select(UiLocalizationDbSelectors.locales) public locales$: Observable<SmzUiLocale[]>;

  public ngOnInit(): void {
    this.updateSelectionWithCurrent();
  }

  constructor(private store: Store) {}
  public onSelectorChange(locale: SmzUiLocale): void {

    this.store.dispatch(new UiLocalizationDbActions.SetCurrent(locale.code));

    setTimeout(() => this.updateSelectionWithCurrent(), 0);
  }

  private updateSelectionWithCurrent(): void {
    this.selected = this.store.selectSnapshot(UiLocalizationDbSelectors.current);
  }

  public showSwitchDialog(): void {
    showSwitchLocalizationDialog();
  }

}