import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PlantsActions } from './plants.actions';
import { PlantsService } from '@services/api/plants.service';
import { Plant } from '@models/plant';

export const PLANTS_STATE_NAME = 'plants';

export interface PlantsStateModel {
  items: Plant[];
  lastUpdated?: Date;
}

@State<PlantsStateModel>({
  name: PLANTS_STATE_NAME,
  defaults: {
    items: [],
    lastUpdated: null
  }
})

@Injectable()
export class PlantsState {
  constructor(private readonly apiService: PlantsService) { }


  @Action(PlantsActions.LoadAll)
  public loadAll$(ctx: StateContext<PlantsStateModel>): Observable<Plant[]> {
    return this.apiService.allAsync().pipe(
      tap((result: Plant[]) => {
        ctx.patchState({
          lastUpdated: new Date(),
          items: result,
        });
      })
    );
  }

  @Action(PlantsActions.Clear)
  public clear(ctx: StateContext<PlantsStateModel>): void {
    ctx.patchState({
      items: [],
      lastUpdated: null
    });
  }
}
