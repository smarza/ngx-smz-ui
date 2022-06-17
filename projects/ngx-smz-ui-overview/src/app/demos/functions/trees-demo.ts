import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { DemoFeatureActions } from '@states/demo/demo.actions';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { GlobalInjector, SmzTreeBuilder } from 'ngx-smz-ui';
import { Observable } from 'rxjs';

const store = GlobalInjector.instance.get(Store);

export const TreesDemo:{ [key: string]: { items$: Observable<any[]>, code: () => void } } = {
  //
  [DemoKeys.TREE_DEMO_1]: {
    items$: store.select(DemoFeatureSelectors.tree),
    code: () => {
    store.dispatch(new DemoFeatureActions.LoadTree());
    return new SmzTreeBuilder()
      .setTitle('Sincronized Tree')
      // .emptyFeedback()
      //   .setMessage('Lista vazia.')
      //   .useTreeEmptyMessage()
      //   .tree
      .emptyFeedback()
        .setButtonLabel('Criar nova conexão')
        .setMessage('Ainda não existem conexões cadastradas para esta UN')
        .setButtonCallback(() => { console.log('Hello!'); })
      .tree
      .useSincronization()
      .setSelection('checkbox')
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
          .setCallback(node => console.log('EXCLUIR: ', node))
          .menu
        .tree
      .enableFilter()
      .toolbar('rounded-outlined')
        .setAlignment('end')
        .useTreeExpandButtons()
        .buttons()
          .button('', 'fa-solid fa-mug-saucer')
            .setCallback((event, data, node) => console.log(event))
            .setTooltip('Button 1 awesome tooltip')
            .setColor('danger')
            .buttons
          .button('', 'fa-solid fa-burger')
            .setCallback((event, data, node) => console.log('Button 2'))
            .setTooltip('Button 2 awesome tooltip')
            .setColor('warning')
            .buttons
          .button('', 'fa-solid fa-pizza-slice')
            .setCallback((event, data, node) => console.log('Button 3'))
            .setTooltip('Button 3 awesome tooltip')
            .setColor('success')
            .buttons
          .toolbar
        .tree
        // .dragAndDrop()
        //   .canDrag('file').into('folder', 'disk')
        //   .canDrag('folder').into('disk', 'folder')
        // .tree
      .build()
    }
  },
  //
  [DemoKeys.TREE_DATA_TRANSFORM]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTreeBuilder()
      .setTitle('Tree with Data Transform')
      .useSincronization()
      .dataTransform({
        endNode: {
          keyPropertyValue: 'id', labelProperty: 'name', type: 'item', nodeOverrides: { selectable: true },
        },
        group: {
          keyPropertyValue: 'country.id', keyPropertyData: 'country', labelProperty: 'country.name', type: 'country', nodeOverrides: { selectable: false },
          group: {
            keyPropertyValue: 'company', keyPropertyData: 'company', labelProperty: 'company', type: 'company', nodeOverrides: { selectable: false },
            group: null
          }
        }
      })
      .menu()
        .item('Country')
          .setCallback(node => console.log('Country: ', node))
          .showForTypes('country')
          .menu
        .item('Company')
          .setCallback(node => console.log('Company: ', node))
          .showForTypes('company')
          .menu
        .item('Item')
          .showForTypes('item')
          .setCallback(node => console.log('Item: ', node))
          .menu
        .tree
      .enableFilter()
      .build()
    }
  },
}







