import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalInjector } from '../../../../common/services/global-injector';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { Observable } from 'rxjs';
import { TenantsSelectors } from '../../../smz-access/state/tenants/tenants.selectors';
import { Select, Store } from '@ngxs/store';
import { TenantDetails } from '../../../smz-access/models/tenant-details';
import { FormsModule } from '@angular/forms';
import { SwitchTenant } from '../../../smz-access/models/switch-tenant';
import { AuthenticationActions } from '../../../../state/global/authentication/authentication.actions';
import { AuthenticationSelectors } from '../../../../state/global/authentication/authentication.selectors';
import { SharedModule } from 'primeng/api';
import { SmzResponsiveComponent } from '../../../smz-responsive/smz-responsive.component';
import { showSwitchTenantDialog } from './show-tenant-switch-dialog';

@Component({
  selector: 'smz-tenant-switch',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule, SharedModule, SmzResponsiveComponent],
  host: { class: 'h-full relative' },
  styles: [
    '.smz-tenant-switch-small .p-inputtext { padding: 0.5rem 0.75rem !important; }'
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
  <ng-container *ngIf="(isSuperuserLogged$ | async) === false">
  <ng-container *ngIf="showTenantSwitch">

    <smz-responsive class="col grid grid-nogutter w-full items-center justify-start">

    <!-- LANDSCAPE -->
      <ng-template pTemplate="landscape">

        <div  class="h-full grid grid-nogutter items-center justify-center">
          <p-dropdown [options]="userAllowedTenants$ | async" styleClass="smz-tenant-switch-small" optionLabel="alias" dataKey="name" appendTo="body" [(ngModel)]="selected" (onChange)="onSelectorChange($event)"></p-dropdown>
        </div>

      </ng-template>

      <!-- PORTRAIT -->
      <ng-template pTemplate="portrait">
        <i class="fa-solid fa-repeat cursor-pointer text-2xl text-text-color-secondary switch-tenant" (click)="showSwitchDialog()">
      </i>
      </ng-template>

    </smz-responsive>

  </ng-container>
  </ng-container>
  `,
})
export class SmzTenantSwitchComponent implements OnInit {
  public showTenantSwitch = GlobalInjector.config.rbkUtils.authentication.allowTenantSwitching;
  public selected: TenantDetails;
  @Select(TenantsSelectors.userAllowedTenants) public userAllowedTenants$: Observable<TenantDetails[]>;
  @Select(AuthenticationSelectors.isSuperuserLogged) public isSuperuserLogged$: Observable<boolean>;

  constructor(private store: Store) {
    this.selected = this.store.selectSnapshot(TenantsSelectors.currentTenant);
  }

  public ngOnInit(): void {
  }

  public onSelectorChange(event: DropdownChangeEvent): void {

    if (event.originalEvent == null) {
      // Evento não foi trigado pelo usuário
      return;
    }

    const selectedTenant: TenantDetails = event.value;

    if (selectedTenant == null) {
      // Nenhum Tenant selecionado
      return;
    }

    const current = this.store.selectSnapshot(TenantsSelectors.currentTenant);

    if (selectedTenant.alias == current.alias) {
      // Tenant selecionado igual ao da store
      return;
    }

    const data: SwitchTenant = { tenant: event.value.name };
    this.store.dispatch(new AuthenticationActions.SwitchTenant(data));

  }

  public showSwitchDialog(): void {
    showSwitchTenantDialog();
  }

}