import { Injectable } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { AuthenticationActions } from '../../../../state/global/authentication/authentication.actions';
import { AuthenticationSelectors } from '../../../../state/global/authentication/authentication.selectors';
import { MenuCreation } from '../models/menu-creation';
import { SmzNotification } from '../models/notifications';
import { GlobalInjector } from '../../../../common/services/global-injector';
import { sortMenuItemsByLabel } from '../functions/sort-menu-build';
import { sortArrayOfObjects } from '../../../../common/utils/utils';
import { cloneDeep } from 'lodash-es';
import { SmzMenuItem } from '../../../smz-menu/models/smz-menu-item';

@Injectable({ providedIn: 'root' })
export class MenuHelperService {
  public menu: MenuItem[];
  public profile: MenuItem[];
  public notifications: SmzNotification[];
  private menuCreationCallback: () => MenuCreation[];
  private profileCreationCallback: () => MenuCreation[];
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

  public setMenuBuild(callback: () => MenuCreation[]): void {
    this.menuCreationCallback = () => sortMenuItemsByLabel(callback());
  }

  public setProfileBuild(callback: () => MenuCreation[]): void {
    this.profileCreationCallback = () => sortMenuItemsByLabel(callback());
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

    const creationData = cloneDeep(this.menuCreationData);
    this.menu = [];
    const extras = [];

    if (GlobalInjector.config.rbkUtils.authorization.navigationMenu != null) {

      const navigationMenu = GlobalInjector.config.rbkUtils.authorization.navigationMenu;

      const withSameLabel = creationData.find(x => x.label === navigationMenu.label);

      if (withSameLabel != null) {
        // Já existe um menu com esse label criado pelo projeto

        if (withSameLabel.items == null) {
          withSameLabel.items = [];
        }

        // Merge dos itens desse menu
        withSameLabel.items = [...withSameLabel.items, ...navigationMenu.items];// sortArrayOfObjects([...withSameLabel.items, ...navigationMenu.items], 'label', 1);
      }
      else {
        // Não existe nenhum menu com esse mesmo label no projeto

        // Adicionar no extras
        extras.push(navigationMenu);
      }

    }

    for (const creation of [...creationData, ...extras]) {

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

  private addMenuItemRecursive(creation: MenuCreation, accessBehavior: 'hide' | 'disable'): SmzMenuItem {

    if (creation.visible === false) return null;

    const result: SmzMenuItem = {
      label: creation.label,
      icon: creation.icon,
      command: creation.command,
      routerLink: creation.routerLink,
      disabled: creation.disabled,
      hideSeparator: creation.hideSeparator,
      showAsCaption: creation.showAsCaption,
      items: []
    };

    // PERCORRER E MONTAR RECURSIVAMENTE OS SUB-ITENS DESTE MENU.
    for (const item of creation.items ?? []) {
      const subItem = this.addMenuItemRecursive(item, accessBehavior);

      if (subItem != null) {
        result.items.push(subItem);
      }
    }

    // // SE O MENU NÃO TIVER SUB-ITEMS.
    // if (result.items == null || result.items.length === 0) {
    //   // SE O MENU NÃO TIVER AÇÃO.
    //   if (result.routerLink == null && result.command == null) {
    //     // COMO O MENU ESTÁ VAZIO E NÃO TEM AÇÃO, ELE NÃO PRECISA SER RENDERIZADO.
    //     return null;
    //   }
    // }

    // Todo: Verificar se o GlobalInjector existe nesse momento
    if (GlobalInjector?.config?.rbkUtils?.authorization?.validationSelectors == null){
      console.warn('GlobalInjector not working here (validationSelectors menu-helper-service)');
    }

    const validationSelectors = GlobalInjector.config.rbkUtils.authorization.validationSelectors;

    // CHECAR ACESSO DO USUÁRIO
    const hasAccess = creation.claims == null ? true : this.store.selectSnapshot(validationSelectors.hasAnyOfClaimAccess(creation.claims));

    if (!hasAccess) {
      return accessBehavior === 'hide' ? null : { ...result, disabled: true };
    }
    else {
      return result;
    }
  }

}