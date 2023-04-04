import { MenuCreation } from '../models/menu-creation';

export function sortMenuItemsByLabel(menuItems: MenuCreation[], sort = false): MenuCreation[] {
  // Ordena os itens do menu com base na propriedade "label".
  const sortedItems = sort ? menuItems.sort((a, b) => (a.label || '').localeCompare(b.label || '')) : menuItems;

  // Ordena os subníveis recursivamente.
  for (const menuItem of sortedItems) {
    if (menuItem.items && menuItem.sortChildren) {
      menuItem.items = sortMenuItemsByLabel(menuItem.items, true);
    }
  }

  return sortedItems;
}