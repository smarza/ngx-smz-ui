import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { GlobalInjector } from '../../../common/services/global-injector';

@Injectable({providedIn: 'root'})
export class AccessControlService {
  private store = inject(Store);
  constructor() { }

  public hasClaim(claims: string[] | undefined): boolean {
    if (claims == null || claims.length === 0) {
      return true;
    }

    const validationSelectors = GlobalInjector.config.rbkUtils.authorization.validationSelectors;
    return this.store.selectSnapshot(validationSelectors.hasAnyOfClaimAccess(claims));
  }

}