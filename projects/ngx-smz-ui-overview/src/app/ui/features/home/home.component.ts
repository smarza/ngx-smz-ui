import { Component } from '@angular/core';
import { TreeDemoData } from '@demos/demo-tree';
import { DemoTreeNode } from '@models/demo';
import { Store } from '@ngxs/store';
import { SmzTreeBuilder, SmzTreeState, SmzDialogsService } from 'ngx-smz-ui';
import { DemoFeatureActions } from '../../../state/demo/demo.actions';

@Component({
  selector: 'app-home',
  templateUrl: `home.component.html`,
  host: { 'class': 'absolute inset-0 p-p-3' }
})
export class HomeComponent
{
  public items: DemoTreeNode[] = TreeDemoData;
  public treeState: SmzTreeState;
  public selectedNode: DemoTreeNode = null;
  public selectedTabIndex = 0;

  constructor(private dialogs: SmzDialogsService, private store: Store)
  {

    this.store.dispatch(new DemoFeatureActions.LoadAll());

    this.treeState = new SmzTreeBuilder()
      .setTitle('Dialogs Demo')
      .enableFilter()
      .toolbar('rounded-outlined')
        .setAlignment('end')
        .useTreeExpandButtons()
        .useNodeExpandButtons()
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
