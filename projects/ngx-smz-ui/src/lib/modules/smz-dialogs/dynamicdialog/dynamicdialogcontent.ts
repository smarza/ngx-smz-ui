import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[pDynamicDialogContent]'
})
export class DynamicDialogContent {

	constructor(public viewContainerRef: ViewContainerRef) {}

}


@Directive({
  selector: '[pDynamicDialogFooter]'
})
export class DynamicDialogFooter {

	constructor(public viewContainerRef: ViewContainerRef) {}

}
