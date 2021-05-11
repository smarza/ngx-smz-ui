import { Injectable } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { AuthenticationActions, AuthenticationSelectors } from 'ngx-rbk-utils';
import { MenuItem } from 'primeng/api';
import { MenuCreation } from '../models/menu-creation';
import { SmzNotification } from '../models/notifications';

@Injectable({ providedIn: 'root' })
export class MenuHelperService {
  public menu: MenuItem[];
  public profile: MenuItem[];
  public notifications: SmzNotification[];

  private menuCreationData: MenuCreation[];
  private profileCreationData: MenuCreation[];
  private accessMenuBehavior: 'hide' | 'disable';
  private accessProfileBehavior: 'hide' | 'disable';

  constructor(private actions$: Actions, private store: Store) {
    this.actions$.pipe(ofActionSuccessful(AuthenticationActions.RemoteLoginSuccess)).subscribe(() => {
      this.rebuild();
    });

    this.actions$.pipe(ofActionSuccessful(AuthenticationActions.LocalLoginSuccess)).subscribe(() => {
      this.rebuild();
    });
  }

  public rebuild(): void {
    this.menu = null;
    this.profile = null;
    this.notifications = null;

    this.setupMenu();
    this.setupProfile();
  }

  public setMenu(data: MenuCreation[], accessBehavior: 'hide' | 'disable' = 'hide'): void {
    this.menuCreationData = data;
    this.accessMenuBehavior = accessBehavior;

    this.setupMenu();
  }

  public setProfile(data: MenuCreation[], accessBehavior: 'hide' | 'disable' = 'hide'): void {
    this.profileCreationData = data;
    this.accessProfileBehavior = accessBehavior;

    this.setupProfile();
  }

  public setNotifications(data: SmzNotification[]): void {
    this.notifications = data;
  }

  public clearNotifications(): void {
    this.notifications = [];
  }

  private setupMenu(): void {
    if (this.menuCreationData == null) return;

    this.menu = [];

    for (const creation of this.menuCreationData) {

      const item = this.addMenuItemRecursive(creation, this.accessMenuBehavior);

      if (item != null) {
        this.menu.push(item);
      }
    }
  }

  private setupProfile(): void {
    if (this.profileCreationData == null) return;

    this.profile = [];

    for (const creation of this.profileCreationData) {

      const item = this.addMenuItemRecursive(creation, this.accessProfileBehavior);

      if (item != null) {
        this.profile.push(item);
      }
    }
  }

  private addMenuItemRecursive(creation: MenuCreation, accessBehavior: 'hide' | 'disable'): MenuItem {

    if (creation.visible === false) return null;

    const result: MenuItem = {
      label: creation.label,
      icon: creation.icon,
      command: creation.command,
      routerLink: creation.routerLink,
      items: []
    };

    // PERCORRER E MONTAR RECURSIVAMENTE OS SUB-ITENS DESTE MENU.
    for (const item of creation.items ?? []) {
      const subItem = this.addMenuItemRecursive(item, accessBehavior);

      if (subItem != null) {
        result.items.push(subItem);
      }
    }

    // SE O MENU NÃO TIVER SUB-ITEMS.
    if (result.items == null || result.items.length === 0) {
      // SE O MENU NÃO TIVER AÇÃO.
      if (result.routerLink == null && result.command == null) {
        // COMO O MENU ESTÁ VAZIO E NÃO TEM AÇÃO, ELE NÃO PRECISA SER RENDERIZADO.
        return null;
      }
    }

    // CHECAR ACESSO DO USUÁRIO
    const hasAccess = creation.claim == null ? true : this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(creation.claim));

    if (!hasAccess) {
      return accessBehavior === 'hide' ? null : { ...result, disabled: true };
    }
    else {
      return result;
    }
  }

}