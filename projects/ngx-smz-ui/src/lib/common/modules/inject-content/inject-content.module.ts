import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectContentDirective } from './inject-content.directive';
import { InjectComponentDirective } from './inject-component.directive';
import { GenericInjectComponentDirective } from './generic-inject-component.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [InjectContentDirective, InjectComponentDirective, GenericInjectComponentDirective],
    exports: [InjectContentDirective, InjectComponentDirective, GenericInjectComponentDirective],
    providers: []
})
export class InjectContentAppModule { }
