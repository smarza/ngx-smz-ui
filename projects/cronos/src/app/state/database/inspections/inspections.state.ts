import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { InspectionsActions } from './inspections.actions';
import { GiantsService } from '@services/api/giants.service';
import { Inspection } from '@models/inspection';

export const INSPECTIONS_STATE_NAME = 'inspections';

export interface InspectionsStateModel {
  items: Inspection[];
  lastUpdated?: Date;
}

@State<InspectionsStateModel>({
  name: INSPECTIONS_STATE_NAME,
  defaults: {
    items: [],
    lastUpdated: null
  }
})

@Injectable()
export class InspectionsState {
  constructor(private readonly apiService: GiantsService) { }


  @Action(InspectionsActions.LoadAll)
  public loadAll$(ctx: StateContext<InspectionsStateModel>): Observable<Inspection[]> {
    return this.apiService.getAllTopsideInspectionsAsync().pipe(
      tap((result: Inspection[]) => {
        ctx.patchState({
          lastUpdated: new Date(),
          items: result,
        });
      })
    );
  }

  @Action(InspectionsActions.Clear)
  public clear(ctx: StateContext<InspectionsStateModel>): void {
    ctx.patchState({
      items: [],
      lastUpdated: null
    });
  }
}
