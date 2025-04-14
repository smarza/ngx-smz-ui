import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SmzTableState } from '../../../../../smz-tables/models/table-state';
import { TenantDetails } from '../../../../models/tenant-details';
import { TenantsSelectors } from '../../../../state/tenants/tenants.selectors';
import { SmzDialogsService } from '../../../../../smz-dialogs/services/smz-dialogs.service';
import { SmzTableBuilder } from '../../../../../../builders/smz-tables/state-builder';
import { showUpdateTenantDialog } from '../../functions/update-tenant-dialog';
import { TenantsActions } from '../../../../state/tenants/tenants.actions';
import { showCreateTenantDialog } from '../../functions/create-tenant-dialog';
import { nameof } from '../../../../../../common/models/simple-named-entity';
import { GlobalInjector } from '../../../../../../common/services/global-injector';

@Component({
    selector: 'app-tenants-page',
    templateUrl: 'tenants-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TenantsPageComponent implements OnInit {
  public tenants$ = inject(Store).select(TenantsSelectors.all);
  public tableState: SmzTableState = this.buildTableState();
  constructor(private store: Store, private dialogs: SmzDialogsService) {
  }

  public ngOnInit(): void {
  }

  public buildTableState(): SmzTableState {
    const displayName = GlobalInjector.config.locale.authorization.tenant.displayName;
    return new SmzTableBuilder<TenantDetails>()
      .setTitle(`Gerenciar ${displayName}s`)
      .enableClearFilters()
      .enableGlobalFilter()
      .useStrippedStyle()
      .setSize('regular')
      .menu()
        .item('Renomear')
          .setCallback((tenant: TenantDetails) => showUpdateTenantDialog(tenant))
          .menu
        .separator()
        .item('Excluir', 'fa-solid fa-trash')
          .askForCriticalConfirmation('Atenção', `Tem certeza de que deseja excluir essa ${displayName} ?`)
          .setCallback((tenant: TenantDetails) => this.store.dispatch(new TenantsActions.Delete(tenant.alias)))
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

  public showCreationDialog(): void {
    showCreateTenantDialog();
  }

}