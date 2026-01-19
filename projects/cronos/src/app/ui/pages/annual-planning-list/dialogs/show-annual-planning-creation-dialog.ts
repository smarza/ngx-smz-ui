
import { GlobalInjector, nameof, SimpleEntity, SmzDialogBuilder, SmzDialogsService } from '@ngx-smz/core';
import { Store } from '@ngxs/store';
import { AnnualPlanningsActions } from '@state/database/annual-plannings/annual-plannings.actions';
import { InspectionsSelectors } from '@state/database/inspections/inspections.selectors';
import { AnnualPlanningPrivacy, AnnualPlanningPrivacyValues } from '@models/annual-planning-privacy';
import { CreateAnnualPlanningFromGiants } from '@models/create-annual-planning-from-giants';
import { CreateAnnualPlanningFromSpreadsheet } from '@models/create-annual-planning-from-spreadsheet';
import { AnnualPlanningsSelectors } from '@state/database/annual-plannings/annual-plannings.selectors';
import { showInspectionSpreadsheetErrorsDialog } from './show-inspection-spreadsheet-errors-dialog';
import { DefaultCorrosionStandard, DefaultCorrosionStandardValues } from '@models/default-corrosion-standard';

export function showAnnualPlanningCreationDialog(): void {

  const dialogs: SmzDialogsService = GlobalInjector.instance.get(SmzDialogsService);
  const store: Store = GlobalInjector.instance.get(Store);

  const plants = store.selectSnapshot(InspectionsSelectors.allPlants);

  const years = store.selectSnapshot(InspectionsSelectors.yearsByPlant);

  const inspections = store.selectSnapshot(InspectionsSelectors.inspectionsByYear);
  const startDate = new Date('2026-01-01T00:00:00.000Z');
  const fixedStartDate = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());

  const dataBehavior: SimpleEntity<string>[] = [
    { id: 'giants', name: 'Via Giants' },
    { id: 'spreadsheet', name: 'Via Upload de Planilha' },
  ];

  dialogs.open(new SmzDialogBuilder<CreateAnnualPlanningFormResponse>()
  .setTitle('Criar Planejamento Anual')
  .closeOnEscape()
  .form()
    .group()
      // Inputs para seleção de privacidade
      .radioGroup(nameof<CreateAnnualPlanningFormInputs>('privacy'), 'Privacidade', AnnualPlanningPrivacyValues, AnnualPlanningPrivacy.PRIVATE)
        .validators()
          .required()
          .withWarning((values: CreateAnnualPlanningFormResponse) => {
            console.log(values);
            const warning = values.privacyId === AnnualPlanningPrivacy.PRIVATE ? 'Atenção, o planejamento anual será privado e não poderá ser alterado.' : null;
            console.log('######## ', warning);
            return warning;
          })
          .input
        .group
      .calendar('startDate', 'Data de Início', fixedStartDate)
        .group
      // Inputs para descrição
      .text(nameof<CreateAnnualPlanningFormInputs>('description'), 'Descrição')
        .validators().required().input
        .group
      // Inputs para upload de planilha de RTI
      .file(nameof<CreateAnnualPlanningFormInputs>('rtiSpreadsheetData'), 'Planilha com os dados da RTI')
        .acceptXlsx()
        .maxDisplayName(40)
        .group
      // Inputs para seleção do método de carregamento dos dados da inspeção
      .radioGroup(nameof<CreateAnnualPlanningFormInputs>('inspectionDataLoadBehavior'), 'Método de carregamento dos dados da inspeção', dataBehavior, 'giants')
        .validators().required().input
        .group
      // Inputs para upload de planilha de inspeção
      .dropdown(nameof<CreateAnnualPlanningFormInputs>('standard'), 'Norma de Corrosão', DefaultCorrosionStandardValues)
        .setLayout('EXTRA_LARGE', 'col-2')
        .setLayout('LARGE', 'col-2')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('SMALL', 'col-6')
        .setVisibilityCondition('inspectionDataLoadBehavior', false, ['spreadsheet'])
        .validators().required().input
        .group
      .file(nameof<CreateAnnualPlanningFormInputs>('inspectionSpreadsheetData'), 'Planilha com os dados da inspeção')
        .setVisibilityCondition('inspectionDataLoadBehavior', false, ['spreadsheet'])
        .validators().required().input
        .acceptXlsx()
        .maxDisplayName(40)
        .group
      // Inputs para seleção de inspeção do Giants
      .dropdown('plants', 'Planta', plants)
        .setLayout('EXTRA_LARGE', 'col-2')
        .setLayout('LARGE', 'col-2')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('SMALL', 'col-6')
        .setVisibilityCondition('inspectionDataLoadBehavior', true, ['spreadsheet'])
        .validators().required().input
        .group
      .linkedDropdown('years', 'plants', 'Ano', years)
        .setLayout('EXTRA_LARGE', 'col-2')
        .setLayout('LARGE', 'col-2')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('SMALL', 'col-6')
        .setVisibilityCondition('inspectionDataLoadBehavior', true, ['spreadsheet'])
        .validators().required().input
        .group
      .linkedDropdown(nameof<CreateAnnualPlanningFormInputs>('inspection'), 'years', 'Inspeção', inspections)
        .setLayout('EXTRA_LARGE', 'col-8')
        .setLayout('LARGE', 'col-8')
        .setVisibilityCondition('inspectionDataLoadBehavior', true, ['spreadsheet'])
        .validators().required().input
        .group
      .form
    .dialog
  .buttons()
    .confirm()
      .callback((response: CreateAnnualPlanningFormResponse) => {
        console.log('response', response);
        return;
        switch (response.inspectionDataLoadBehaviorId) {
        case 'giants':
          {
            const inspection = store.selectSnapshot(InspectionsSelectors.single(response.inspectionId));

            const payload: CreateAnnualPlanningFromGiants = {
              description: response.description,
              privacy: response.privacyId,
              giantsInspectionId: inspection.id,
              plantName: inspection.plant.name,
              inspectionYear: inspection.year,
              rtiSpreadsheetData: response.rtiSpreadsheetData,
            };

            store.dispatch(new AnnualPlanningsActions.CreateFromGiants(payload));
          }
          break;

        case 'spreadsheet':
          {
            const payload: CreateAnnualPlanningFromSpreadsheet = {
              description: response.description,
              privacy: response.privacyId,
              inspectionSpreadsheetData: response.inspectionSpreadsheetData,
              rtiSpreadsheetData: response.rtiSpreadsheetData,
              standard: response.standardId
            };

            store.dispatch(new AnnualPlanningsActions.CreateFromSpreadsheet(payload)).subscribe(() => {
              if (store.selectSnapshot(AnnualPlanningsSelectors.errors).length > 0) {
                showInspectionSpreadsheetErrorsDialog();
              }
            });
          }
          break;
        }
      })
      .buttons
    .ok()
      .hide()
      .buttons
    .dialog
  .build());
}

interface CreateAnnualPlanningFormInputs {
  privacy: AnnualPlanningPrivacy;
  description: string;
  inspection: string;
  inspectionDataLoadBehavior: string;
  inspectionSpreadsheetData: string;
  rtiSpreadsheetData: string;
  standard: DefaultCorrosionStandard;
}

interface CreateAnnualPlanningFormResponse {
  privacyId: AnnualPlanningPrivacy;
  description: string;
  inspectionId: string;
  inspectionDataLoadBehaviorId: 'giants' | 'spreadsheet';
  inspectionSpreadsheetData: string;
  rtiSpreadsheetData: string;
  standardId: DefaultCorrosionStandard;
}

