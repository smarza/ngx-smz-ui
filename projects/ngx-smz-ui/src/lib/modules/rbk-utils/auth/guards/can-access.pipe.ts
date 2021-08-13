import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthenticationSelectors } from '../../state/global/authentication/authentication.selectors';

@Pipe({
    name: 'rbkCanAccess'
})

@Injectable()
export class RbkCanAccessPipe implements PipeTransform {

    constructor(private store: Store) {
    }

    public transform(claim: string): boolean {
        return this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(claim));
    }

}
