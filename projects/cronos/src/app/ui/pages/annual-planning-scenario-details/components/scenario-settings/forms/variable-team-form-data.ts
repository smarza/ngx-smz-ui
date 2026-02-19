import { nameof, SmzForm, SmzFormBuilder } from '@ngx-smz/core';
import { ModelConstants } from '@models/model-constants';
import { VariableTeamData } from '@models/variable-team-data';
import { Team } from '@models/team';

export function getDefaultVariableTeamForm(): SmzForm<VariableTeamData> {

  return new SmzFormBuilder<VariableTeamData>()
  .group()
    .setLayout('EXTRA_LARGE', 'col-12')
    .setLayout('LARGE', 'col-12')
    .setLayout('MEDIUM', 'col-12')
    .setLayout('SMALL', 'col-12')
    .text(nameof<VariableTeamData>('name'), 'Nome da Equipe')
      .setLayout('EXTRA_LARGE', 'col-12')
      .setLayout('LARGE', 'col-12')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .validators()
        .length(ModelConstants.shortName.minLength, ModelConstants.shortName.maxLength)
        .required().input
      .group
    .number(nameof<VariableTeamData>('minPainters'), 'Mínimo de Pintores')
      .setLayout('EXTRA_LARGE', 'col-6')
      .setLayout('LARGE', 'col-6')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .validators().required().input
      .group
    .number(nameof<VariableTeamData>('maxPainters'), 'Máximo de Pintores')
      .setLayout('EXTRA_LARGE', 'col-6')
      .setLayout('LARGE', 'col-6')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .validators().required().input
      .group
    .number(nameof<VariableTeamData>('minDays'), 'Mínimo de Dias')
      .setLayout('EXTRA_LARGE', 'col-6')
      .setLayout('LARGE', 'col-6')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .validators()
        .range(ModelConstants.duration.minLength, ModelConstants.duration.maxLength)
        .required().input
      .group
    .number(nameof<VariableTeamData>('maxDays'), 'Máximo de Dias')
      .setLayout('EXTRA_LARGE', 'col-6')
      .setLayout('LARGE', 'col-6')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .validators()
        .range(ModelConstants.duration.minLength, ModelConstants.duration.maxLength)
        .required().input
      .group
    .number(nameof<VariableTeamData>('minAvailability'), 'Disponibilidade Diária Mínima por Pintor (horas)')
      .setLayout('EXTRA_LARGE', 'col-6')
      .setLayout('LARGE', 'col-6')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .setFraction(1,2)
      .validators().required().input
      .group
    .number(nameof<VariableTeamData>('maxAvailability'), 'Disponibilidade Diária Máxima por Pintor (horas)')
      .setLayout('EXTRA_LARGE', 'col-6')
      .setLayout('LARGE', 'col-6')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .setFraction(1,2)
      .validators().required().input
      .group
    .number(nameof<VariableTeamData>('hidroblastLocationsQuantity'), 'Centros de Hidrojatos')
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

export function getVariableTeamFormWithData(team: Team, isEditing: boolean): SmzForm<VariableTeamData> {

  return new SmzFormBuilder<VariableTeamData>()
  .group()
    .setLayout('EXTRA_LARGE', 'col-12')
    .setLayout('LARGE', 'col-12')
    .setLayout('MEDIUM', 'col-12')
    .setLayout('SMALL', 'col-12')
    .text(nameof<VariableTeamData>('name'), 'Nome da Equipe', team.name)
      .setLayout('EXTRA_LARGE', 'col-12')
      .setLayout('LARGE', 'col-12')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .disable(!isEditing)
      .validators()
        .length(ModelConstants.shortName.minLength, ModelConstants.shortName.maxLength)
        .required().input
      .group
    .number(nameof<VariableTeamData>('minPainters'), 'Mínimo de Pintores', team.minPainters)
      .setLayout('EXTRA_LARGE', 'col-6')
      .setLayout('LARGE', 'col-6')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .disable(!isEditing)
      .validators().required().input
      .group
    .number(nameof<VariableTeamData>('maxPainters'), 'Máximo de Pintores', team.maxPainters)
      .setLayout('EXTRA_LARGE', 'col-6')
      .setLayout('LARGE', 'col-6')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .disable(!isEditing)
      .validators().required().input
      .group
    .number(nameof<VariableTeamData>('minDays'), 'Mínimo de Dias', team.minDays)
      .setLayout('EXTRA_LARGE', 'col-6')
      .setLayout('LARGE', 'col-6')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .disable(!isEditing)
      .validators()
        .range(ModelConstants.duration.minLength, ModelConstants.duration.maxLength)
        .required().input
      .group
    .number(nameof<VariableTeamData>('maxDays'), 'Máximo de Dias', team.maxDays)
      .setLayout('EXTRA_LARGE', 'col-6')
      .setLayout('LARGE', 'col-6')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .disable(!isEditing)
      .validators()
        .range(ModelConstants.duration.minLength, ModelConstants.duration.maxLength)
        .required().input
      .group
    .number(nameof<VariableTeamData>('minAvailability'), 'Disponibilidade Diária Mínima por Pintor (horas)', team.minAvailability)
      .setLayout('EXTRA_LARGE', 'col-6')
      .setLayout('LARGE', 'col-6')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .disable(!isEditing)
      .setFraction(1,2)
      .validators().required().input
      .group
    .number(nameof<VariableTeamData>('maxAvailability'), 'Disponibilidade Diária Máxima por Pintor (horas)', team.maxAvailability)
      .setLayout('EXTRA_LARGE', 'col-6')
      .setLayout('LARGE', 'col-6')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .disable(!isEditing)
      .setFraction(1,2)
      .validators().required().input
      .group
    .number(nameof<VariableTeamData>('hidroblastLocationsQuantity'), 'Centros de Hidrojatos', team.hidroblastLocationsQuantity ?? 1)
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
