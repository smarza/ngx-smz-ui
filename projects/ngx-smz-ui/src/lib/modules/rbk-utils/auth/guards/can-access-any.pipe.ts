import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthenticationSelectors } from '../../../../state/global/authentication/authentication.selectors';

@Pipe({
    name: 'rbkCanAccessAny'
})

@Injectable()
export class RbkCanAccessAnyPipe implements PipeTransform {

    constructor(private store: Store) {
    }

    public transform(claims: string[]): boolean {
        return this.store.selectSnapshot(AuthenticationSelectors.hasAnyOfClaimAccess(claims));
    }

}
