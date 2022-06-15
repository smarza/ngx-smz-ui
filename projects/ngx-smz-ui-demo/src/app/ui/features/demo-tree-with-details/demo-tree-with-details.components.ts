import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SmzTreeBuilder, SmzTreeState, SmzTreeWithDetailsState } from 'ngx-smz-ui';
import { Store } from '@ngxs/store';
import { TreeDemoFeatureSelectors } from '../../../state/tree-demo/tree-demo.selectors';
import { TreeDemoFeatureActions } from '@states/tree-demo/tree-demo.actions';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-demo-tree-with-details',
  templateUrl: './demo-tree-with-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoTreeWithDetailsComponent implements OnInit {
  public state: SmzTreeWithDetailsState;
  constructor(private store: Store) {

    const allowAllNodesToBeClicked = false;

    this.state = {
      items$: this.store.select(TreeDemoFeatureSelectors.all),
      tree: {
        state: this.getState(),
        selectableTypes: ['file', 'folder'],
        allowAllNodesToBeClicked,
        styleClass: `border-none ${allowAllNodesToBeClicked ? '' : 'disable-focus'}`
      },
      context: {
        selectedNode: null
      }
    };

    this.store.dispatch(TreeDemoFeatureActions.LoadAll);

  }

  ngOnInit() {
  }

  public getState(): SmzTreeState {

    return new SmzTreeBuilder()
      .setTitle('My awesome tree')
      .menu()
        .caption('Novo')
          .item('Arquivo text')
            .setCallback(node => console.log('TEXT: ', node))
            .hideForTypes('file')
            .parent
          .item('Imagem')
            .setCallback(node => console.log('IMAGEN: ', node))
            .showForTypes('folder')
            .menu
        .separator()
        .item('Renomear')
          .setCallback(node => console.log('RENOMEAR: ', node))
          .showForTypes('file', 'folder')
          .menu
        .item('Excluir')
          .setCallback((node: TreeNode) => this.store.dispatch(new TreeDemoFeatureActions.Remove(node.key)))
          .showForTypes('temp')
          .menu
        .tree
      .enableFilter()
      .toolbar('rounded-outlined')
        .setAlignment('end')
        .useTreeExpandButtons()
        .buttons()
          .button('Create Temp')
            .setCallback(() => this.store.dispatch(new TreeDemoFeatureActions.Create))
            .setTooltip('Criar')
            .buttons
          .toolbar
        .tree
        .dragAndDrop()
          .canDrag('file').into('folder', 'disk')
          .canDrag('folder').into('disk', 'folder')
        .tree
      .build();
  }

  public onDetailsChanged(): void {
    console.log('onDetailsChanged');
  }

  public onSelectionChanged(node: TreeNode): void {
    console.log('onSelectionChanged', node);
  }
}