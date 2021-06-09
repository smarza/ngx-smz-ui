import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmzTableComponent } from './features/table/table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgxSmzDataPipesModule } from '../../common/data-pipes/data-pipes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { TooltipModule } from 'primeng/tooltip';
import { SmzTableMenuPipe } from './pipes/table-menu.pipe';
import { SmzCloneTableItemsPipe } from './pipes/clone-table-items.pipe';
import { SkeletonModule } from 'primeng/skeleton';
import { SmzColumnFilterComponent } from './components/smz-filter-column.component';
import { SmzColumnFilter2Component } from './components/smz-filter-column-2.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SmzEditableSourcePipe } from './pipes/editable-source.pipe';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SmzContentErrorsPipe } from './pipes/content-errors.pipe';
import { GlobalInjector } from '../../common/services/global-injector';

@NgModule({
    declarations: [
        SmzTableComponent,
        SmzTableContextPipe,
        SmzTableContentPipe,
        SmzFilterObjectPipe,
        SmzContentIconMatchesPipe,
        SmzTableMenuPipe,
        SmzCloneTableItemsPipe,
        SmzColumnFilterComponent,
        SmzColumnFilter2Component,
        SmzEditableSourcePipe,
        SmzContentErrorsPipe
    ],
    imports: [
        CommonModule,
        PrimeSharedModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        NgxSmzDataPipesModule,
        MultiSelectModule,
        DropdownModule,
        CalendarModule,
        SmzMenuModule,
        FormsModule,
        TableItemActionsModule,
        ClickStopPropagationModule,
        NgxSmzDataInfoModule,
        TooltipModule,
        SkeletonModule,
        InputTextareaModule,
        OverlayPanelModule,
        ReactiveFormsModule
    ],
    exports: [
        SmzTableComponent,
        PrimeSharedModule
    ],
})
export class NgxSmzTablesModule
{
    constructor(injector: Injector) {
        GlobalInjector.instance = injector;
    }
}
