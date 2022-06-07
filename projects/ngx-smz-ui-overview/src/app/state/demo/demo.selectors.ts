
import { Selector } from '@ngxs/store';
import { DemoItem } from '../../models/demo';
import { DemoFeatureState, DemoFeatureStateModel } from './demo.state';
import { TreeNode } from 'primeng/api/treenode';
import { RouterParamsState, RouterParamsStateModel } from 'ngx-smz-ui';
import { HOME_PATH } from '@routes';
import { FontAwesomeMigrations } from '../../demos/data/icons/fontawesome-migration';
import { SpecialIcons } from '../../demos/data/icons/especial-icons';

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
  public static migrationIcons(state: DemoFeatureStateModel): any[] {
    return FontAwesomeMigrations.map((x, index) => ({ id: index.toString(), ...x}));
  }

  @Selector([DemoFeatureState])
  public static specialIcons(state: DemoFeatureStateModel): any[] {
    return SpecialIcons.map((x, index) => ({ id: index.toString(), ...x}));
  }

  @Selector([DemoFeatureState])
  public static currentRouteKey(state: DemoFeatureStateModel): string[] {
    return state.currentRouteKey == null ? [] : [state.currentRouteKey?.toString()];
  }

  @Selector([DemoFeatureState])
  public static moreItems(state: DemoFeatureStateModel): DemoItem[] {
    const items = state.items;
    const results = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items];
    return results.map((x, i) => ({...x, name: `${x.name} (${i})`}));
  }

  // @Selector([RouterParamsState, DemoFeatureState])
  // public static currentDetails(routeState: RouterParamsStateModel, demoState: DemoFeatureState ): string {

  //   const routeKey = Reflect.get(routeState.params[HOME_PATH], 'key') ?? null;

  //   if (routeKey == null) return null;

  //   const currentMenuItem = demoState.flattenMenu.find(x => x.routeKey === routeKey);

  //   if (currentMenuItem == null) return null;

  //   switch (currentMenuItem.type) {
  //   case 'venture':
  //     return { routeKey, type: currentMenuItem.type, data: venturesState.items.find(x => x.id === currentMenuItem.routeKey) };

  //   case 'un':
  //     return { routeKey, type: currentMenuItem.type, data: unsState.items.find(x => x.id === currentMenuItem.routeKey) };

  //   case 'plant':
  //     return { routeKey, type: currentMenuItem.type, data: plantsState.items.find(x => x.id === currentMenuItem.routeKey) };

  //   case 'modelfolder':
  //     return null;

  //   case 'model':
  //     return { routeKey, type: currentMenuItem.type, data: modelsState.items.find(x => x.id === currentMenuItem.routeKey) };

  //   default:
  //     return null;
  //   }

  // }

  @Selector([DemoFeatureState])
  public static tree(state: DemoFeatureStateModel): TreeNode[] {
    return state.tree;
  }

  @Selector([DemoFeatureState])
  public static allWithHtmlTags(state: DemoFeatureStateModel): DemoItem[] {
    const results = state.items.map((x, index) => ({ ...x, roles: [
      { id: '1', name: 'teste 1'},
      { id: '2', name: 'teste 2'},
      { id: '3', name: 'teste 3'},
      { id: '4', name: 'teste 4'},
      { id: index, name: `index ${index}`},
    ],
      html: `<div class="grid grid-nogutter items-center justify-start gap-2">
        <i class="fab fa-angellist text-2xl text-primary-color"></i>
        <div class="font-bold">${x.name}</div>
      </div>`
    }));
    // console.log('DemoFeatureSelectors results', results);
    return results;
  }

}