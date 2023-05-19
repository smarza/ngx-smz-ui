import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { GlobalInjector } from '../../../../common/services/global-injector';

@Pipe({
    name: 'rbkCanAccess'
})

@Injectable()
export class RbkCanAccessPipe implements PipeTransform {

    constructor(private store: Store) {
    }

    public transform(claim: string): boolean {
        if (claim == null) {
            return true;
        }

        const validationSelectors = GlobalInjector.config.rbkUtils.authorization.validationSelectors;
        return this.store.selectSnapshot(validationSelectors.hasClaimAccess(claim));
    }

}
