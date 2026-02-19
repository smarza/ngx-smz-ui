import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SmzViewportDirective } from './smz-viewport.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SmzViewportDirective],
  exports: [SmzViewportDirective]
})
export class NgxSmzViewportModule {}
