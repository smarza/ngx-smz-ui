import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { SmzTableState } from '../../../../../smz-tables/models/table-state';
import { TenantDetails } from '../../../../models/tenant-details';
import { TenantsSelectors } from '../../../../state/tenants/tenants.selectors';
import { SmzDialogsService } from '../../../../../smz-dialogs/services/smz-dialogs.service';
import { SmzTableBuilder } from '../../../../../../builders/smz-tables/state-builder';
import { UpdateTenantDialog } from '../../functions/update-tenant-dialog';
import { Confirmable } from '../../../../../smz-dialogs/decorators/confirmable.decorator';
import { TenantsActions } from '../../../../state/tenants/tenants.actions';
import { CreateTenantDialog } from '../../functions/create-tenant-dialog';
import { AuthenticationSelectors } from '../../../../../../state/global/authentication/authentication.selectors';
import { AuthClaimDefinitions } from '../../../../models/auth-claim-definitions';
import { nameof } from '../../../../../../common/models/simple-named-entity';

@UntilDestroy()
@Component({
  selector: 'app-tenants-page',
  templateUrl: 'tenants-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantsPageComponent implements OnInit {
  @Select(TenantsSelectors.all) public tenants$: Observable<TenantDetails[]>;
  public tableState: SmzTableState = this.buildTableState();
  constructor(private store: Store, private dialogs: SmzDialogsService) {
  }

  public ngOnInit(): void {
  }

  public buildTableState(): SmzTableState {
    const canOverideTenantProtection = this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(AuthClaimDefinitions.CHANGE_CLAIM_PROTECTION)) as boolean;

    return new SmzTableBuilder()
      .setTitle('Gerenciar Tenants')
      .enableClearFilters()
      .enableGlobalFilter()
      .useStrippedStyle()
      .setSize('regular')
      .menu()
        .item('Renomear')
          .setCallback((tenant: TenantDetails) => this.dialogs.open(UpdateTenantDialog(tenant)))
          .menu
        .separator()
        .item('Excluir', 'fa-solid fa-trash')
          .setCallback((tenant: TenantDetails) => this.showDeleteConfirmation(tenant))
          .menu
        .table
      .columns()
        .text(nameof<TenantDetails>('alias'), 'Identificador')
          .columns
        .text(nameof<TenantDetails>('name'), 'Nome')
          .columns
        .table
      .build();
  }

  @Confirmable('Tem certeza de que deseja excluir essa tenant ?', 'Atenção', true)
  public showDeleteConfirmation(tenant: TenantDetails): void {
    this.store.dispatch(new TenantsActions.Delete(tenant.alias));
  }

  public showCreationDialog(): void {
    this.dialogs.open(CreateTenantDialog());
  }

}