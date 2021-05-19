import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgxSmzDataPipesModule } from '../../common/data-pipes/data-pipes.module';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { TableItemActionsModule } from '../../common/table-item-actions/table-item-actions.module';
import { ClickStopPropagationModule } from '../../common/stop-click-propagation/click-stop-propagation.module';
import { NgxSmzDataInfoModule } from '../smz-data-info/smz-data-info.module';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { SmzTreeComponent } from './features/tree/tree.component';
import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';

@NgModule({
    declarations: [
        SmzTreeComponent,
    ],
    imports: [
        CommonModule,
        PrimeSharedModule,
        TableModule,
        ButtonModule,
        FormsModule,
        ClickStopPropagationModule,
        NgxSmzDataInfoModule,
        TooltipModule,
        ContextMenuModule,
        TreeModule,
        TooltipModule,
        SkeletonModule
    ],
    exports: [
        SmzTreeComponent,
        PrimeSharedModule
    ],
})
export class NgxSmzTreesModule { }
