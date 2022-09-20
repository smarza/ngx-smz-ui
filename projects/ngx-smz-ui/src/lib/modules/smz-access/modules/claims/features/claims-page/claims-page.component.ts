import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { SmzTableState } from '../../../../../smz-tables/models/table-state';
import { ClaimDetails } from '../../../../models/claim-details';
import { ClaimsSelectors } from '../../../../state/claims/claims.selectors';
import { SmzDialogsService } from '../../../../../smz-dialogs/services/smz-dialogs.service';
import { SmzTableBuilder } from '../../../../../../builders/smz-tables/state-builder';
import { UpdateClaimDialog } from '../../functions/update-claim-dialog';
import { Confirmable } from '../../../../../smz-dialogs/decorators/confirmable.decorator';
import { ClaimsActions } from '../../../../state/claims/claims.actions';
import { CreateClaimDialog } from '../../functions/create-claim-dialog';
import { AuthenticationSelectors } from '../../../../../../state/global/authentication/authentication.selectors';
import { AuthClaimDefinitions } from '../../../../models/auth-claim-definitions';

@UntilDestroy()
@Component({
  selector: 'app-claims-page',
  templateUrl: 'claims-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimsPageComponent implements OnInit {
  public claims$: Observable<ClaimDetails[]>;
  public tableState: SmzTableState = this.buildTableState();
  constructor(private store: Store, private dialogs: SmzDialogsService) {
    const canOverideClaimProtection = this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(AuthClaimDefinitions.CAN_OVERRIDE_CLAIM_PROTECTION)) as boolean;
    this.claims$ = this.store.select(canOverideClaimProtection ? ClaimsSelectors.all : ClaimsSelectors.allUnprotected);
  }

  public ngOnInit(): void {
  }

  public buildTableState(): SmzTableState {
    const canOverideClaimProtection = this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(AuthClaimDefinitions.CAN_OVERRIDE_CLAIM_PROTECTION)) as boolean;

    return new SmzTableBuilder()
      .setTitle('Gerenciar Permissões de Acesso')
      .enableClearFilters()
      .enableGlobalFilter()
      .useStrippedStyle()
      .setSize('regular')
      .menu()
        .item('Editar')
          .setCallback((claim: ClaimDetails) => this.dialogs.open(UpdateClaimDialog(claim)))
          .menu
        .item('Proteger', 'fa-solid fa-lock text-red-500')
          .setVisibilityRule((claim: ClaimDetails): boolean => (!claim.isProtected && canOverideClaimProtection))
          .setCallback((claim: ClaimDetails) => this.store.dispatch(new ClaimsActions.Protect({id: claim.id})))
          .menu
        .item('Desproteger', 'fa-solid fa-lock-open text-green-500')
          .setVisibilityRule((claim: ClaimDetails): boolean => (claim.isProtected && canOverideClaimProtection))
          .setCallback((claim: ClaimDetails) => this.store.dispatch(new ClaimsActions.Unprotect({id: claim.id})))
          .menu
        .separator()
        .item('Excluir', 'fa-solid fa-trash')
          .setActivationRule((claim: ClaimDetails) => claim.isProtected)
          .setCallback((claim: ClaimDetails) => this.showDeleteConfirmation(claim))
          .menu
        .table
      .columns()
        .text('description', 'Descrição')
          .columns
        .text('name', 'Chave')
          .columns
        .icon('isProtected', 'Proteção')
          .addIconConfiguration('fa-solid fa-lock text-red-500 text-lg', true)
          .addIconConfiguration('fa-solid fa-lock-open text-green-500 text-lg', false)
          .columns
        .table
      .build();
  }

  @Confirmable('Tem certeza de que deseja excluir essa permissão de acesso ?', 'Atenção', true)
  public showDeleteConfirmation(claim: ClaimDetails): void {
    this.store.dispatch(new ClaimsActions.Delete(claim.id));
  }

  public showCreationDialog(): void {
    this.dialogs.open(CreateClaimDialog());
  }

}