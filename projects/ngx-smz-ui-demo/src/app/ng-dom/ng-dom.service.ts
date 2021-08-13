import { DomPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ComponentData, InjectableContentEntity, InjectableOutput } from 'ngx-smz-ui';
import { takeWhile } from 'rxjs/operators';

@Injectable()
export class NgDomService {
  private portalHost: DomPortalOutlet;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector,
    ) {}

  public attach(targetId: string, componentData: ComponentData): void {
    const element: HTMLElement = this.document.getElementById(targetId);

    this.portalHost = new DomPortalOutlet(
      element,
      this._componentFactoryResolver,
      this._appRef,
      this._injector
    );

    const componentPortal: ComponentPortal<any> = new ComponentPortal(componentData.component);

    const componentRef = this.portalHost.attach(componentPortal);

    this.bindingInputs(componentRef, componentData.inputs);
    this.bindingOutputs(componentRef, componentData.outputs);

    componentRef.changeDetectorRef.detectChanges();
  }

  public attach2(targetId: string, componentData: ComponentData): void {
    const element: HTMLElement = this.document.getElementById(targetId);

    this.portalHost = new DomPortalOutlet(
      element,
      this._componentFactoryResolver,
      this._appRef,
      this._injector
    );

    const componentPortal: ComponentPortal<any> = new ComponentPortal(componentData.component);

    const componentRef = this.portalHost.attach(componentPortal);

    this.bindingInputs(componentRef, componentData.inputs);
    this.bindingOutputs(componentRef, componentData.outputs);

    componentRef.changeDetectorRef.detectChanges();
  }

  public detach(): void {
    this.portalHost.detach();
  }

private bindingInputs(componentRef: ComponentRef<any>, inputs: InjectableContentEntity[]): void  {
    inputs?.forEach(i => { (<any>componentRef.instance)[i.input] = i.data; });
}

private bindingOutputs(componentRef: ComponentRef<any>, outputs: InjectableOutput[]): void  {

    outputs?.forEach(item =>
    {
        (<any>componentRef.instance)[item.output]
            .pipe(takeWhile(() => (<any>componentRef?.instance) != null))
            .subscribe((event: any) =>
            {
                console.log('catch output event', event);
                item.callback(event);
            });
    });

}
}