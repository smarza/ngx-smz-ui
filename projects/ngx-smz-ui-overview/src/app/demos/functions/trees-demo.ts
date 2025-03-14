import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { DemoFeatureActions } from '@states/demo/demo.actions';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { GlobalInjector, SmzTreeBuilder, SmzTreeDynamicMenuBuilder, SmzTreeDynamicMenuItemBuilder, SmzTreeMenuBuilder, SmzTreeNode } from 'ngx-smz-ui';
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
        .setButtonCallback((event) => { console.log('Hello!', event); })
      .tree
      .useSincronization()
      .setSelection('checkbox')
      .menu()
        .withInlineMenu('fa-solid fa-gear', 'secondary')
        .setExplicitTypes(['CheckGroup', 'CheckCategory', 'Check'])
        .withDynamicItems((_: SmzTreeDynamicMenuBuilder, node: SmzTreeNode<unknown>) => (
            _.item(`label: ${node.label}, type: ${node.type}`)
              .setCallback(node => console.log(node))
              .menu
            .separator()
            .item(`Not Check`)
              .setCallback(node => console.log(node))
              .hideForTypes('Check')
              .menu
            .item('Is Check')
              .setCallback(node => console.log(node))
              .showForTypes('Check')
              .menu
            .item('Is CheckGroup')
              .setCallback(node => console.log(node))
              .showForTypes('CheckGroup')
              .menu
            .item('CheckGroup or CheckCategory')
              .setCallback(node => console.log(node))
              .showForTypes('CheckGroup', 'CheckCategory')
              .menu
            .build()))
            .tree
      .enableFilter()
      .toolbar('rounded-outlined')
        .setAlignment('end')
        .useTreeExpandButtons()
        .buttons()
          .button('', 'fa-solid fa-mug-saucer')
            .setCallback((event, data, node) => {
              console.log(node);
              node[0].expanded = !node[0].expanded;
            })
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
  [DemoKeys.TREE_DATA_TRANSFORM_USING_GROUPS]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTreeBuilder()
      .setTitle('Tree with Data Transform')
      .useSincronization()
      .setSelection('checkbox')
      .dataSource()
        .grouping({
          // NÓ FINAL
          endNode: {
            keyPropertyValue: 'id',
            labelProperty: 'name',
            type: 'item',
            nodeOverrides: { selectable: true },
          },
          // AGRUPAR POR COUNTRY
          group: {
            keyPropertyValue: 'country.id',
            keyPropertyData: 'country',
            labelProperty: 'country.name',
            type: 'country',
            nodeOverrides: { selectable: true },
            // AGRUPAR POR COMPANY
            group: {
              keyPropertyValue: 'company',
              keyPropertyData: 'company',
              labelProperty: 'company',
              type: 'company',
              nodeOverrides: { selectable: false },
              group: null
            }
          }
        })
        .tree
      .enableFilter()
      .toolbar('rounded-outlined')
        .setAlignment('end')
        .useTreeExpandButtons()
        .tree
      .build()
    }
  },
  //
  [DemoKeys.TREE_DATA_TRANSFORM_USING_FLAT_ARRAYS]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTreeBuilder()
      .setTitle('Tree with Data Transform')
      .useSincronization()
      .setSelection('checkbox')
      .dataSource()
        .flat('id', 'name')
        .tree
      .enableFilter()
      .build()
    }
  },
  //
  [DemoKeys.TREE_DATA_TRANSFORM_USING_FLAT_ARRAYS_WITH_ROOT]: {
    items$: store.select(DemoFeatureSelectors.all),
    code: () => {
    return new SmzTreeBuilder()
      .setTitle('Tree with Data Transform')
      .useSincronization()
      .setSelection('checkbox')
      .dataSource()
        .flatWithRoot('Libra xyz', 'id', 'name', { expanded: true })
        .tree
      .enableFilter()
      .build()
    }
  },
  //
  [DemoKeys.TREE_DATA_TRANSFORM_USING_NESTED]: {
    items$: store.select(DemoFeatureSelectors.giants),
    code: () => {
    return new SmzTreeBuilder()
      .setTitle('Tree with Nested Data 1')
      .useSincronization()
      .emptyFeedback()
        .setMessage('Árvore vazia')
        .useTreeEmptyMessage()
        .tree
      .enableFilter()
      .setSelection('checkbox')
      .dataSource()
        .nested('plant')
          .conditionalSelection((item: any) => {
            console.log(item);
            return false;
          })
          .addChild('topsideModules')
            .back
          .addChild('hullSpaces')
            .setType('space')
            .addChild('structuralMembers')
              .setType('structural-members')
              .addChild('plates')
                .setType('plate')
                .setIcon('fa-solid fa-bug')
                // .conditionalSelection((item: any) => item.name !== 'HGP-104-1-2 plate')
                .makeAsGroup('Chapas')
                  .setIcon('fa-solid fa-circle')
                  .child
                .back
              .addChild('reinforcements')
                .setType('reinforcement')
                .setIcon('fa-solid fa-user')
                .makeAsGroup('Reforços')
                  .setIcon('fa-solid fa-circle')
                  .child
                .back
              .back
            .back
          .dataSource
        .tree
      .build()
    }
  },
}