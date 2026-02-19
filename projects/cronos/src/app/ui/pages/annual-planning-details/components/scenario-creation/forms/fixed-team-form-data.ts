import { nameof, SmzForm, SmzFormBuilder } from '@ngx-smz/core';
import { FixedTeamData } from '@models/fixed-team-data';
import { ModelConstants } from '@models/model-constants';

export function getFixedTeamFormData(): SmzForm<FixedTeamData> {

  return new SmzFormBuilder<FixedTeamData>()
    .group()
      .setLayout('EXTRA_LARGE', 'col-12')
      .setLayout('LARGE', 'col-12')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
    .text(nameof<FixedTeamData>('name'), 'Nome da Equipe')
        .setLayout('EXTRA_LARGE', 'col-12')
        .setLayout('LARGE', 'col-12')
        .setLayout('MEDIUM', 'col-12')
        .setLayout('SMALL', 'col-12')
        .validators()
          .length(ModelConstants.shortName.minLength, ModelConstants.shortName.maxLength)
          .required().input
        .group
      .number(nameof<FixedTeamData>('painters'), 'Pintores')
        .setLayout('EXTRA_LARGE', 'col-12')
        .setLayout('LARGE', 'col-12')
        .setLayout('MEDIUM', 'col-12')
        .setLayout('SMALL', 'col-12')
        .validators().required().input
        .group
      .number(nameof<FixedTeamData>('days'), 'Dias')
        .setLayout('EXTRA_LARGE', 'col-12')
        .setLayout('LARGE', 'col-12')
        .setLayout('MEDIUM', 'col-12')
        .setLayout('SMALL', 'col-12')
        .validators()
          .range(ModelConstants.duration.minLength, ModelConstants.duration.maxLength)
          .required().input
        .group
      .number(nameof<FixedTeamData>('availability'), 'Disponibilidade Diária por Pintor (horas)')
        .setLayout('EXTRA_LARGE', 'col-12')
        .setLayout('LARGE', 'col-12')
        .setLayout('MEDIUM', 'col-12')
        .setLayout('SMALL', 'col-12')
        .setFraction(1,2)
        .validators().required().input
        .group
      .number(nameof<FixedTeamData>('hidroblastLocationsQuantity'), 'Centros de Hidrojatos', 1)
        .setLayout('EXTRA_LARGE', 'col-6')
        .setLayout('LARGE', 'col-6')
        .setLayout('MEDIUM', 'col-12')
        .setLayout('SMALL', 'col-12')
        .validators()
          .range(ModelConstants.hidroblastQuantity.minLength, ModelConstants.hidroblastQuantity.maxLength)
          .required()
          .input
        .group
      .form
    .build();
}
