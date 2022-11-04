import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';

@Directive({
  selector: '[ngClone]',
})
export class NgCloneDirective {
  @Input() public set ngClone(context: unknown) {
    const cloned = cloneDeep(context);

    this.context.$implicit = this.context.ngClone = cloned;

    if (!this.hasView) {
      this.vcRef.createEmbeddedView(this.templateRef, this.context);
      this.hasView = true;
    }
  }

  private context: { $implicit: unknown, ngClone: unknown } = { $implicit: null, ngClone: null };

  private hasView = false;

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {}
}