import { ComponentRef, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class InjectContentService
{
    // public componentRefs: Map<string, ComponentRef<any>> = new Map<string, ComponentRef<any>>();
    public ref: any;
    constructor()
    {

    }

    public setComponent(ref: ComponentRef<any>): void
    {
        // console.log('InjectContentService size', this.componentRefs.size);
        // this.componentRefs.set(key, ref);
        this.ref = ref;
    }

    public deleteComponent(): void
    {
        // console.log('deleting', key, this.componentRefs);
        // this.componentRefs.delete(key);
        this.ref = null;
    }

    public getComponent(): any
    {
        return this.ref.instance;
        // return this.componentRefs.get(key).instance;
    }

}
