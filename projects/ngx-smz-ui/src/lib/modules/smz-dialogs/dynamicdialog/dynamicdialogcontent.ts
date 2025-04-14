import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[pDynamicDialogContent]',
    standalone: false
})
export class DynamicDialogContent {

	constructor(public viewContainerRef: ViewContainerRef) {}

}


@Directive({
    selector: '[pDynamicDialogFooter]',
    standalone: false
})
export class DynamicDialogFooter {

	constructor(public viewContainerRef: ViewContainerRef) {}

}
