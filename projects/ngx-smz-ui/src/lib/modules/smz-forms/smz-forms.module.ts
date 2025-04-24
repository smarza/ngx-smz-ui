import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';

import { FormGroupComponent } from './features/form-group/form-group.component';

import { InputPasswordComponent } from './components/input-password/input-password.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { InputCurrencyComponent } from './components/input-currency/input-currency.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { InputTextAreaComponent } from './components/input-text-area/input-text-area.component';
import { InputTreeComponent } from './components/input-tree/input-tree.component';

import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule  } from 'primeng/select';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { ColorPickerModule } from 'primeng/colorpicker';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputNumberModule } from 'primeng/inputnumber';

import { NgGroupByPipeModule } from '../../common/pipes/group-by.pipe';
import { FormFocusFirstInputDirective } from './directives/form-focus-first-input.directive';
import { InjectContentAppModule } from '../../common/modules/inject-content/inject-content.module';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { CheckBoxComponent } from './components/checkbox/checkbox.component';
import { CheckBoxGroupComponent } from './components/checkbox-group/checkbox-group.component';
import { InputSwitchComponent } from './components/input-switch/input-switch.component';
import { InputMaskModule } from 'primeng/inputmask';

import { InputMaskComponent } from './components/input-mask/input-mask.component';
import { SmzFormsConfig } from './smz-forms.config';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { SmzControlType } from './models/control-types';
import { LinkedDropdownComponent } from './components/linked-dropdown/linked-dropdown.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SmzTemplatesPipeModule } from '../../common/pipes/templates.pipe';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { ValidationMessagesPipe } from './components/validation-messages/validation-messages.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { LinkedMultiSelectComponent } from './components/linked-multi-select/linked-multi-select.component';

import { ClickStopPropagationModule } from '../../common/stop-click-propagation/click-stop-propagation.module';
import { FileDragDropDirective } from './directives/file-drag-drop.directive';
import { SafeContentPipeModule } from '../../common/pipes/safe-html.pipe';
import { FileNameShortenPipe } from './components/file-upload/file-name-shorten.pipe';
import { SmzInputTagAreaModule } from './components/input-tag-area/smz-input-tag-area.component';
import { InputTagAreaComponent } from './components/input-tag-area/input-tag-area.component';
import { NgxSmzDataPipesModule } from '../../common/data-pipes/data-pipes.module';
import { SmzFormsGlobalInjector } from './services/smz-forms-global-injector';
import { InputListComponent } from './components/input-list/input-list.component';
import { InputContentMaskComponent } from './components/input-content-mask/input-content-mask.component';
import { TransferValueAccessor } from './directives/transfer-value-acessor';
import { InputContentMaskTextPipe } from './components/input-content-mask/input-content-mask.pipe';
import { InputListDialogCrudComponent } from './components/input-list/input-list-dialog-crud.component';
import { InputListInlineCrudComponent } from './components/input-list/input-list-inline-crud.component';
import { DialogService } from 'primeng/dynamicdialog';
import { InputListBatchCrudComponent } from './components/input-list/input-list-batch-crud.component';
import { InputTextButtonComponent } from './components/input-text-button/input-text-button.component';
import { ButtonModule } from 'primeng/button';
import { FormSubmitComponent } from './features/form-submit/form-submit.component';
import { AutoFocusModule } from 'primeng/autofocus';
import { TreeSelectModule } from 'primeng/treeselect';
import { SmzInputAutocompleteTagArea } from './components/input-autocomplete-tag-area/smz-input-autocomplete-tag-area.component';
import { SmzAutocompleteSelectorComponent } from './components/input-autocomplete-tag-area/smz-autocomplete-selector-component';
import { SmzSmartTagModule } from './directives/smart-tag.directive';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SmzSmartAutocompleteTagModule } from './directives/smart-autocomplete-tag.directive';
import { GetCurrentMultiselectOptionsPipe } from './components/linked-multi-select/get-current-multiselect-options.pipe';
import { MessageModule } from 'primeng/message';

