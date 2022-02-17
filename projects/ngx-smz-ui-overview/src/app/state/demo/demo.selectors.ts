
import { Selector } from '@ngxs/store';
import { DemoItem } from '../../models/demo';
import { DemoFeatureState, DemoFeatureStateModel } from './demo.state';
import { TreeNode } from 'primeng/api/treenode';

export class DemoFeatureSelectors {

  @Selector([DemoFeatureState])
  public static all(state: DemoFeatureStateModel): DemoItem[] {
    const results = state.items.map((x, index) => ({ ...x, roles: [
      { id: '1', name: 'teste 1'},
      { id: '2', name: 'teste 2'},
      { id: '3', name: 'teste 3'},
      { id: '4', name: 'teste 4'},
      { id: index, name: `index ${index}`}
    ]}));
    // console.log('DemoFeatureSelectors results', results);
    return results;
  }

  @Selector([DemoFeatureState])
  public static moreItems(state: DemoFeatureStateModel): DemoItem[] {
    const items = state.items;
    const results = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items];
    return results.map((x, i) => ({...x, name: `${x.name} (${i})`}));
  }


  @Selector([DemoFeatureState])
  public static tree(state: DemoFeatureStateModel): TreeNode[] {
    return state.tree;
  }

}