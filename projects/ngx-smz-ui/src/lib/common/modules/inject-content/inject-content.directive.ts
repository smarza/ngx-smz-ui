import { Directive, ViewContainerRef, Input, AfterContentInit } from '@angular/core';
import { InjectContentService } from './inject-content.service';
import { InjectableContentEntity } from './models/inject-content.model';
import { takeWhile } from 'rxjs/operators';
import { UntypedFormGroup } from '@angular/forms';
import { SmzForm, SmzFormsResponse } from '../../../modules/smz-forms/models/smz-forms';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[appInjectContent]',
    standalone: false
})
export class InjectContentDirective implements AfterContentInit
{
    @Input() public appInjectContent: any;
    @Input() public config: SmzForm<any>;
    @Input() public inputs: InjectableContentEntity[];
    @Input() public outputs: string[];
    @Input() public form: UntypedFormGroup;
    @Input() public data: () => SmzFormsResponse<any>;
    @Input() public componentRef: { componentRef: any };
    public isActive = true;

    constructor(public viewContainerRef: ViewContainerRef, private service: InjectContentService)
    {
    }

    public ngAfterContentInit(): void
    {

        if (this.appInjectContent != null)
        {
            setTimeout(() =>
            {
                this.addComp();
            }, 0);
        }
    }

    public addComp(): void
    {

        const componentRef = this.viewContainerRef.createComponent(this.appInjectContent);

        this.inputs.forEach(i =>
        {
            (<any>componentRef.instance)[i.input] = i.data;
        });

        if (this.outputs != null)
        {

            this.outputs.forEach(output =>
            {
                (<any>componentRef.instance)[output]
                    .pipe(takeWhile(x => this.isActive))
                    .subscribe(event =>
                    {
                        // console.log('catch event', event);
                        const emit = {};
                        emit[this.appInjectContent.name] = {};
                        emit[this.appInjectContent.name][output] = event;

                        this.config.functions.customBehavior(this.data(), this.config, this.form, emit);
                    });
            });
        }


        if (this.componentRef != null)
        {
            this.componentRef.componentRef = componentRef;
        }

        // console.log('addComp', componentRef);

        this.service.setComponent(componentRef);
    }


    public removeComp(): void
    {
        console.log('.....removeComp');
        this.isActive = false;
        this.viewContainerRef.remove();
    }
}
