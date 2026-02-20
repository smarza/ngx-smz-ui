import { Injectable, signal } from '@angular/core';

export interface DemosTocItem {
  id: string;
  label: string;
}

@Injectable({ providedIn: 'root' })
export class DemosTocService {
  private readonly _items = signal<DemosTocItem[]>([]);
  private readonly _activeId = signal<string | null>(null);

  readonly items = this._items.asReadonly();
  readonly activeId = this._activeId.asReadonly();

  setItems(items: DemosTocItem[]): void {
    this._items.set(items);
  }

  setActiveId(id: string | null): void {
    this._activeId.set(id);
  }

  clear(): void {
    this._items.set([]);
    this._activeId.set(null);
  }
}
