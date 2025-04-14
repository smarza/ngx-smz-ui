import { Directive, Input, NgModule, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[customNgForOf]',
    standalone: false
})
export class CustomNgForDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input() public set customNgForOf(context: any[]) {
    this.viewContainer.clear();
    for (const item of context) {
      this.viewContainer.createEmbeddedView(
        this.templateRef,
        { $implicit: this.parseItem(item) }
      );
    }
  }

  private parseItem(item: unknown): any {
    return {
      type: typeof item === 'string' ? 'string' : 'object',
      value: item
    };
  }
}

@NgModule({
  imports: [],
  exports: [CustomNgForDirective],
  declarations: [CustomNgForDirective],
  providers: [],
})
export class CustomNgForModule { }
