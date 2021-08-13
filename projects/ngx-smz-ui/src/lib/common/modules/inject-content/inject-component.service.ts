import { ComponentRef, Injectable, NgZone } from '@angular/core';
import { ɵmarkDirty } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class InjectComponentService
{
    public componentRefs: Map<string, ComponentRef<any>> = new Map<string, ComponentRef<any>>();
    constructor(private zone: NgZone)
    {

    }

    public setComponent(key: string, ref: ComponentRef<any>): void
    {
        this.componentRefs.set(key, ref);
    }

    public updateComponent(key:string, input: string, value: any): void
    {
        var component = this.componentRefs.get(key);
        component.instance[input] = value;
        ɵmarkDirty(component.instance);
    }

    public deleteComponent(key:string): void
    {
        this.componentRefs.delete(key);
    }

    public getComponent(key: string): any
    {
        return this.componentRefs.get(key);
    }

}
