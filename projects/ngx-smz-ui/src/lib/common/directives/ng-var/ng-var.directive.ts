import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

export class NgVarContext<T = unknown> {
  public $implicit: T = null!;
  public ngVar: T = null!;
}

@Directive({
    selector: '[ngVar]',
    standalone: false
})
export class NgVar<T = unknown> {
  private _context: NgVarContext<T> = new NgVarContext<T>();
  @Input() public set ngVar(context: T) {
    this._context.$implicit = this._context.ngVar = context;

    if (!this.hasView) {
      this.vcRef.createEmbeddedView(this.templateRef, this._context);
      this.hasView = true;
    }
  }

  private hasView = false;

  constructor(private templateRef: TemplateRef<NgVarContext<T>>, private vcRef: ViewContainerRef) {}

   /** @internal */
   public static ngVarUseVarTypeGuard: void;

   /**
    * Assert the correct type of the expression bound to the `ngVar` input within the template.
    *
    * The presence of this static field is a signal to the Ivy template type check compiler that
    * when the `NgVar` structural directive renders its template, the type of the expression bound
    * to `ngVar` should be narrowed in some way. For `NgVar`, the binding expression itself is used to
    * narrow its type, which allows the strictNullChecks feature of TypeScript to work with `NgVar`.
    */
   static ngTemplateGuard_ngVar: 'binding';

   /**
    * Asserts the correct type of the context for the template that `NgVar` will render.
    *
    * The presence of this method is a signal to the Ivy template type-check compiler that the
    * `NgVar` structural directive renders its template with a specific context type.
    */
   static ngTemplateContextGuard<T>(dir: NgVar<T>, ctx: any):
       ctx is NgVarContext<Exclude<T, false|0|''|null|undefined>> {
     return true;
   }
}


