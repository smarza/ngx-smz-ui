import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DynamicDialogComponent } from '../../smz-dialogs/dynamicdialog/dynamicdialog';
import { DynamicDialogConfig } from '../../smz-dialogs/dynamicdialog/dynamicdialog-config';
import { generateGUID } from '../../../common/utils/guid-generator';

export interface SmzDockItem extends MenuItem {
  id: string;
  type?: 'dialog',
  component?: DynamicDialogComponent;
}

@Injectable({ providedIn: 'root' })
export class SmzDockService {
  public dockItems: SmzDockItem[] = [];
  constructor() {
  }

  public appendDialog(component: DynamicDialogComponent): void {
    const config: DynamicDialogConfig = component.config;

    const newItem: SmzDockItem = {
      id: generateGUID(),
      label: config.minimizeLabel,
      icon: config.minimizeDockImagePath,
      type: 'dialog',
      component
    };

    this.dockItems = [...this.dockItems, newItem];

  }

  public remove(id: string): void {
    this.dockItems = this.dockItems.filter(x => x.id !== id);
  }

}