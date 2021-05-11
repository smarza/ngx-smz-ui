import { Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SmzMenuItem } from '../models/conditional-menu-item';

@Pipe({
  name: 'tableMenu'
})

export class SmzTableMenuPipe implements PipeTransform {
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