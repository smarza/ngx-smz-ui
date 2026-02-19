
import { AuthenticationSelectors, GlobalInjector, SmzDialogBuilder, SmzDialogsService } from '@ngx-smz/core';
import { Store } from '@ngxs/store';
import { AnnualPlanningListItem } from '@models/annual-planning-list-item';
import { AnnualPlanningsActions } from '@state/database/annual-plannings/annual-plannings.actions';
import { AnnualPlanningPrivacyValues } from '@models/annual-planning-privacy';
import { ClaimDefinitions } from '@models/claim-definitions';
import { UpdateAnnualPlanning } from '@models/update-annual-planning';

export function showAnnualPlanningUpdateDialog(annualPlanning: AnnualPlanningListItem): void {

  const dialogs: SmzDialogsService = GlobalInjector.instance.get(SmzDialogsService);
  const store: Store = GlobalInjector.instance.get(Store);

  const isAdmin: boolean = store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(ClaimDefinitions.MANAGE_USERS));

  interface UpdateResponse { description: string; privacyId: number; }

  dialogs.open(new SmzDialogBuilder()
    .setTitle('Editar Planejamento Anual')
    .form()
      .group()
        // Inputs para seleção de privacidade
        .radioGroup('privacy', 'Privacidade', AnnualPlanningPrivacyValues, annualPlanning.privacy)
          .hide(isAdmin)
          .validators().required().input
          .group
        .text('description', 'Descrição', annualPlanning.description)
          .validators().required().input
          .group
        .form
      .dialog
    .buttons()
      .confirm()
        .callback((x: UpdateResponse) => {
          const payload: UpdateAnnualPlanning = {
            description: x.description,
            privacy: x.privacyId,
            annualPlanningId: annualPlanning.id
          };
          store.dispatch(new AnnualPlanningsActions.Update(payload));
        })
        .buttons
      .ok()
        .hide()
        .buttons
      .dialog
    .build()
  );
}