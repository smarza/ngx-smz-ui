import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmzTableComponent } from './features/table/table.component';
import { TableModule } from '../prime/table/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgxSmzDataPipesModule } from '../../common/data-pipes/data-pipes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { SmzTableContextPipe } from './pipes/table-context.pipe';
import { SharedModule } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { SmzTableContentPipe } from './pipes/table-content.pipe';
import { SmzContentIconMatchesPipe } from './pipes/content-icon-matches.pipe';
import { SmzFilterObjectPipe } from './pipes/filter-object.pipe';
import { TableItemActionsModule } from '../../common/table-item-actions/table-item-actions.module';
import { ClickStopPropagationModule } from '../../common/stop-click-propagation/click-stop-propagation.module';
import { NgxSmzDataInfoModule } from '../smz-data-info/smz-data-info.module';
import { TooltipModule } from 'primeng/tooltip';
import { SmzCloneTableItemsPipe } from './pipes/clone-table-items.pipe';
import { SkeletonModule } from 'primeng/skeleton';
import { SmzColumnFilterComponent } from './components/smz-filter-column.component';
import { SmzColumnFilter2Component } from './components/smz-filter-column-2.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SmzEditableSourcePipe } from './pipes/editable-source.pipe';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SmzContentErrorsPipe } from './pipes/content-errors.pipe';
import { SmzTableValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { ValidationMessagesPipe } from './components/validation-messages/validation-messages.pipe';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgxSmzMenuModule } from '../smz-menu/smz-menu.module';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SmzSincronizeTablePipe } from './pipes/sincronize-table.pipe';
import { SmzTableContentComponent } from './components/table-content/table-content.component';
import { NgVarModule } from '../../common/directives/ng-var/ng-var.module';
import { SmzTableContentActionsComponent } from './components/table-content-actions/table-content-actions.component';
import { SmzTableCaptionButtonsComponent } from './components/table-caption-buttons/table-caption-buttons.component';
import { RbkAccessControlModule } from '../rbk-utils/public-api';
import { SmzTableHeaderActionsComponent } from './components/table-header-actions/table-header-actions.component';

@NgModule({
    declarations: [
        SmzTableComponent,
        SmzTableContextPipe,
        SmzTableContentPipe,
        SmzFilterObjectPipe,
        SmzContentIconMatchesPipe,
        SmzCloneTableItemsPipe,
        SmzColumnFilterComponent,
        SmzColumnFilter2Component,
        SmzEditableSourcePipe,
        SmzContentErrorsPipe,
        SmzTableValidationMessagesComponent,
        ValidationMessagesPipe,
        SmzSincronizeTablePipe,
        SmzTableContentComponent,
        SmzTableContentActionsComponent,
        SmzTableCaptionButtonsComponent,
        SmzTableHeaderActionsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        NgxSmzDataPipesModule,
        MultiSelectModule,
        DropdownModule,
        CalendarModule,
        FormsModule,
        TableItemActionsModule,
        ClickStopPropagationModule,
        NgxSmzDataInfoModule,
        TooltipModule,
        SkeletonModule,
        InputTextareaModule,
        OverlayPanelModule,
        ReactiveFormsModule,
        InputSwitchModule,
        InputNumberModule,
        NgxSmzMenuModule,
        ToggleButtonModule,
        NgVarModule,
        RbkAccessControlModule
    ],
    exports: [
        SmzTableComponent,
        SmzSincronizeTablePipe,
        SharedModule
    ],
})
export class NgxSmzTablesModule
{
}
