import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SmzForm, SmzFormBuilder, SmzTreeBuilder, SmzTreeState, SmzTreeWithDetailsState, SmzUiBlockService } from 'ngx-smz-ui';
import { Store } from '@ngxs/store';
import { TreeDemoFeatureSelectors } from '../../../state/tree-demo/tree-demo.selectors';
import { TreeDemoFeatureActions } from '@states/tree-demo/tree-demo.actions';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-demo-tree-with-details',
  templateUrl: './demo-tree-with-details.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})

export class DemoTreeWithDetailsComponent implements OnInit {
  public state: SmzTreeWithDetailsState;
  public formStateBuilderFunction = buildForm;
  constructor(private store: Store, private uiBlockService: SmzUiBlockService, private cdr: ChangeDetectorRef) {

    const allowAllNodesToBeClicked = false;

    this.state = {
      isDebug: false,
      items$: this.store.select(TreeDemoFeatureSelectors.all),
      tree: {
        state: this.getState(),
        selectableTypes: ['file', 'folder', 'disk'],
        allowAllNodesToBeClicked,
        styleClass: `border-none ${allowAllNodesToBeClicked ? '' : 'disable-focus'}`
      },
      context: {
        selectedNode: null,
      },
      behavior: {
        emitDetailsAfterCycle: true
      },
      styleClass: {
        content: 'gap-3 p-6 overflow-y-auto'
      },
      layout: {
        detailsStyleClass: 'lg:col-6'
      },
      locale: null
    };

    this.store.dispatch(TreeDemoFeatureActions.LoadAll);

  }

  ngOnInit() {
  }

  public getState(): SmzTreeState {

    return new SmzTreeBuilder()
      .setTitle('My awesome tree')
      .useSincronization()
      .menu()
        .caption('Novo')
          .item('Arquivo text')
            .setCallback(node => console.log('TEXT: ', node))
            .hideForTypes('file')
            .parent
          .item('Imagem')
            .setCallback(node => console.log('IMAGE: ', node))
            .showForTypes('folder')
            .menu
        .separator()
        .item('Renomear')
          .setCallback(node => console.log('RENOMEAR: ', node))
          .showForTypes('file', 'folder')
          .menu
        .item('Excluir')
          .setCallback((node: TreeNode) => this.store.dispatch(new TreeDemoFeatureActions.Remove(node.key)))
          .showForTypes('disk')
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

    // setTimeout(() => {
    //   this.uiBlockService.blockAll();

    //   this.cdr.markForCheck();

    //   console.log('blocks 1', this.uiBlockService.blocks);
    // }, 200);

  }

  public onSelectionChanged(node: TreeNode): void {
    console.log('onSelectionChanged', node);
  }

  public unblock(): void {
    this.uiBlockService.unBlockAll();
  }

  public block(): void {
    this.uiBlockService.blockAll();
  }

  public updateModel(event: any): void {
    // console.log('...updateModel', event);
    this.store.dispatch(new TreeDemoFeatureActions.Update(event));
  }
}

// const base64Sample = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=';

function buildForm(model: TreeNode<{ name: string }>): SmzForm<any> {
  return new SmzFormBuilder<any>()
      .group()
        .text('key', '', model.key)
          .hide()
          .group
        .text('name', 'Nome', model.data.name)
          .validators().required()
          .group
        .form
    .build();

}