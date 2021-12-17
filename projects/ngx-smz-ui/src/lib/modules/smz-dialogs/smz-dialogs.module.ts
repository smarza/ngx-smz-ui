import { NgModule, ModuleWithProviders, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';

import { NgxSmzFormsModule, defaultFormsModuleConfig } from '../smz-forms/smz-forms.module';
import { InjectContentAppModule } from '../../common/modules/inject-content/inject-content.module';
import { DialogContentManagerComponent } from './features/dialog-content-manager/dialog-content-manager.component';
import { NgGroupByPipeModule } from '../../common/pipes/group-by.pipe';
import { SmzDialogsConfig } from './smz-dialogs.config';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SmzDynamicDialogConfig } from './models/smz-dialogs';
import { MessageContentComponent } from './features/message-content/message-content.component';
import { DynamicDialogRef } from './dynamicdialog/dynamicdialog-ref';
import { DynamicDialogModule } from './dynamicdialog/dynamicdialog';
import { DynamicDialogConfig } from './dynamicdialog/dynamicdialog-config';
import { DialogFooterComponent, ConfirmOnEnterDirective } from './features/dialog-footer/dialog-footer.component';
import { mergeClone } from '../../common/utils/deep-merge';
import { SmzTemplatesPipeModule } from '../../common/pipes/templates.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { HtmlContentComponent } from './features/html-content/html-content.component';
import { GlobalInjector } from './services/global-injector';
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

const defaultDialogsModuleConfig: SmzDialogsConfig = {
    dialogs: {
        behaviors: {
            showCancelButton: true,
            showConfirmButton: true,
            showCloseButton: true,
            showOkButton: false,
            useAdvancedResponse: false,
            closeOnEscape: false,
            confirmOnEnter: false,
            showHeader: true,
            showFooter: true,
            dismissableMask: false,
            // defaultWidth: '50%',
            contentPadding: '1.5em',
            baseZIndex: 0,
            includeComponentResponses: true,
        },
        builtInButtons: {
            confirmName: 'CONFIRM',
            // confirmClass: 'smz-button-success',
            confirmDependsOnValidation: true,
            cancelName: 'CANCEL',
            cancelClass: 'smz-button-ghost',
            okName: 'OK',
            okDependsOnValidation: false,
            saveName: 'SALVAR',
            saveDependsOnValidation: true
        },
        featureTemplate: {
            extraSmall: { row: 'col-12' }
        },
        dialogTemplate: {
            extraSmall: { row: 'col-12' },
            large: { row: 'col-6' },
        }
    },
    forms: defaultFormsModuleConfig,
    charts: {
        emptyMessage: 'Sem dados para exibir'
    }
};

export const ngxsModuleForFeatureDialogsState = NgxsModule.forFeature([DialogsState]);

@NgModule({
    declarations: [
        DialogContentManagerComponent,
        MessageContentComponent,
        HtmlContentComponent,
        TableContentComponent,
        DialogFooterComponent,
        ConfirmOnEnterDirective,
        DocumentContentComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DialogModule,
        ngxsModuleForFeatureDialogsState,
        OverlayPanelModule,
        ToastModule,
        TableModule,
        ButtonModule,
        MessageModule,
        ProgressSpinnerModule,
        FlexLayoutModule,
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
        NgxSmzDocumentsModule
    ],
    entryComponents: [DialogContentManagerComponent, MessageContentComponent, HtmlContentComponent, DialogFooterComponent, TableContentComponent, DocumentContentComponent],
    providers: [SmzDynamicDialogConfig, DynamicDialogConfig, DynamicDialogRef, ContextMenuService],
})

export class NgxSmzDialogsModule
{
    constructor(injector: Injector) {
        GlobalInjector.instance = injector;
    }

    public static forRoot(configuration: SmzDialogsConfig): ModuleWithProviders<NgxSmzDialogsModule>
    {
        return {
            ngModule: NgxSmzDialogsModule,
            providers: [
                {
                    provide: SmzDialogsConfig,
                    useValue: mergeClone(defaultDialogsModuleConfig, configuration)
                }
            ]
        };
    }
}
