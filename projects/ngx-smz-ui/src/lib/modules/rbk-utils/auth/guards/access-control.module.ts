import { NgModule } from '@angular/core';
import { RbkClaimGuardDirective } from './can-access-if.directive';
import { RbkCanAccessPipe } from './can-access.pipe';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        RbkClaimGuardDirective,
        RbkCanAccessPipe,
    ],
    declarations: [
        RbkClaimGuardDirective,
        RbkCanAccessPipe,
    ],
    providers: [],
})
export class RbkAccessControlModule { }
