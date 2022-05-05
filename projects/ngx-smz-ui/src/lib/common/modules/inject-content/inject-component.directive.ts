import { Directive, ViewContainerRef, Input, AfterContentInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { SmzDialogContext, SmzInjectable } from '../../../modules/smz-dialogs/models/smz-dialogs';
import { InjectComponentService } from './inject-component.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[appInjectComponent]'
})
export class InjectComponentDirective implements AfterContentInit
{
    @Input() public appInjectComponent: SmzInjectable;
    @Input() public context: SmzDialogContext<any>;
    public isActive = true;

    constructor(public viewContainerRef: ViewContainerRef, private service: InjectComponentService)
    {

    }

    public ngAfterContentInit(): void
    {

        if (this.appInjectComponent != null && this.appInjectComponent.component != null)
        {
            setTimeout(() => this.addComp(), 0);
        }
    }

    public addComp(): void
    {
        const componentRef = this.viewContainerRef.createComponent(this.appInjectComponent.component);

        this.appInjectComponent.inputs.forEach(i =>
        {
            (<any>componentRef.instance)[i.input] = i.data;
        });

        if (this.appInjectComponent.outputs != null)
        {

            this.appInjectComponent.outputs.forEach(output =>
            {
                (<any>componentRef.instance)[output.output]
                    .pipe(takeWhile(x => this.isActive))
                    .subscribe(event =>
                    {

                        if (this.appInjectComponent.type === 'component' && this.context.behaviors.includeComponentResponses)
                        {
                            this.includeObjectResponse(this.context.advancedResponse, this.appInjectComponent.component.name, output.output, event);
                            this.includeFlattedResponse(this.context.simpleResponse, output.output, event);
                        }

                        if (output.callback != null) output.callback(event);
                    });
            });
        }

        this.appInjectComponent.ref = { componentRef: componentRef };
        this.service.setComponent(this.appInjectComponent.componentId, componentRef);
    }

    private includeFlattedResponse(contextResponse: any, property: string, data: any): void
    {
        if (contextResponse[property] == null)
        {
            contextResponse[property] = {};
        }

        contextResponse[property] = data;
    }

    private includeObjectResponse(contextResponse: any, name: string, property: string, data: any): void
    {
        if (contextResponse[name] == null)
        {
            contextResponse[name] = {};
        }

        contextResponse[name][property] = data;
    }

    public removeComp(): void
    {
        // console.log('.....removeComp');
        this.isActive = false;
        this.viewContainerRef.remove();
    }

}
