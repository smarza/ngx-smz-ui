import { MenuItem } from 'primeng/api';
import { uuidv4 } from '../../common/utils/utils';
import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { SmzEasyTableActionContent, SmzEasyTableContentType } from '../../standalones/easy-table/models/smz-easy-table-contents';
import { SmzEasyTableBodyColumn, SmzEasyTableHeader } from '../../standalones/easy-table/models/smz-easy-table-state';
import { SmzDocumentWidthTypes } from '../smz-documents/document-base-cell';
import { SmzCardsBuilder } from './state-builder';

export class SmzCardsMenuBuilder {
  constructor(private _cardsBuilder: SmzCardsBuilder<any>, items: SmzMenuItem[] = []) {

    const key = uuidv4();

    const column: SmzEasyTableBodyColumn = { key, isVisible: true, styleClass: '', content: {
      type: SmzEasyTableContentType.ACTION,
      items: items,
      dataPath: ''
    } };

    const header: SmzEasyTableHeader = { key, isVisible: true, label: '', widthClass: '', styleClass: '', sort: null, searchPath: '', sortPath: '' };

    this._cardsBuilder._tempMenu = {
      header,
      column
    };

  }

  public setHeader(header: string): SmzCardsMenuBuilder {
    this._cardsBuilder._tempMenu.header.label = header;
    return this;
  }

  public setWidth(widthClass: SmzDocumentWidthTypes): SmzCardsMenuBuilder {
    this._cardsBuilder._tempMenu.header.widthClass = widthClass;
    return this;
  }

  public setHeaderStyles(styleClass: string): SmzCardsMenuBuilder {
    this._cardsBuilder._tempMenu.header.styleClass = styleClass;
    return this;
  }

  public useDynamic(callback: (row: any) => SmzMenuItem[]): SmzCardsMenuBuilder {

    if ((this._cardsBuilder._tempMenu.column?.content as SmzEasyTableActionContent)?.items != null && (this._cardsBuilder._tempMenu.column?.content as SmzEasyTableActionContent)?.items.length > 0) {
      throw Error('[Smz Eazy Table] You can\'t call \'dynamicMenu\' if the menu items are already set.');
    }

    (this._cardsBuilder._tempMenu.column.content as SmzEasyTableActionContent).callback = callback;
    (this._cardsBuilder._tempMenu.column.content as SmzEasyTableActionContent).items = null;

    return this;
  }

  public item(label: string, icon: string = null, tooltip: string = null): SmzMenuItemCardsBuilder {

    if ((this._cardsBuilder._tempMenu.column?.content as SmzEasyTableActionContent)?.callback != null) {
      throw Error('[Smz Eazy Table] You can\'t call \'item\' while using dynamic menu.');
    }

    const item: SmzMenuItem = { label, icon, tooltip, transforms: [], visible: true, disabled: false };
    (this._cardsBuilder._tempMenu.column.content as SmzEasyTableActionContent).items.push(item);

    return new SmzMenuItemCardsBuilder(this, null, item);
  }

  public separator(): SmzCardsMenuBuilder {

    if ((this._cardsBuilder._tempMenu.column?.content as SmzEasyTableActionContent)?.callback != null) {
      throw Error('[Smz Eazy Table] You can\'t call \'separator\' while using dynamic menu.');
    }

    (this._cardsBuilder._tempMenu.column.content as SmzEasyTableActionContent).items.push({ separator: true });
    return this;
  }

  public get table(): SmzCardsBuilder<any> {
    return this._cardsBuilder;
  }

}

export class SmzMenuItemCardsBuilder {
  constructor(private _menuBuilder: SmzCardsMenuBuilder, private _parent: SmzMenuItemCardsBuilder, private _item: SmzMenuItem) {

  }

  public addChild(label: string, icon: string = null): SmzMenuItemCardsBuilder {
    if (this._item.items == null) {
      this._item.items = [];
    }
    const item: SmzMenuItem = { label, icon, transforms: [] };
    this._item.items.push(item);

    return new SmzMenuItemCardsBuilder(this._menuBuilder, this, item);
  }

  public setCallback<T>(callback: (item: T) => void): SmzMenuItemCardsBuilder {
    this._item.command = callback;
    return this;
  }

  public setRedirect(paths: string[]): SmzMenuItemCardsBuilder {
    this._item.routerLink = paths;
    return this;
  }

  public setVisibilityRule<T>(callback: (item: T) => boolean): SmzMenuItemCardsBuilder {
    this._item.conditional = { condition: callback, property: 'visible' };
    return this;
  }

  public setActivationRule<T>(callback: (item: T) => boolean): SmzMenuItemCardsBuilder {
    this._item.conditional = { condition: callback, property: 'disabled' };
    return this;
  }

  public hide(): SmzMenuItemCardsBuilder {
    this._item.visible = false;
    return this;
  }

  public disable(): SmzMenuItemCardsBuilder {
    this._item.disabled = true;
    return this;
  }

  public addTransformRule<T>(callback: (item: T) => Partial<MenuItem>): SmzMenuItemCardsBuilder {
    this._item.transforms.push(callback);
    return this;
  }

  public get menu(): SmzCardsMenuBuilder {
    return this._menuBuilder;
  }

  public applyChild(): SmzMenuItemCardsBuilder {
    return this._parent;
  }

}