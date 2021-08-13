import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectContentDirective } from './inject-content.directive';
import { InjectComponentDirective } from './inject-component.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [InjectContentDirective, InjectComponentDirective],
    exports: [InjectContentDirective, InjectComponentDirective],
    providers: []
})
export class InjectContentAppModule { }
