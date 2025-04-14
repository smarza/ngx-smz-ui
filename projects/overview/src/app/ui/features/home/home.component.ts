import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TreeDemoData } from '../../../demos/demo-tree';
import { DemoTreeNode } from '../../../models/demo';
import { Store } from '@ngxs/store';
import { isArray, routerParamsListener, SmzDialogBuilder, SmzDialogsService, SmzTreeBuilder, SmzTreeState, SmzUiBlockService, sortArray, UiDefinitionsDbActions } from '@ngx-smz/core';
import { ActivatedRoute } from '@angular/router';
import { DemoFeatureSelectors } from '../../../state/demo/demo.selectors';
import { DemoFeatureActions } from '../../../state/demo/demo.actions';
import { HOME_PATH } from '../../../../routes';
import { tableData } from '../../components/results-table/data';
import { ResultsTableComponent } from '../../components/results-table/results-table.component';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: `home.component.html`,
  host: { 'class': 'absolute inset-0 p-3' }
})
export class HomeComponent implements OnInit
{
  public currentRouteKey$ = inject(Store).select(DemoFeatureSelectors.currentRouteKey);
  public items: DemoTreeNode[] = sortArray(TreeDemoData, 'label');
  public treeState: SmzTreeState;
  public selectedNode: DemoTreeNode = null;
  public selectedTabIndex = 0;
  public isEditing = false;

  constructor(private store: Store, private http: HttpClient, private route: ActivatedRoute, public uiBlockService: SmzUiBlockService, private cdf: ChangeDetectorRef, private dialogs: SmzDialogsService)
  {

    this.treeState = new SmzTreeBuilder()
      .setTitle('Features')
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

      http.get<{data: any}>('assets/uidefinitions.json').subscribe((uiDefinitions) => {
        store.dispatch(new UiDefinitionsDbActions.Inject(uiDefinitions));
      });
  }

  public ngOnInit(): void {

  }

  public buildDialog(): void {

    this.dialogs.open(new SmzDialogBuilder<void>()
      .setTitle('title')
      .allowMaximize()
      .openMaximized()
      .hideFooter()
      .closeOnEscape()
      .component(ResultsTableComponent)
        .addInput('results', tableData )
        .addInput('itemsPerRow', 15)
        .addInput('title', 'title')
        .addInput('filename', 'filename')
        .addInput('viewport', {"isEnabled":true,"filters":{"company":[{"value":"omp","matchMode":"contains","operator":"and"}],"name":[{"value":null,"matchMode":"startsWith","operator":"and"}],"global":{"value":"any C","matchMode":"contains"}},"visibility":[{"key":"name","isVisible":true},{"key":"company","isVisible":true}],"sort":{"mode":"single","field":"company","order":1}})
      .dialog
      .buttons()
        .cancel().hide().buttons
        .confirm().hide().buttons
        .dialog
      .build());
  }

  public onSelectedNodes(nodes: DemoTreeNode[]): void {
    // console.log('onSelectedNodes', nodes);
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
