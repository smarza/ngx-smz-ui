import { Component, Input, EventEmitter, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { UsersSelectors } from '../../../../state/users/users.selectors';
import { SmzDialogsService } from '../../../../../smz-dialogs/services/smz-dialogs.service';
import { SimpleNamedEntity } from '../../../../../../common/models/simple-named-entity';
import { ClaimOverride } from '../../../../models/claim-override';
import { UserDetails } from '../../../../models/user-details';
import { SmzDialogBuilder } from '../../../../../../builders/smz-dialogs/dialog-builder';
import { AddClaimsOverride } from '../../../../models/add-claims-override';
import { ClaimsSelectors } from '../../../../state/claims/claims.selectors';
import { ClaimDetails } from '../../../../models/claim-details';
import { UsersActions } from '../../../../state/users/users.actions';

@UntilDestroy()
@Component({
  selector: 'app-user-claims',
  templateUrl: './user-claims.component.html',
  styleUrls: ['./user-claims.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserClaimsComponent implements OnInit {
  @Input() public username: string;
  @Output() public desassociateClaim = new EventEmitter<ClaimOverride[]>();
  public claims: ClaimDetails[];
  public targetClaims: ClaimOverride[] = [];
  public user: UserDetails;

  constructor(private store: Store, private dialogs: SmzDialogsService) {
  }

  public ngOnInit(): void {

    this.store
      .select(UsersSelectors.single(this.username))
      .pipe(
        untilDestroyed(this),
      )
      .subscribe(user => {
          this.user = user;
          this.refreshViewData();
        }
      );

  }

  public addItemToTarget(event: { items: SimpleNamedEntity[] }): void {
    this.dialogs.open(new SmzDialogBuilder()
        .setTitle('Nível de Acesso')
        .setLayout('MEDIUM', 'col-4')
        .setLayout('EXTRA_SMALL', 'col-12')
        .message('Que tipo de acesso deseja dar para o claim(s) escolhido(s) ?')
        .buttons()
          .confirm('Permitir')
            .callback((): void => {
              const data: AddClaimsOverride = { username: this.username, claimIds: event.items.map(x => x.id), accessType: 1 };
              this.store.dispatch(new UsersActions.AddClaimsOverride(data));
            })
          .buttons
          .cancel('Bloquear')
          .callback((): void => {
              const data: AddClaimsOverride = { username: this.username, claimIds: event.items.map(x => x.id), accessType: 0 };
              this.store.dispatch(new UsersActions.AddClaimsOverride(data));
            })
            .setClass('p-button-danger')
          .buttons
          .close()
            .callback((): void => { this.refreshViewData() })
          .buttons
        .dialog
      .build());
  }

  public addItemToSource(event: { items: ClaimOverride[] }): void {
    this.desassociateClaim.emit(event.items);
  }

  public refreshViewData(): void {

    this.targetClaims = [...this.user.overridedClaims];

    const claims = this.store.selectSnapshot(ClaimsSelectors.all);

    this.claims = claims.filter(claim => {
      return this.user.claims.findIndex(u => u.id === claim.id) !== -1 ? false : true;
    });
  }
}
