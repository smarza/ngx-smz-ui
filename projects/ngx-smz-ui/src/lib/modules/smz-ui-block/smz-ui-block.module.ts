import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SmzUiBlockDirective } from './smz-ui-block.directive';
import { BlockUIModule } from 'primeng/blockui';
import { SmzUiBlockComponent } from './smz-ui-block.component';

@NgModule({
  imports: [CommonModule, BlockUIModule],
  exports: [SmzUiBlockDirective, SmzUiBlockComponent],
  declarations: [SmzUiBlockComponent, SmzUiBlockDirective]
})
export class NgxSmzUiBlockModule { }