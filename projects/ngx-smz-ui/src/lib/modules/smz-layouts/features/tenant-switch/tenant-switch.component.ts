import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalInjector } from '../../../../common/services/global-injector';
import { DropdownModule } from 'primeng/dropdown';
import { Observable } from 'rxjs';
import { TenantsSelectors } from '../../../smz-access/state/tenants/tenants.selectors';
import { Select, Store } from '@ngxs/store';
import { TenantDetails } from '../../../smz-access/models/tenant-details';
import { FormsModule } from '@angular/forms';
import { SwitchTenant } from '../../../smz-access/models/switch-tenant';
import { AuthenticationActions } from '../../../../state/global/authentication/authentication.actions';
import { AuthenticationSelectors } from '../../../../state/global/authentication/authentication.selectors';

@Component({
  selector: 'smz-tenant-switch',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule],
  host: { class: 'h-full relative' },
  styles: [
    '.smz-tenant-switch-small .p-inputtext { padding: 0.5rem 0.75rem !important; }'
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
  <ng-container *ngIf="(isSuperuserLogged$ | async) === false">
    <div *ngIf="showTenantSwitch" class="h-full grid grid-nogutter items-center justify-center">
      <p-dropdown [options]="userAllowedTenants$ | async" styleClass="smz-tenant-switch-small" optionLabel="alias" dataKey="name" appendTo="body" [(ngModel)]="selected" (onChange)="onSelectorChange($event.value)"></p-dropdown>
    </div>
  </ng-container>
  `,
})
export class SmzTenantSwitchComponent implements OnInit {
  public showTenantSwitch = GlobalInjector.config.rbkUtils.authentication.allowTenantSwitching;
  public selected: TenantDetails;
  @Select(TenantsSelectors.userAllowedTenants) public userAllowedTenants$: Observable<TenantDetails[]>;
  @Select(AuthenticationSelectors.isSuperuserLogged) public isSuperuserLogged$: Observable<boolean>;

  public ngOnInit(): void {
    this.updateSelectionWithCurrentTenant();
  }

  constructor(private store: Store) {}
  public onSelectorChange(tenant: TenantDetails): void {

    const data: SwitchTenant = { tenant: tenant.name };

    this.store.dispatch(new AuthenticationActions.SwitchTenant(data));

    setTimeout(() => this.updateSelectionWithCurrentTenant(), 0);
  }

  private updateSelectionWithCurrentTenant(): void {
    this.selected = this.store.selectSnapshot(TenantsSelectors.currentTenant);
  }

}