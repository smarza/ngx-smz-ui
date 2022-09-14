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

@UntilDestroy()
@Component({
  selector: 'app-claims-page',
  templateUrl: 'claims-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimsPageComponent implements OnInit {
  @Select(ClaimsSelectors.all) public claims$: Observable<ClaimDetails[]>;
  public tableState: SmzTableState = this.buildTableState();
  constructor(private store: Store, private dialogs: SmzDialogsService) { }

  public ngOnInit(): void {
  }

  public buildTableState(): SmzTableState {

    return new SmzTableBuilder()
      .setTitle('Gerenciamento de Acessos')
      .enableClearFilters()
      .enableGlobalFilter()
      .useStrippedStyle()
      .setSize('regular')
      .menu()
        .item('Editar')
          .setCallback((claim: ClaimDetails) => this.dialogs.open(UpdateClaimDialog(claim)))
          .menu
        .separator()
        .item('Excluir', 'fa-solid fa-trash')
          .setCallback((claim: ClaimDetails) => this.showDeleteConfirmation(claim))
          .menu
        .table
      .columns()
        .text('description', 'Descrição')
          .columns
        .text('name', 'Chave')
          .columns
        .table
      .build();
  }

  @Confirmable('Tem certeza de que deseja excluir esse acesso ?', 'Atenção', true)
  public showDeleteConfirmation(claim: ClaimDetails): void {
    this.store.dispatch(new ClaimsActions.Delete(claim.id));
  }

  public showCreationDialog(): void {
    this.dialogs.open(CreateClaimDialog());
  }

}