import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SmzDraggable } from './directives/smz-drag';
import { SmzDroppable } from './directives/smz-drop';

@NgModule({
  imports: [CommonModule],
  exports: [SmzDraggable, SmzDroppable],
  declarations: [SmzDraggable, SmzDroppable]
})
export class SmzDragDropModule {}