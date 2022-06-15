
import { Selector } from '@ngxs/store';
import { TreeNode } from 'primeng/api';
import { TreeDemoFeatureState, TreeDemoFeatureStateModel } from './tree-demo.state';

export class TreeDemoFeatureSelectors {

  @Selector([TreeDemoFeatureState])
  public static all(state: TreeDemoFeatureStateModel): TreeNode[] {
    return state.items;
  }

}