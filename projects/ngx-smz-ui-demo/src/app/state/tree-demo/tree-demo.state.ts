import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TreeNode } from 'primeng/api';
import { TreeDemoDataService } from './tree-demo-data.service';
import { TreeDemoFeatureActions } from './tree-demo.actions';
import { cloneDeep } from 'lodash-es';
import { getTreeNodeFromKey, removeElementFromArray, ToastActions } from 'ngx-smz-ui';

export const TreeDemoFeatureName = 'TreeDemoFeature';

export interface TreeDemoFeatureStateModel {
  lastUpdated: Date | null;
  items: TreeNode[];
}

export const getInitialState = (): TreeDemoFeatureStateModel => ({
  lastUpdated: null,
  items: null,
});

@State<TreeDemoFeatureStateModel>({
  name: TreeDemoFeatureName,
  defaults: getInitialState()
})

@Injectable()
export class TreeDemoFeatureState {
  constructor(private apiService: TreeDemoDataService) { }

  @Action(TreeDemoFeatureActions.LoadAll)
  public onLoad$(ctx: StateContext<TreeDemoFeatureStateModel>): Observable<TreeNode[]> {
    return this.apiService.getTree().pipe(
      tap(results => {
        ctx.patchState({
          lastUpdated: new Date(),
          items: results
        });
      })
    );
  }

  @Action(TreeDemoFeatureActions.Create)
  public onCreate$(ctx: StateContext<TreeDemoFeatureStateModel>, action: TreeDemoFeatureActions.Create): void {

    const items = cloneDeep(ctx.getState().items);
    const key =  ((Math.random() * 200) + 100).toString();
    const item = {
      label: `New item (${key})`,
      type: 'temp',
      data: {},
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      draggable: false,
      droppable: false,
      selectable: false,
      key,
      children: null
    };

    ctx.patchState({
      lastUpdated: new Date(),
      items: [...items, item]
    });

    ctx.dispatch(new ToastActions.Success('Item criado com sucesso'));
  }

  // @Action(TreeDemoFeatureActions.CreateSuccess)
  // public onCreateSuccess$(ctx: StateContext<DemoFeatureStateModel>, action: TreeDemoFeatureActions.CreateSuccess): void {
  //   const items = cloneDeep(ctx.getState().items);

  //   ctx.patchState({
  //     lastUpdated: new Date(),
  //     items: [action.data, ...items]
  //   });

  //   ctx.dispatch(new ToastActions.Success('Item criado com sucesso'));
  // }

  @Action(TreeDemoFeatureActions.Update)
  public onUpdate$(ctx: StateContext<TreeDemoFeatureStateModel>, action: TreeDemoFeatureActions.Update): void {
    const items = cloneDeep(ctx.getState().items);

    const item = getTreeNodeFromKey(items, action.data.key);

    if (item != null) {
      item.data.name = action.data.name;

      ctx.patchState({
        lastUpdated: new Date(),
        items: items
      });

      ctx.dispatch(new ToastActions.Success('Item atualizado com sucesso'));
    }

  }


  @Action(TreeDemoFeatureActions.Remove)
  public onRemove$(ctx: StateContext<TreeDemoFeatureStateModel>, action: TreeDemoFeatureActions.Remove): void {

    const items = cloneDeep(ctx.getState().items);

    removeElementFromArray(items, action.id, 'key');

    ctx.patchState({
      lastUpdated: new Date(),
      items: items
    });

    ctx.dispatch(new ToastActions.Success('Item removido com sucesso'));

  }

  // @Action(TreeDemoFeatureActions.BlockUiDemo)
  // public onBlockUiDemo$(ctx: StateContext<DemoFeatureStateModel>, action: TreeDemoFeatureActions.BlockUiDemo): Observable<void> {

  //   if (action.data === 1) {
  //     ctx.dispatch(new ToastActions.Success('Success'));
  //     ctx.dispatch(new TreeDemoFeatureActions.BlockUiDemoSuccess());
  //     return of();
  //   }
  //   else {
  //     return this.apiService.remove('erro').pipe(
  //       catchError((error) =>
  //       {
  //           console.log('error', error);
  //           return throwError(error);
  //       }),
  //       tap(() => {
  //         ctx.dispatch(new ToastActions.Error('Failure'));
  //       })
  //     );
  //   }

  // }

}