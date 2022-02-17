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

export const DemoFeatureName = 'DemoFeature';

export interface DemoFeatureStateModel {
  lastUpdated: Date | null;
  items: DemoItem[];
  tree: TreeNode[];
}

export const getInitialState = (): DemoFeatureStateModel => ({
  lastUpdated: null,
  items: null,
  tree: null
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
          items: results
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

    console.log('onUpdate action', action.data);
    return of();
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

}