export const defaultFormsModuleConfig: SmzFormsConfig = {
    behaviors: {
        avoidFocusOnLoad: true,
        debounceTime: 400,
        flattenResponse: true,
        runCustomFunctionsOnLoad: false,
        skipFunctionAfterNextEmit: false,
        showErrorsMethod: 'touched'
    },
    validators: {
        isRequired: true,
        max: null,
        maxLength: null,
        min: null,
        minLength: null
    },
    validationMessages: [
        { type: 'required', message: 'Campo obrigatório.' },
        { type: 'minlength', message: 'Número mínimo de caracteres não atingido.' },
        { type: 'maxlength', message: 'Número máximo de caracteres ultrapassado.' },
        { type: 'min', message: 'Valor mínimo atingido' },
        { type: 'max', message: 'Valor máximo atingido' },
    ],
    multipleErrorMessagesLabel: 'Multiplos erros',
    controlTypes: {
        [SmzControlType.MULTI_SELECT]: {
            defaultLabel: 'Escolha multiplas opções',
            emptyMessage: 'Lista vazia.',
            emptyFilterMessage: 'Nenhum registro encontrado'
        },
        [SmzControlType.LINKED_MULTISELECT]: {
            defaultLabel: 'Escolha multiplas opções',
            emptyMessage: 'Lista vazia.',
            emptyFilterMessage: 'Nenhum registro encontrado'
        },
        [SmzControlType.DROPDOWN]: {
            emptyMessage: 'Lista vazia.',
            emptyFilterMessage: 'Nenhum registro encontrado'
        },
        [SmzControlType.LIST]: {
            emptyMessage: 'Lista vazia.',
        },
        [SmzControlType.LINKED_DROPDOWN]: {
            emptyMessage: 'Lista vazia.',
            emptyFilterMessage: 'Nenhum registro encontrado'
        },
        [SmzControlType.FILE]: {
            fileAccept: 'image/*,application/pdf',
            invalidFileTypeMessageDetail: 'Tipos permitidos: {0}.',
            invalidFileSizeMessageDetail: 'Máximo permitido é {0}.',
            maxFileSize: null,
            thumbnailSize: '90px',
            allowZoom: true,
            dragIconClass: 'pi pi-upload text-primary-color',
            inputMessage: 'Escolha o arquivo',
            dragMessage: 'Arraste aqui',
            showFileSize: true,
            shortenLength: 10,
            shortenSeparator: '...'
        },
        [SmzControlType.PASSWORD]: {
            feedback: false,
            toggleMask: false,
            promptLabel: 'Digite a senha',
            weakLabel: 'Fraca',
            mediumLabel: 'Moderada',
            strongLabel: 'Forte',
            mediumRegex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
            strongRegex: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,}).'
        },
        [SmzControlType.CONTENT_MASK]: {
            tagClass: 'text-green-500 font-bold',
            variableBegin: '{{',
            variableEnd: '}}',
            exportHtmlNewLine: false,
            quickActions: [],
            variableId: 'input__variable',
            inputClass: '',
        }
    }
};

@NgModule({
    // tslint:disable-next-line:max-line-length
    declarations: [
        CalendarComponent,
        CheckBoxComponent,
        CheckBoxGroupComponent,
        ColorPickerComponent,
        DropdownComponent,
        FileUploadComponent,
        FormFocusFirstInputDirective,
        FormGroupComponent,
        InputCurrencyComponent,
        InputListComponent,
        InputMaskComponent,
        InputNumberComponent,
        InputPasswordComponent,
        InputSwitchComponent,
        InputTextAreaComponent,
        SmzInputAutocompleteTagArea,
        InputTextComponent,
        InputTreeComponent,
        LinkedDropdownComponent,
        LinkedMultiSelectComponent,
        MultiSelectComponent,
        RadioButtonComponent,
        ValidationMessagesComponent,
        ValidationMessagesPipe,
        FileDragDropDirective,
        FileNameShortenPipe,
        InputTagAreaComponent,
        InputContentMaskComponent,
        TransferValueAccessor,
        InputContentMaskTextPipe,
        InputListDialogCrudComponent,
        InputListInlineCrudComponent,
        InputListBatchCrudComponent,
        InputTextButtonComponent,
        FormSubmitComponent,
        GetCurrentMultiselectOptionsPipe
    ],
    exports: [
        CalendarComponent,
        CheckBoxComponent,
        CheckBoxGroupComponent,
        ColorPickerComponent,
        SelectModule,
        FileUploadComponent,
        FormGroupComponent,
        InputCurrencyComponent,
        InputListComponent,
        InputMaskComponent,
        InputNumberComponent,
        InputPasswordComponent,
        InputSwitchComponent,
        InputTextAreaComponent,
        SmzInputAutocompleteTagArea,
        InputTextComponent,
        InputTreeComponent,
        LinkedDropdownComponent,
        LinkedMultiSelectComponent,
        MultiSelectComponent,
        RadioButtonComponent,
        FormSubmitComponent,
    ],
    imports: [
        CommonModule,
        DatePickerModule,
        CheckboxModule,
        ClickStopPropagationModule,
        ColorPickerModule,
        SelectModule,
        FileUploadModule,
        FormsModule,
        InjectContentAppModule,
        InputMaskModule,
        InputNumberModule,
        ToggleSwitchModule,
        TextareaModule,
        InputTextModule,
        ListboxModule,
        MultiSelectModule,
        NgGroupByPipeModule,
        PasswordModule,
        RadioButtonModule,
        ReactiveFormsModule,
        SmzTemplatesPipeModule,
        TooltipModule,
        MessageModule,
        SafeContentPipeModule,
        SmzInputTagAreaModule,
        NgxSmzDataPipesModule,
        ButtonModule,
        AutoFocusModule,
        TreeSelectModule,
        SmzAutocompleteSelectorComponent,
        OverlayPanelModule,
        SmzSmartTagModule,
        SmzSmartAutocompleteTagModule
    ],
    providers: [
        DialogService,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class NgxSmzFormsModule {
    constructor(injector: Injector) {
        SmzFormsGlobalInjector.instance = injector;
    }
}

