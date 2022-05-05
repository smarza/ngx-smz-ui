import { Directive, ViewContainerRef, Input, AfterContentInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { InjectComponentService } from './inject-component.service';
import { SmzInjectableComponent } from './models/injectable.model';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[smzGenericInjectComponent]'
})
export class GenericInjectComponentDirective implements AfterContentInit, OnDestroy
{
    @Input() public smzGenericInjectComponent: SmzInjectableComponent;
    @Input() public context: any;
    public isActive = true;

    constructor(public viewContainerRef: ViewContainerRef, private service: InjectComponentService)
    {

    }

    public ngAfterContentInit(): void
    {

        if (this.smzGenericInjectComponent != null && this.smzGenericInjectComponent.component != null)
        {
            setTimeout(() =>
            {
                this.addComp();
            }, 0);
        }
    }

    public addComp(): void
    {

        const componentRef = this.viewContainerRef.createComponent(this.smzGenericInjectComponent.component, {});

        if (this.smzGenericInjectComponent.styleClass != null) {
            componentRef.location.nativeElement.classList.add(...this.smzGenericInjectComponent.styleClass.split(' '));
        }


        this.smzGenericInjectComponent.inputs.forEach(i =>
        {
            (<any>componentRef.instance)[i.input] = i.data;
        });

        if (this.smzGenericInjectComponent.outputs != null)
        {

            this.smzGenericInjectComponent.outputs.forEach(output =>
            {
                (<any>componentRef.instance)[output.output]
                    .pipe(takeWhile(x => this.isActive))
                    .subscribe(event =>
                    {
                        if (output.callback != null) output.callback(event);
                    });
            });
        }

        this.smzGenericInjectComponent.ref = { componentRef: componentRef };
        this.service.setComponent(this.smzGenericInjectComponent.componentId, componentRef);

        componentRef.hostView.markForCheck();
    }

    public removeComp(): void
    {
        // console.log('.....removeComp');
        this.isActive = false;
        this.viewContainerRef.remove();
    }

    public ngOnDestroy(): void {
        this.removeComp();
    }

}
