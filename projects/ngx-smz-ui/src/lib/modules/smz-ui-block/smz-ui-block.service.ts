import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { removeElementFromArray } from '../../common/utils/utils';
import { SmzUiBlockConfig } from './smz-ui-block.component';

@Injectable({providedIn: 'root'})
export class SmzUiBlockService {
  public blocks: SmzUiBlockConfig[] = [];
  public blocked: boolean = false;
  public onChanges: BehaviorSubject<void> = new BehaviorSubject<void>(null);
  constructor() { }

  public add(key: string, component: any): SmzUiBlockConfig {
    const match = this.blocks.find(x => x.key === key);

    if (match == null) {
      const newBlock: SmzUiBlockConfig = {key, component, blocked: false};
      this.blocks.push(newBlock);
      return newBlock;
    }
    else {
      return match;
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
    this.onChanges.next();
  }

  public unBlockAll(): void {
    this.blocks.forEach(x => x.blocked = false);
    this.blocked = false;
    this.onChanges.next();
  }

}