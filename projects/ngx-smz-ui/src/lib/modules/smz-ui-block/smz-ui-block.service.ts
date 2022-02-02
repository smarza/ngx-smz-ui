import { Injectable } from '@angular/core';
import { removeElementFromArray } from '../../common/utils/utils';
import { SmzUiBlockConfig } from './smz-ui-block.component';

@Injectable({providedIn: 'root'})
export class SmzUiBlockService {
  public blocks: SmzUiBlockConfig[] = [];
  public blocked: boolean = false;
  constructor() { }

  public add(key: string, component: any): void {
    const match = this.blocks.find(x => x.key === key);

    if (match == null) {
      this.blocks.push({key, component, blocked: false});
    }
  }

  public update(key: string, component: any, blocked: boolean): void {
    const match = this.blocks.find(x => x.key === key);

    if (match != null) {
      match.blocked = blocked;
    }
    else {
      this.add(key, component);
    }
  }

  public remove(key: string): void {
    removeElementFromArray(this.blocks, key, 'key');
  }

  public blockAll(): void {
    this.blocks.forEach(x => x.blocked = true);
    this.blocked = true;
  }

  public unBlockAll(): void {
    this.blocks.forEach(x => x.blocked = false);
    this.blocked = false;
  }

}