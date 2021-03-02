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

@NgModule({
    declarations: [
        SmzTableComponent,
        SmzTableContextPipe
    ],
    imports: [
        CommonModule,
        PrimeSharedModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        DataPipesModule,
        MultiSelectModule,
        CalendarModule,
        FormsModule
    ],
    exports: [
        SmzTableComponent,
        PrimeSharedModule
    ],
})
export class NgxSmzTablesModule { }
