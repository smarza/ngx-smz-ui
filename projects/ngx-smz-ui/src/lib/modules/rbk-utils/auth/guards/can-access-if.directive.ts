import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthenticationSelectors } from '../../state/global/authentication/authentication.selectors';

@Directive({ selector: '[rbkClaimGuard]'})
export class RbkClaimGuardDirective {

  constructor(
    private store: Store,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set rbkClaimGuard(claim: string) {
    const canAccess = this.store.select(AuthenticationSelectors.hasClaimAccess(claim));

    if (canAccess)  {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else {
      this.viewContainer.clear();
    }
  }
}