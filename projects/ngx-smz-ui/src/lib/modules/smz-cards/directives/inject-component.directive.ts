import { Directive, ViewContainerRef, Input, AfterContentInit, OnDestroy } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';
import { takeWhile } from 'rxjs/operators';
import { SmzInjectable } from '../models/smz-cards-component';

@Directive({
    selector: '[smzInjectDataPathComponent]'
})
export class SmzInjectDataPathComponent implements AfterContentInit, OnDestroy
{
    @Input() public smzInjectDataPathComponent: SmzInjectable;
    @Input() public data: any;
    public isActive = true;

    constructor(public viewContainerRef: ViewContainerRef)
    {

    }

    public ngAfterContentInit(): void
    {

        if (this.smzInjectDataPathComponent != null && this.smzInjectDataPathComponent.component != null)
        {
            setTimeout(() =>
            {
                this.addComp();
            }, 0);
        }
    }

    public addComp(): void
    {

        const componentRef = this.viewContainerRef.createComponent(this.smzInjectDataPathComponent.component, {});

        // if (this.smzInjectDataPathComponent.styleClass != null) {
        //     componentRef.location.nativeElement.classList.add(...this.smzInjectDataPathComponent.styleClass.split(' '));
        // }

        this.smzInjectDataPathComponent.inputs.forEach(i =>
        {
            const data = i.dataPath == null ? this.data : this.getValue(this.data, i.dataPath);
            (<any>componentRef.instance)[i.input] = data;
        });

        if (this.smzInjectDataPathComponent.outputs != null)
        {

            this.smzInjectDataPathComponent.outputs.forEach(output =>
            {
                (<any>componentRef.instance)[output.output]
                    .pipe(takeWhile(x => this.isActive))
                    .subscribe(event =>
                    {
                        if (output.callback != null) output.callback(event);
                    });
            });
        }

        // this.smzInjectDataPathComponent.ref = { componentRef: componentRef };

        componentRef.hostView.markForCheck();
    }

    public removeComp(): void
    {
        // console.log('.....removeComp');
        this.isActive = false;
        this.viewContainerRef.remove();
    }

    private getValue(data: any, field: string): string {
        if (data == null) return '';
        return ObjectUtils.resolveFieldData(data, field) ?? '';
      }

    public ngOnDestroy(): void {
        this.removeComp();
    }

}
