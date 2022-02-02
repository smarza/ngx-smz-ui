import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RbkPipesModule } from '../rbk-utils/pipes/rbk-pipes.module';

import { SmzSvgComponent } from './smz-svg.component';
import { OverlayPanelModule } from '../prime/overlaypanel/overlaypanel';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RbkPipesModule,
    OverlayPanelModule
  ],
  exports: [
    SmzSvgComponent
  ],
  declarations: [
    SmzSvgComponent,
  ],
  providers: [],
})
export class SmzSvgModule { }
