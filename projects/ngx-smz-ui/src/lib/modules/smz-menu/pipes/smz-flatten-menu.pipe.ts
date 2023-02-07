import { Pipe, PipeTransform } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { MenuItem } from 'primeng/api';
import { SmzMenuItem } from '../models/smz-menu-item';

@Pipe({
  name: 'smzFlattenMenu'
})

export class SmzFlattenMenuPipe implements PipeTransform {
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

    if (item.conditional?.condition != null) {

        const condition = item.conditional.condition(data);
        Reflect.set(item, item.conditional.property ?? 'visible', condition);

        return { ...item, items: [] };
    }
    else {
      return { ...item, items: undefined };
    }

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