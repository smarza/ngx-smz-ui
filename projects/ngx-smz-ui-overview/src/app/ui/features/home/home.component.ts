import { Component } from '@angular/core';
import { TreeDemoData } from '@demos/demo-tree';
import { DemoTreeNode } from '@models/demo';
import { Store } from '@ngxs/store';
import { SmzTreeBuilder, SmzTreeState, SmzDialogsService, SmzUiBlockService } from 'ngx-smz-ui';
import { DemoFeatureActions } from '../../../state/demo/demo.actions';
import { sortArray } from '../../../../../../ngx-smz-ui/src/lib/common/utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: `home.component.html`,
  host: { 'class': 'absolute inset-0 p-3' }
})
export class HomeComponent
{
  public items: DemoTreeNode[] = sortArray(TreeDemoData, 'label');
  public treeState: SmzTreeState;
  public selectedNode: DemoTreeNode = null;
  public selectedTabIndex = 0;
  public isEditing = false;

  constructor(private dialogs: SmzDialogsService, private store: Store, public uiBlockService: SmzUiBlockService)
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

  }

  public selectionChanged(node: DemoTreeNode): void {
    if (node?.type === 'Demo') {
      this.selectedTabIndex = 0;
      this.selectedNode = node;
    }
  }

}
