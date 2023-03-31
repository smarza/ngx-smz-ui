import { NgModule } from '@angular/core';
import { RbkClaimGuardDirective } from './can-access-if.directive';
import { RbkCanAccessPipe } from './can-access.pipe';
import { CommonModule } from '@angular/common';
import { RbkCanAccessAnyPipe } from './can-access-any.pipe';


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        RbkClaimGuardDirective,
        RbkCanAccessPipe,
        RbkCanAccessAnyPipe
    ],
    declarations: [
        RbkClaimGuardDirective,
        RbkCanAccessPipe,
        RbkCanAccessAnyPipe
    ],
    providers: [],
})
export class RbkAccessControlModule { }
