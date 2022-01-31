import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ClickStopPropagationModule } from '../../common/stop-click-propagation/click-stop-propagation.module';
import { NgxSmzDataInfoModule } from '../smz-data-info/smz-data-info.module';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { SmzTreeComponent } from './features/tree/tree.component';
import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { SharedModule } from 'primeng/api';
import { NgxSmzMenuModule } from '../smz-menu/smz-menu.module';
import { SmzSincronizeTreePipe } from './pipes/sincronize-tree.pipe';

@NgModule({
    declarations: [
        SmzTreeComponent,
        SmzSincronizeTreePipe
    ],
    imports: [
        CommonModule,
        SharedModule,
        TableModule,
        ButtonModule,
        FormsModule,
        ClickStopPropagationModule,
        NgxSmzDataInfoModule,
        TooltipModule,
        ContextMenuModule,
        TreeModule,
        TooltipModule,
        InputTextModule,
        SkeletonModule,
        NgxSmzMenuModule
    ],
    exports: [
        SmzTreeComponent,
        SharedModule
    ],
})
export class NgxSmzTreesModule { }
