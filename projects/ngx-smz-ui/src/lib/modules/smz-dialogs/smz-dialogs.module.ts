import { NgModule, ModuleWithProviders, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { NgxSmzFormsModule } from '../smz-forms/smz-forms.module';
import { InjectContentAppModule } from '../../common/modules/inject-content/inject-content.module';
import { DialogContentManagerComponent } from './features/dialog-content-manager/dialog-content-manager.component';
import { NgGroupByPipeModule } from '../../common/pipes/group-by.pipe';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SmzDynamicDialogConfig } from './models/smz-dialogs';
import { MessageContentComponent } from './features/message-content/message-content.component';
import { DynamicDialogRef } from './dynamicdialog/dynamicdialog-ref';
import { DynamicDialogModule } from './dynamicdialog/dynamicdialog';
import { DynamicDialogConfig } from './dynamicdialog/dynamicdialog-config';
import { DialogFooterComponent, ConfirmOnEnterDirective } from './features/dialog-footer/dialog-footer.component';
import { SmzTemplatesPipeModule } from '../../common/pipes/templates.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { HtmlContentComponent } from './features/html-content/html-content.component';
import { MessagesModule } from 'primeng/messages';
import { ProgressBarModule } from 'primeng/progressbar';
import { SafeContentPipeModule } from '../../common/pipes/safe-html.pipe';
import { NgxSmzTablesModule } from '../smz-tables/ngx-smz-tables.module';
import { TableContentComponent } from './features/table-content/table-content.component';
import { NgxsModule } from '@ngxs/store';
import { DialogsState } from './state/dialogs/dialogs.state';
import { NgxSmzDocumentsModule } from '../smz-documents/ngx-smz-documents.module';
import { DocumentContentComponent } from './features/document-content/document-content.component';
import { ContextMenuService } from 'primeng/api';
import { SmzToastModule } from '../smz-toast/toast';
import { MarkdownContentComponent } from './features/markdown-content/markdown-content.component';
import { GuideFooterComponent } from './features/guide-footer/guide-footer.component';
import { AutoFocusModule } from 'primeng/autofocus';
import { MessageFromObservableContentComponent } from './features/message-from-observable-content/message-from-observable-content.component';

// export const ngxsModuleForFeatureDialogsState = NgxsModule.forFeature([DialogsState]);

@NgModule({
    declarations: [
        DialogContentManagerComponent,
        MessageContentComponent,
        MessageFromObservableContentComponent,
        HtmlContentComponent,
        TableContentComponent,
        DialogFooterComponent,
        GuideFooterComponent,
        ConfirmOnEnterDirective,
        DocumentContentComponent,
        MarkdownContentComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DialogModule,
        // ngxsModuleForFeatureDialogsState,
        OverlayPanelModule,
        SmzToastModule,
        TableModule,
        ButtonModule,
        MessageModule,
        ProgressSpinnerModule,
        NgxSmzFormsModule,
        InjectContentAppModule,
        NgGroupByPipeModule,
        DynamicDialogModule,
        ToolbarModule,
        SmzTemplatesPipeModule,
        TooltipModule,
        MessagesModule,
        ProgressBarModule,
        SafeContentPipeModule,
        NgxSmzTablesModule,
        NgxSmzDocumentsModule,
        AutoFocusModule,
    ],
    providers: [SmzDynamicDialogConfig, DynamicDialogConfig, DynamicDialogRef, ContextMenuService]
})

export class NgxSmzDialogsModule
{
    constructor() {
    }

    public static forRoot(): ModuleWithProviders<NgxSmzDialogsModule>
    {
        return {
            ngModule: NgxSmzDialogsModule,
            providers: []
        };
    }
}
