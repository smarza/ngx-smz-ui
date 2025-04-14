import { Directive, ViewContainerRef, Input, AfterContentInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { InjectComponentService } from './inject-component.service';
import { SmzInjectableComponent } from './models/injectable.model';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[smzStandaloneInjectComponent]',
    standalone: true
})
export class StandaloneInjectComponentDirective implements AfterContentInit, OnDestroy
{
    @Input() public smzStandaloneInjectComponent: SmzInjectableComponent;
    @Input() public context: any;
    public isActive = true;

    constructor(public viewContainerRef: ViewContainerRef, private service: InjectComponentService)
    {
    }

    public ngAfterContentInit(): void
    {
        if (this.smzStandaloneInjectComponent != null && this.smzStandaloneInjectComponent.component != null)
        {
            setTimeout(() =>
            {
                this.addComp();
            }, 0);
        }
    }

    public addComp(): void
    {

        const componentRef = this.viewContainerRef.createComponent(this.smzStandaloneInjectComponent.component, {});

        if (this.smzStandaloneInjectComponent.styleClass != null) {
            componentRef.location.nativeElement.classList.add(...this.smzStandaloneInjectComponent.styleClass.split(' '));
        }


        this.smzStandaloneInjectComponent.inputs.forEach(i =>
        {
            (<any>componentRef.instance)[i.input] = i.data;
        });

        if (this.smzStandaloneInjectComponent.outputs != null)
        {

            this.smzStandaloneInjectComponent.outputs.forEach(output =>
            {
                (<any>componentRef.instance)[output.output]
                    .pipe(takeWhile(x => this.isActive))
                    .subscribe(event =>
                    {
                        if (output.callback != null) output.callback(event);
                    });
            });
        }

        this.smzStandaloneInjectComponent.ref = { componentRef: componentRef };
        this.service.setComponent(this.smzStandaloneInjectComponent.componentId, componentRef);

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
