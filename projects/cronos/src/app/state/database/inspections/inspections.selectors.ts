import { createSelector, Selector } from '@ngxs/store';
import { InspectionsState, InspectionsStateModel } from './inspections.state';
import { SimpleNamedEntity, SimpleParentEntity } from '@ngx-smz/core';
import { Inspection } from '@models/inspection';
import { ObjectUtils } from 'primeng/utils';
import groupBy from 'lodash-es/groupBy';
import mapValues from 'lodash-es/mapValues';
import { cloneDeep } from 'lodash-es';

export class InspectionsSelectors {
  @Selector([InspectionsState])
  public static all(state: InspectionsStateModel): Inspection[] {
    return state.items;
  }

  public static single(id: string): (state: InspectionsStateModel) => Inspection {
    return createSelector([InspectionsState], (state: InspectionsStateModel) => id == null ? null : state.items.find(x => x.id === id));
  }

  @Selector([InspectionsState])
  public static allPlants(state: InspectionsStateModel): SimpleNamedEntity[] {
    const plants = state.items.map(x => x.plant);
    return removeDuplicates(plants, plant => plant.id);
  }

  @Selector([InspectionsState])
  public static yearsByPlant(state: InspectionsStateModel): SimpleParentEntity<string>[] {
    const years = state.items.map(x =>({ parentId: x.plant.id, id: `${x.plant.id}${x.year}`, name: x.year.toString()}));
    const filteredYears = removeDuplicates(years, year => year.id);
    return groupSimpleParentEntity(filteredYears);
  }

  @Selector([InspectionsState])
  public static inspectionsByYear(state: InspectionsStateModel): SimpleParentEntity<string>[] {
    const inspections = state.items.map(x =>({ parentId: `${x.plant.id}${x.year}`, id: x.id, name: x.name}));
    return groupSimpleParentEntity(inspections);
  }
}

function removeDuplicates<T, K>(arr: T[], keySelector: (x: T) => K): T[] {
  return Array.from(new Map(arr.map(item => [keySelector(item), item])).values());
}

function groupSimpleParentEntity<TInput extends { parentId: TResponse, id: string, name: string }, TResponse>(items: TInput[]): SimpleParentEntity<TResponse>[] {

  const keyPropertyValue = 'parentId';
  const result: SimpleParentEntity<TResponse>[] = [];

  const grouped = groupBy(items, (i) => (ObjectUtils.resolveFieldData(i, keyPropertyValue)));

  mapValues(grouped, uniques => {
    const unique = cloneDeep(uniques[0]);

    const item: SimpleParentEntity<TResponse> = {
      parentId: unique.parentId,
      data: uniques.map(x => ({ id: x.id as TResponse, name: x.name }))
    };

    result.push(item);
  });

  return result;
}