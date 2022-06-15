import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from 'primeng/api';
import { NgxSmzMenuModule } from '../smz-menu/smz-menu.module';
import { SmzTreeWithDetailsComponent } from './features/tree-with-details/tree-with-details.component';
import { NgxSmzTreesModule } from '../smz-trees/ngx-smz-trees.module';
import { NgCloneModule } from '../../common/directives/ng-clone/ng-clone.module';
import { NgxSmzUiBlockModule } from '../smz-ui-block/smz-ui-block.module';

@NgModule({
    declarations: [
      SmzTreeWithDetailsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ButtonModule,
        FormsModule,
        TooltipModule,
        NgxSmzMenuModule,
        NgxSmzTreesModule,
        NgCloneModule,
        NgxSmzUiBlockModule,
    ],
    exports: [
        SmzTreeWithDetailsComponent,
        SharedModule
    ],
})
export class NgxSmzTreeWithDetailsModule { }
