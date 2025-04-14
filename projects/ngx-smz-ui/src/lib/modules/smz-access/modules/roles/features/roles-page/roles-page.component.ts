import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RolesDetails } from '../../../../models/roles-details';
import { RolesSelectors } from '../../../../state/roles/roles.selectors';
import { SmzTableState } from '../../../../../smz-tables/models/table-state';
import { SmzDialogsService } from '../../../../../smz-dialogs/services/smz-dialogs.service';
import { SmzTableBuilder } from '../../../../../../builders/smz-tables/state-builder';
import { UpdateRoleDialog } from '../../functions/update-role-dialog';
import { UpdateRoleClaimsDialog } from '../../functions/update-role-claims-dialog';
import { Confirmable } from '../../../../../smz-dialogs/decorators/confirmable.decorator';
import { RolesActions } from '../../../../state/roles/roles.actions';
import { CreateRoleDialog } from '../../functions/create-role-dialog';
import { nameof } from '../../../../../../common/models/simple-named-entity';
import { showRoleClaimsDialog } from '../../functions/show-role-claims-dialog';
import { RoleSourceDescription } from '../../../../models/role-source';
import { RoleModeDescription } from '../../../../models/role-mode';
import { AuthClaimDefinitions } from '../../../../models/auth-claim-definitions';
import { GlobalInjector } from '../../../../../../common/services/global-injector';

@Component({
    selector: 'app-roles-page',
    templateUrl: 'roles-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class RolesPageComponent implements OnInit {
  public roles$ = inject(Store).select(RolesSelectors.all);
  public tableState: SmzTableState = this.buildTableState();
  public canCreateClaims = [AuthClaimDefinitions.MANAGE_APPLICATION_WIDE_ROLES, AuthClaimDefinitions.MANAGE_TENANT_SPECIFIC_ROLES]
  constructor(private store: Store, private dialogs: SmzDialogsService) { }

  public ngOnInit(): void {
  }

  public buildTableState(): SmzTableState {
    const validationSelectors = GlobalInjector.config.rbkUtils.authorization.validationSelectors;

    return new SmzTableBuilder<RolesDetails>()
      .setTitle('Gerenciar Perfis')
      .enableClearFilters()
      .enableGlobalFilter()
      .useStrippedStyle()
      .disableRowHoverEffect()
      .useTableEmptyMessage()
      .setSize('regular')
      .menu()
        .item('Renomear')
          .setActivationRule(() => !this.store.selectSnapshot(validationSelectors.hasAnyOfClaimAccess(this.canCreateClaims)))
          .setCallback((role: RolesDetails) => this.dialogs.open(UpdateRoleDialog(role)))
          .menu
        .item('Permissões')
          .setActivationRule(() => !this.store.selectSnapshot(validationSelectors.hasAnyOfClaimAccess(this.canCreateClaims)))
          .setCallback((role: RolesDetails) => this.dialogs.open(UpdateRoleClaimsDialog(role)))
          .menu
        .separator()
        .item('Excluir', 'fa-solid fa-trash')
          .setActivationRule(() => !this.store.selectSnapshot(validationSelectors.hasAnyOfClaimAccess(this.canCreateClaims)))
          .setCallback((role: RolesDetails) => this.showDeleteConfirmation(role))
          .menu
        .table
      .columns()
        .text(nameof<RolesDetails>('name'), 'Nome do Perfil')
          .addStyles('font-bold')
          .columns
        .custom(nameof<RolesDetails>('claims'), 'Permissões')
          .columns
        .dataTransform(nameof<RolesDetails>('mode'), 'Modo', (mode: number) => RoleModeDescription[mode as keyof typeof RoleModeDescription], '12em')
          .columns
        .dataTransform(nameof<RolesDetails>('source'), 'Fonte', (source: number) => RoleSourceDescription[source as keyof typeof RoleSourceDescription], '12em')
          .columns
        .table
      .build();
  }

  public onShowRoleClaimsDialog(item: RolesDetails): void {
    showRoleClaimsDialog(item);
  }

  @Confirmable('Tem certeza de que deseja excluir esse perfil ?', 'Atenção', true)
  public showDeleteConfirmation(role: RolesDetails): void {
    this.store.dispatch(new RolesActions.Delete(role.id));
  }

  public showCreationDialog(): void {
    this.dialogs.open(CreateRoleDialog());
  }

}