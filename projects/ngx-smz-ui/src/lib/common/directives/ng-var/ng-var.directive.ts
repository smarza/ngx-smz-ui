import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngVar]',
})
export class NgVarDirective {
  @Input() public set ngVar(context: unknown) {
    this.context.$implicit = this.context.ngVar = context;

    if (!this.hasView) {
      this.vcRef.createEmbeddedView(this.templateRef, this.context);
      this.hasView = true;
    }
  }

  private context: { $implicit: unknown, ngVar: unknown } = { $implicit: null, ngVar: null };

  private hasView = false;

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {}
}