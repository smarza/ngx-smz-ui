import { ChangeDetectorRef, Component } from '@angular/core';
import { TreeDemoData } from '@demos/demo-tree';
import { DemoTreeNode } from '@models/demo';
import { Select, Store } from '@ngxs/store';
import { isArray, routerParamsDispatch, routerParamsListener, SmzTreeBuilder, SmzTreeState, SmzUiBlockService, sortArray } from 'ngx-smz-ui';
import { DemoFeatureActions } from '../../../state/demo/demo.actions';
import { DemoKeys } from '@demos/demo-keys';
import { ActivatedRoute } from '@angular/router';
import { HOME_PATH } from '@routes';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: `home.component.html`,
  host: { 'class': 'absolute inset-0 p-3' }
})
export class HomeComponent
{
  @Select(DemoFeatureSelectors.currentRouteKey) public currentRouteKey$: Observable<string[]>;
  public items: DemoTreeNode[] = sortArray(TreeDemoData, 'label');
  public treeState: SmzTreeState;
  public selectedNode: DemoTreeNode = null;
  public selectedTabIndex = 0;
  public isEditing = false;

  constructor(private store: Store, private route: ActivatedRoute, public uiBlockService: SmzUiBlockService, private cdf: ChangeDetectorRef)
  {

    this.store.dispatch(new DemoFeatureActions.LoadAll());

    this.treeState = new SmzTreeBuilder()
      .setTitle('Fluents')
      .useSincronization()
      .enableFilter()
      .toolbar('rounded-outlined')
        .setAlignment('end')
        .useTreeExpandButtons()
        .tree
        .menu()
        .item('Executar')
          .setCallback<DemoTreeNode>(node => node.data())
          .showForTypes('Demo')
          .menu
        .tree
      .build();

      routerParamsListener(HOME_PATH, route, (routeData: { key: string }) => {
        this.store.dispatch(new DemoFeatureActions.SetRoute(routeData.key, false));

        if (routeData.key == null) {
          setTimeout(() => {
            this.selectedTabIndex = 0;
            this.selectedNode = null;
          }, 0);
        }
      });
  }

  public onSelectedNodes(nodes: DemoTreeNode[]): void {

    if (isArray(nodes) && nodes.length > 0) {
      const node = nodes[0];
      if (node?.type === 'Demo') {
        setTimeout(() => {
          this.selectedTabIndex = 0;
          this.selectedNode = node;
        }, 0);
      }
    }
    else {
      const node = nodes as DemoTreeNode;
      if (node?.type === 'Demo') {
        this.selectedTabIndex = 0;
        this.selectedNode = node;

        // Publicar alteração de rota na store
        this.store.dispatch(new DemoFeatureActions.SetRoute(node.key, true));
      }
    }
  }

}
