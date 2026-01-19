import { nameof, SmzForm, SmzFormBuilder } from '@ngx-smz/core';
import { ModelConstants } from '@models/model-constants';
import { FixedTeamData } from '@models/fixed-team-data';
import { Team } from '@models/team';

export function getDefaultFixedTeamForm(): SmzForm<FixedTeamData> {

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
      .number(nameof<FixedTeamData>('hidroblastLocationsQuantity'), 'Centros de Hidrojatos')
        .setLayout('EXTRA_LARGE', 'col-6')
        .setLayout('LARGE', 'col-6')
        .setLayout('MEDIUM', 'col-12')
        .setLayout('SMALL', 'col-12')
        .validators()
          .range(ModelConstants.hidroblastQuantity.minLength, ModelConstants.hidroblastQuantity.maxLength)
          .required().input
        .group
      .form
    .build();
}

export function getFixedTeamFormWithData(team: Team, isEditing: boolean): SmzForm<FixedTeamData> {

  return new SmzFormBuilder<FixedTeamData>()
    .group()
      .setLayout('EXTRA_LARGE', 'col-12')
      .setLayout('LARGE', 'col-12')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .text(nameof<FixedTeamData>('name'), 'Nome da Equipe', team.name)
        .setLayout('EXTRA_LARGE', 'col-12')
        .setLayout('LARGE', 'col-12')
        .setLayout('MEDIUM', 'col-12')
        .setLayout('SMALL', 'col-12')
        .disable(!isEditing)
        .validators()
          .length(ModelConstants.shortName.minLength, ModelConstants.shortName.maxLength)
          .required().input
        .group
      .number(nameof<FixedTeamData>('painters'), 'Pintores', team.maxPainters)
        .setLayout('EXTRA_LARGE', 'col-12')
        .setLayout('LARGE', 'col-12')
        .setLayout('MEDIUM', 'col-12')
        .setLayout('SMALL', 'col-12')
        .disable(!isEditing)
        .validators().required().input
        .group
      .number(nameof<FixedTeamData>('days'), 'Dias', team.maxDays)
        .setLayout('EXTRA_LARGE', 'col-12')
        .setLayout('LARGE', 'col-12')
        .setLayout('MEDIUM', 'col-12')
        .setLayout('SMALL', 'col-12')
        .disable(!isEditing)
        .validators()
          .range(ModelConstants.duration.minLength, ModelConstants.duration.maxLength)
          .required().input
        .group
      .number(nameof<FixedTeamData>('availability'), 'Disponibilidade Diária por Pintor (horas)', team.maxAvailability)
        .setLayout('EXTRA_LARGE', 'col-12')
        .setLayout('LARGE', 'col-12')
        .setLayout('MEDIUM', 'col-12')
        .setLayout('SMALL', 'col-12')
        .setFraction(1,2)
        .disable(!isEditing)
        .validators().required().input
        .group
      .number(nameof<FixedTeamData>('hidroblastLocationsQuantity'), 'Centros de Hidrojatos', team.hidroblastLocationsQuantity ?? 1)
        .setLayout('EXTRA_LARGE', 'col-6')
        .setLayout('LARGE', 'col-6')
        .setLayout('MEDIUM', 'col-12')
        .setLayout('SMALL', 'col-12')
        .disable(!isEditing)
        .validators()
          .range(ModelConstants.hidroblastQuantity.minLength, ModelConstants.hidroblastQuantity.maxLength)
          .required().input
        .group
      .form
    .build();
}
