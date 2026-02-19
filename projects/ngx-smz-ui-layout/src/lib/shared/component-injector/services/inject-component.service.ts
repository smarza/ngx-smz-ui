import { ComponentRef, Injectable } from '@angular/core';

// Use a type alias with Record to satisfy the ESLint rule.
export type DynamicComponent = Record<string, unknown>;

@Injectable({
  providedIn: 'root'
})
export class InjectComponentService {
  public componentRefs: Map<string, ComponentRef<DynamicComponent>> = new Map<string, ComponentRef<DynamicComponent>>();

  public setComponent(key: string, ref: ComponentRef<DynamicComponent>): void {
    this.componentRefs.set(key, ref);
  }

  public updateComponent(key: string, input: string, value: unknown): void {
    const component = this.componentRefs.get(key);
    if (component) {
      component.instance[input] = value;
    }
  }

  public deleteComponent(key: string): void {
    this.componentRefs.delete(key);
  }

  public getComponent(key: string): ComponentRef<DynamicComponent> | undefined {
    return this.componentRefs.get(key);
  }
}
