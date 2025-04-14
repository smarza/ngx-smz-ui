import { NgModule } from '@angular/core';
import { InputChangeDetectionDirective } from './input-detection.directive';

@NgModule({
    declarations: [
        InputChangeDetectionDirective
    ],
    exports: [
        InputChangeDetectionDirective
    ],
})
export class InputBlurDetectionModule { }
