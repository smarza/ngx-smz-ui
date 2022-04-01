import { MenuItem } from 'primeng/api';
import { uuidv4 } from '../../common/utils/utils';
import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';
import { SmzEasyTableActionContent, SmzEasyTableContentType } from '../../standalones/easy-table/models/smz-easy-table-contents';
import { SmzEasyTableBodyColumn, SmzEasyTableHeader } from '../../standalones/easy-table/models/smz-easy-table-state';
import { SmzDocumentWidthTypes } from '../smz-documents/document-base-cell';
import { SmzEasyTableBuilder } from './state-builder';

export class SmzEasyMenuTableBuilder {
  constructor(private _tableBuilder: SmzEasyTableBuilder, items: SmzMenuItem[] = []) {

    const key = uuidv4();

    const column: SmzEasyTableBodyColumn = { key, isVisible: true, styleClass: '', content: {
      type: SmzEasyTableContentType.ACTION,
      items: items,
      dataPath: ''
    } };

    const header: SmzEasyTableHeader = { key, isVisible: true, label: '', widthClass: '', styleClass: '', sort: null, searchPath: '', sortPath: '' };

    this._tableBuilder._tempMenu = {
      header,
      column
    };

  }

  public setHeader(header: string): SmzEasyMenuTableBuilder {
    this._tableBuilder._tempMenu.header.label = header;
    return this;
  }

  public setWidth(widthClass: SmzDocumentWidthTypes): SmzEasyMenuTableBuilder {
    this._tableBuilder._tempMenu.header.widthClass = widthClass;
    return this;
  }

  public setHeaderStyles(styleClass: string): SmzEasyMenuTableBuilder {
    this._tableBuilder._tempMenu.header.styleClass = styleClass;
    return this;
  }

  public useDynamic(callback: (row: any) => SmzMenuItem[]): SmzEasyMenuTableBuilder {

    if ((this._tableBuilder._tempMenu.column?.content as SmzEasyTableActionContent)?.items != null && (this._tableBuilder._tempMenu.column?.content as SmzEasyTableActionContent)?.items.length > 0) {
      throw Error('[Smz Eazy Table] You can\'t call \'dynamicMenu\' if the menu items are already set.');
    }

    (this._tableBuilder._tempMenu.column.content as SmzEasyTableActionContent).callback = callback;
    (this._tableBuilder._tempMenu.column.content as SmzEasyTableActionContent).items = null;

    return this;
  }

  public item(label: string, icon: string = null, tooltip: string = null): SmzMenuItemEasyTableBuilder {

    if ((this._tableBuilder._tempMenu.column?.content as SmzEasyTableActionContent)?.callback != null) {
      throw Error('[Smz Eazy Table] You can\'t call \'item\' while using dynamic menu.');
    }

    const item: SmzMenuItem = { label, icon, tooltip, transforms: [], visible: true, disabled: false };
    (this._tableBuilder._tempMenu.column.content as SmzEasyTableActionContent).items.push(item);

    return new SmzMenuItemEasyTableBuilder(this, null, item);
  }

  public separator(): SmzEasyMenuTableBuilder {

    if ((this._tableBuilder._tempMenu.column?.content as SmzEasyTableActionContent)?.callback != null) {
      throw Error('[Smz Eazy Table] You can\'t call \'separator\' while using dynamic menu.');
    }

    (this._tableBuilder._tempMenu.column.content as SmzEasyTableActionContent).items.push({ separator: true });
    return this;
  }

  public get table(): SmzEasyTableBuilder {
    return this._tableBuilder;
  }

}

export class SmzMenuItemEasyTableBuilder {
  constructor(private _menuBuilder: SmzEasyMenuTableBuilder, private _parent: SmzMenuItemEasyTableBuilder, private _item: SmzMenuItem) {

  }

  public addChild(label: string, icon: string = null): SmzMenuItemEasyTableBuilder {
    if (this._item.items == null) {
      this._item.items = [];
    }
    const item: SmzMenuItem = { label, icon, transforms: [] };
    this._item.items.push(item);

    return new SmzMenuItemEasyTableBuilder(this._menuBuilder, this, item);
  }

  public setCallback<T>(callback: (item: T) => void): SmzMenuItemEasyTableBuilder {
    this._item.command = callback;
    return this;
  }

  public setRedirect(paths: string[]): SmzMenuItemEasyTableBuilder {
    this._item.routerLink = paths;
    return this;
  }

  public setVisibilityRule<T>(callback: (item: T) => boolean): SmzMenuItemEasyTableBuilder {
    this._item.conditional = { condition: callback, property: 'visible' };
    return this;
  }

  public setActivationRule<T>(callback: (item: T) => boolean): SmzMenuItemEasyTableBuilder {
    this._item.conditional = { condition: callback, property: 'disabled' };
    return this;
  }

  public hide(): SmzMenuItemEasyTableBuilder {
    this._item.visible = false;
    return this;
  }

  public disable(): SmzMenuItemEasyTableBuilder {
    this._item.disabled = true;
    return this;
  }

  public addTransformRule<T>(callback: (item: T) => Partial<MenuItem>): SmzMenuItemEasyTableBuilder {
    this._item.transforms.push(callback);
    return this;
  }

  public get menu(): SmzEasyMenuTableBuilder {
    return this._menuBuilder;
  }

  public applyChild(): SmzMenuItemEasyTableBuilder {
    return this._parent;
  }

}