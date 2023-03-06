import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { cloneDeep } from 'lodash-es';
import { MenuItem } from 'primeng/api';
import { AuthenticationSelectors } from '../../../state/global/authentication/authentication.selectors';
import { SmzMenuItem } from '../models/smz-menu-item';
import { GlobalInjector } from '../../../common/services/global-injector';

@Pipe({
  name: 'smzFlattenMenu'
})

export class SmzFlattenMenuPipe implements PipeTransform {
  constructor(private store: Store) {}
  transform(menu: SmzMenuItem[], data: any): SmzMenuItem[] {

    if (menu == null || menu.length === 0) return null;

    const result: MenuItem[] = [];
    this.loop(result, menu, data);

    return result;
  }

  private loop(result: MenuItem[], items: SmzMenuItem[], data: any): void {

    items.forEach((item) => {
      const clonedItems = cloneDeep({ ...item, items: []});
      const itemResult = this.applyMenuState(clonedItems, data);

      if (itemResult != null){
        this.applyMenuTransforms(itemResult, data);

        if (item.items?.length > 0) {
          this.loop(result, item.items, data);
        }

        result.push(itemResult);

      }
    });
  }

  private applyMenuState(item: SmzMenuItem, data: any): MenuItem {

    let items = undefined;

    if (item.conditional?.condition != null) {

        const condition = item.conditional.condition(data);
        Reflect.set(item, item.conditional.property ?? 'visible', condition);
        items = [];
    }

    if (item.hasClaimAccess != null) {

      if (GlobalInjector.config.debugMode) {
        console.log(`Checking Access to Button '${item.label}' with claim '${item.hasClaimAccess}': `, this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(item.hasClaimAccess)));
      }

      if (!this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(item.hasClaimAccess))) {
        item.disabled = true;
      }

    }

    return { ...item, items };

  }

  private applyMenuTransforms(item: SmzMenuItem, data: any): void {

    if (item.transforms?.length > 0) {

      item.transforms.forEach(transform => {

        const results = transform(data);

        Reflect.ownKeys(results).forEach(property => {
          Reflect.set(item, property, Reflect.get(results, property));
        });
      });

    }

  }
}