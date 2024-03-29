import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { DynamicDialogComponent } from './dynamicdialog';
import { DynamicDialogInjector } from './dynamicdialog-injector';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
import { SmzDynamicDialogConfig } from '../models/smz-dialogs';
import { DialogFooterComponent } from '../features/dialog-footer/dialog-footer.component';
import { GuideFooterComponent } from '../features/guide-footer/guide-footer.component';

@Injectable({
    providedIn: 'root'
})
export class DialogService
{

    dialogComponentRefMap: Map<DynamicDialogRef, ComponentRef<DynamicDialogComponent>> = new Map();

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector)
    {
    }

    public open(componentType: Type<any>, config: SmzDynamicDialogConfig)
    {
        const dialogRef = this.appendDialogComponentToBody(config);

        const ref = this.dialogComponentRefMap.get(dialogRef);
        ref.instance.childComponentType = componentType;

        if (config.data?.behaviors?.showAsLinkedOverlayPanel)
        {
            ref.instance.footerComponentType = GuideFooterComponent;
        }
        else {
            ref.instance.footerComponentType = DialogFooterComponent;
        }


        return dialogRef;
    }

    private appendDialogComponentToBody(config: SmzDynamicDialogConfig)
    {
        const map = new WeakMap();
        map.set(SmzDynamicDialogConfig, config);
        map.set(DynamicDialogConfig, config);

        const dialogRef = new DynamicDialogRef();
        map.set(DynamicDialogRef, dialogRef);

        const sub = dialogRef.onClose.subscribe(() =>
        {
            this.dialogComponentRefMap.get(dialogRef).instance.close();
        });

        const destroySub = dialogRef.onDestroy.subscribe(() =>
        {
            this.removeDialogComponentFromBody(dialogRef);
            destroySub.unsubscribe();
            sub.unsubscribe();
        });

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicDialogComponent);
        const componentRef = componentFactory.create(new DynamicDialogInjector(this.injector, map));

        if (config.openMaximized) {
            componentRef.instance.maximized = true;
        }

        this.appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        this.dialogComponentRefMap.set(dialogRef, componentRef);
        return dialogRef;
    }

    private removeDialogComponentFromBody(dialogRef: DynamicDialogRef)
    {
        if (!dialogRef || !this.dialogComponentRefMap.has(dialogRef))
        {
            return;
        }

        const dialogComponentRef = this.dialogComponentRefMap.get(dialogRef);
        this.appRef.detachView(dialogComponentRef.hostView);
        dialogComponentRef.destroy();
        this.dialogComponentRefMap.delete(dialogRef);
    }
}

