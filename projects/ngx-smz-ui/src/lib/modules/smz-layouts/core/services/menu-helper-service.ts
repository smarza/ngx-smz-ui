import { Injectable } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { AuthenticationActions } from '../../../../state/global/authentication/authentication.actions';
import { AuthenticationSelectors } from '../../../../state/global/authentication/authentication.selectors';
import { MenuCreation } from '../models/menu-creation';
import { SmzNotification } from '../models/notifications';
import { GlobalInjector } from '../../../../common/services/global-injector';

@Injectable({ providedIn: 'root' })
export class MenuHelperService {
  public menu: MenuItem[];
  public profile: MenuItem[];
  public notifications: SmzNotification[];
  private menuCreationCallback: () => MenuItem[];
  private profileCreationCallback: () => MenuItem[];
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

    if (this.menuCreationCallback) {
      const menu = this.menuCreationCallback();
      this.setMenu(menu);
    }
    else {
      this.setupMenu();
    }

    if (this.profileCreationCallback) {
      const profile = this.profileCreationCallback();
      this.setProfile(profile);
    }
    else {
      this.setupProfile();
    }

  }

  public setMenuBuild(callback: () => MenuItem[]): void {
    this.menuCreationCallback = callback;
  }

  public setProfileBuild(callback: () => MenuItem[]): void {
    this.profileCreationCallback = callback;
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
    const extras = [];

    if (GlobalInjector.config.rbkUtils.authorization.navigationMenu != null) {
      extras.push(GlobalInjector.config.rbkUtils.authorization.navigationMenu);
    }

    for (const creation of [...extras, ...this.menuCreationData]) {

      const item = this.addMenuItemRecursive(creation, this.accessMenuBehavior);

      if (item != null) {
        this.menu.push(item);
      }
    }
  }

  private setupProfile(): void {
    if (this.profileCreationData == null) return;

    this.profile = [];

    for (const creation of [...GlobalInjector.config.rbkUtils.authorization.profileMenu, ...this.profileCreationData]) {

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
      disabled: creation.disabled,
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