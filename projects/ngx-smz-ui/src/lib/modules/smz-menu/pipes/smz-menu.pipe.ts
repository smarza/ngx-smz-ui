import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { SmzMenuItem } from '../models/smz-menu-item';
import { AuthenticationSelectors } from '../../../state/global/authentication/authentication.selectors';
import { GlobalInjector } from '../../../common/services/global-injector';

@Pipe({
  name: 'smzMenu'
})

export class SmzMenuPipe implements PipeTransform {
  constructor(private store: Store) {}
  transform(menu: SmzMenuItem[], data: any): MenuItem[] {
    if (menu == null || menu.length === 0) return null;

    const result: MenuItem[] = [];
    this.loop(result, menu, data);
    return result;
  }

  private loop(result: MenuItem[], items: SmzMenuItem[], data: any): void {

    items.forEach((item) => {
      const itemResult = this.applyMenuState(item, data);

      if (itemResult != null){
        this.applyMenuTransforms(itemResult, data);

        if (item.items?.length > 0) {
          if (itemResult.items == null) itemResult.items = [];

          this.loop(itemResult.items, item.items, data);
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

      const validationSelectors = GlobalInjector.config.rbkUtils.authorization.validationSelectors;

      if (GlobalInjector.config.debugMode) {
        console.log(`Checking Access to Button '${item.label}' with claim '${item.hasClaimAccess}': `, this.store.selectSnapshot(validationSelectors.hasClaimAccess(item.hasClaimAccess)));
      }

      if (!this.store.selectSnapshot(validationSelectors.hasClaimAccess(item.hasClaimAccess))) {
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