
import { Selector } from '@ngxs/store';
import { DemoFeatureState, DemoFeatureStateModel } from './demo.state';
import { EasyTableDemoData } from '../../ui/features/demo-tables/demo-easy-table/easy-table-model';
import { TreeNode } from 'primeng/api';

export class DemoFeatureSelectors {

  @Selector([DemoFeatureState])
  public static all(state: DemoFeatureStateModel): any[] {
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
  public static allEasyTable(state: DemoFeatureStateModel): EasyTableDemoData[] {
    return state.easyTableItems;
  }

  @Selector([DemoFeatureState])
  public static tree(state: DemoFeatureStateModel): TreeNode[] {
    return state.tree;
  }

}