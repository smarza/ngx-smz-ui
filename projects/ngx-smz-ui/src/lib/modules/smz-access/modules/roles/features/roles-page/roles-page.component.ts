import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
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

@UntilDestroy()
@Component({
  selector: 'app-roles-page',
  templateUrl: 'roles-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesPageComponent implements OnInit {
  @Select(RolesSelectors.all) public roles$: Observable<RolesDetails[]>;
  public tableState: SmzTableState = this.buildTableState();
  constructor(private store: Store, private dialogs: SmzDialogsService) { }

  public ngOnInit(): void {
  }

  public buildTableState(): SmzTableState {

    return new SmzTableBuilder()
      .setTitle('Gerenciar Regras de Acesso')
      .enableClearFilters()
      .enableGlobalFilter()
      .useStrippedStyle()
      .useTableEmptyMessage()
      .setSize('regular')
      .menu()
        .item('Editar Regra')
          .setCallback((role: RolesDetails) => this.dialogs.open(UpdateRoleDialog(role)))
          .menu
        .item('Editar Permissões')
          .setCallback((role: RolesDetails) => this.dialogs.open(UpdateRoleClaimsDialog(role)))
          .menu
        .separator()
        .item('Excluir', 'fa-solid fa-trash')
          .setCallback((role: RolesDetails) => this.showDeleteConfirmation(role))
          .menu
        .table
      .columns()
        .text('name', 'Permissão')
          .columns
        .custom('claims', 'Regras de Acesso')
          .columns
        .table
      .build();
  }

  @Confirmable('Tem certeza de que deseja excluir essa regra de acesso ?', 'Atenção', true)
  public showDeleteConfirmation(role: RolesDetails): void {
    this.store.dispatch(new RolesActions.Delete(role.id));
  }

  public showCreationDialog(): void {
    this.dialogs.open(CreateRoleDialog());
  }

}