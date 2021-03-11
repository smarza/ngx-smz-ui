import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmzTableComponent } from './features/table/table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataPipesModule } from '../../common/data-pipes/data-pipes.module';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { SmzTableContextPipe } from './pipes/table-context.pipe';
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { SmzMenuModule } from './components/menu';
import { SmzTableContentPipe } from './pipes/table-content.pipe';
import { SmzContentIconMatchesPipe } from './pipes/content-icon-matches.pipe';
import { SmzFilterObjectPipe } from './pipes/filter-object.pipe';
import { TableItemActionsModule } from '../../common/table-item-actions/table-item-actions.module';
import { ClickStopPropagationModule } from '../../common/stop-click-propagation/click-stop-propagation.module';
import { NgxSmzDataInfoModule } from '../smz-data-info/smz-data-info.module';

@NgModule({
    declarations: [
        SmzTableComponent,
        SmzTableContextPipe,
        SmzTableContentPipe,
        SmzFilterObjectPipe,
        SmzContentIconMatchesPipe
    ],
    imports: [
        CommonModule,
        PrimeSharedModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        DataPipesModule,
        MultiSelectModule,
        DropdownModule,
        CalendarModule,
        SmzMenuModule,
        FormsModule,
        TableItemActionsModule,
        ClickStopPropagationModule,
        NgxSmzDataInfoModule
    ],
    exports: [
        SmzTableComponent,
        PrimeSharedModule
    ],
})
export class NgxSmzTablesModule { }
