import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DemoFeatureActions } from './demo.actions';
import { cloneDeep } from 'lodash-es';
import { DemoItem } from '../../models/demo';
import { Observable, of, throwError } from 'rxjs';
import { DemoDataService } from './demo-data.service';
import { catchError, tap } from 'rxjs/operators';
import { removeElementFromArray, ToastActions } from 'ngx-smz-ui';
import { TreeNode } from 'primeng/api/treenode';
import { Navigate } from '@ngxs/router-plugin';
import { HOME_PATH } from '@routes';

export const DemoFeatureName = 'DemoFeature';

export interface DemoFeatureStateModel {
  lastUpdated: Date | null;
  items: DemoItem[];
  tree: TreeNode[];
  currentRouteKey: string;
}

export const getInitialState = (): DemoFeatureStateModel => ({
  lastUpdated: null,
  items: null,
  tree: null,
  currentRouteKey: null
});

@State<DemoFeatureStateModel>({
  name: DemoFeatureName,
  defaults: getInitialState()
})

@Injectable()
export class DemoFeatureState {
  constructor(private apiService: DemoDataService) {}

  @Action(DemoFeatureActions.LoadAll)
  public onLoad$(ctx: StateContext<DemoFeatureStateModel>): Observable<DemoItem[]> {
    return this.apiService.getAll().pipe(
      tap(results => {

        ctx.patchState({
          lastUpdated: new Date(),
          items: [...results,
            { name: 'Name A', company: 'ACME Inc', country: {name: 'Paris', id: '209de553-37ce-4293-9644-64436fde2b6e'}, id: '16a6064f-780f-4a29-a4cb-42f5d6fd7964', roles: [] },
            { name: 'Name B', company: 'ACME Inc', country: {name: 'Paris', id: '209de553-37ce-4293-9644-64436fde2b6e'}, id: '74992fc1-b2e3-4550-9c83-70bc7ebbd52a', roles: [] },
            { name: 'Name C', company: 'ACME Inc', country: {name: 'Paris', id: '209de553-37ce-4293-9644-64436fde2b6e'}, id: '5dcbb315-c0a6-44e8-8bb0-735fad05322d', roles: [] }
          ]
        });
      })
    );
  }

  @Action(DemoFeatureActions.LoadTree)
  public onLoadTree$(ctx: StateContext<DemoFeatureStateModel>): Observable<TreeNode[]> {
    return this.apiService.getTree().pipe(
      tap(results => {
        ctx.patchState({
          tree: results
        });
      })
    );
  }

  @Action(DemoFeatureActions.Create)
  public onCreate$(ctx: StateContext<DemoFeatureStateModel>, action: DemoFeatureActions.Create): Observable<DemoItem> {
    return this.apiService.create(action.data).pipe(
      tap(result => {
        ctx.dispatch(new DemoFeatureActions.CreateSuccess(result));
      })
    );
  }

  @Action(DemoFeatureActions.CreateSuccess)
  public onCreateSuccess$(ctx: StateContext<DemoFeatureStateModel>, action: DemoFeatureActions.CreateSuccess): void {
    const items = cloneDeep(ctx.getState().items);

    ctx.patchState({
      lastUpdated: new Date(),
      items: [action.data, ...items]
    });

    ctx.dispatch(new ToastActions.Success('Item criado com sucesso'));
  }

  @Action(DemoFeatureActions.Update)
  public onUpdate$(ctx: StateContext<DemoFeatureStateModel>, action: DemoFeatureActions.Update): Observable<DemoItem> {

    return this.apiService.update(action.data).pipe(
      tap(result => {

        const items = cloneDeep(ctx.getState().items);
        const itemIndex = items.findIndex(x => x.id == action.data.id);
        items[itemIndex] = { ...result };

        ctx.patchState({
          lastUpdated: new Date(),
          items: items
        });

        ctx.dispatch(new ToastActions.Success('Item atualizado com sucesso'));
      })
    );
  }

  @Action(DemoFeatureActions.Remove)
  public onRemove$(ctx: StateContext<DemoFeatureStateModel>, action: DemoFeatureActions.Remove): Observable<void> {
    return this.apiService.remove(action.id).pipe(
      tap(() => {

        const items = cloneDeep(ctx.getState().items);
        removeElementFromArray(items, action.id, 'id');

        ctx.patchState({
          lastUpdated: new Date(),
          items: items
        });

        ctx.dispatch(new ToastActions.Success('Item removido com sucesso'));
      })
    );
  }

  @Action(DemoFeatureActions.BlockUiDemo)
  public onBlockUiDemo$(ctx: StateContext<DemoFeatureStateModel>, action: DemoFeatureActions.BlockUiDemo): Observable<void> {

    if (action.data === 1) {
      ctx.dispatch(new ToastActions.Success('Success'));
      ctx.dispatch(new DemoFeatureActions.BlockUiDemoSuccess());
      return of();
    }
    else {
      return this.apiService.remove('erro').pipe(
        catchError((error) =>
        {
            console.log('error', error);
            return throwError(error);
        }),
        tap(() => {
          ctx.dispatch(new ToastActions.Error('Failure'));
        })
      );
    }

  }

  @Action(DemoFeatureActions.SetRoute)
  public onSetRoute(ctx: StateContext<DemoFeatureStateModel>, action: DemoFeatureActions.SetRoute): void {

    if (ctx.getState().currentRouteKey != action.key) {

      ctx.patchState({ currentRouteKey: action.key });

      if (action.navigate) {
        if (action.key != null) {
          ctx.dispatch(new Navigate([HOME_PATH, { key: action.key }]));
        }
        else {
          ctx.dispatch(new Navigate([HOME_PATH]));
        }
      }

    }

  }

}