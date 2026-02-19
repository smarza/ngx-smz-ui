import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalInjector } from '../../../../common/services/global-injector';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { TenantsSelectors } from '../../../smz-access/state/tenants/tenants.selectors';
import { Store } from '@ngxs/store';
import { TenantDetails } from '../../../smz-access/models/tenant-details';
import { FormsModule } from '@angular/forms';
import { SwitchTenant } from '../../../smz-access/models/switch-tenant';
import { AuthenticationActions } from '../../../../state/global/authentication/authentication.actions';
import { AuthenticationSelectors } from '../../../../state/global/authentication/authentication.selectors';
import { SharedModule } from 'primeng/api';
import { showSwitchTenantDialog } from './show-tenant-switch-dialog';

@Component({
    selector: 'smz-tenant-switch',
    imports: [CommonModule, SelectModule, FormsModule, SharedModule],
    host: { class: 'w-full h-full relative' },
    styles: [
        '.smz-tenant-switch-small .p-inputtext { padding: 0.5rem 0.75rem !important; }'
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    template: `
  @if ((isAuthenticated$ | async) && (isSuperuserLogged$ | async) === false && showTenantSwitch) {
    <p-select appendTo="body" [options]="userAllowedTenants$ | async" styleClass="smz-tenant-switch-small w-full" optionLabel="alias" dataKey="name" [(ngModel)]="selected" (onChange)="onSelectorChange($event)"></p-select>
  }
  `
})
export class SmzTenantSwitchComponent implements OnInit {
  private readonly store = inject(Store);
  public showTenantSwitch = GlobalInjector.config.rbkUtils.authentication.allowTenantSwitching;
  public selected: TenantDetails;
  public userAllowedTenants$ = this.store.select(TenantsSelectors.userAllowedTenants);
  public isSuperuserLogged$ = this.store.select(AuthenticationSelectors.isSuperuserLogged);
  public isAuthenticated$ = this.store.select(AuthenticationSelectors.isAuthenticated);

  constructor() {
    this.selected = this.store.selectSnapshot(TenantsSelectors.currentTenant);
  }

  public ngOnInit(): void {
  }

  public onSelectorChange(event: SelectChangeEvent): void {

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