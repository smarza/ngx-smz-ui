import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { GlobalInjector } from '../../../../common/services/global-injector';

@Pipe({
    name: 'rbkCanAccessAny',
    standalone: false
})

@Injectable()
export class RbkCanAccessAnyPipe implements PipeTransform {

    constructor(private store: Store) {
    }

    public transform(claims: string[]): boolean {
        const validationSelectors = GlobalInjector.config.rbkUtils.authorization.validationSelectors;

        return this.store.selectSnapshot(validationSelectors.hasAnyOfClaimAccess(claims));
    }

}
