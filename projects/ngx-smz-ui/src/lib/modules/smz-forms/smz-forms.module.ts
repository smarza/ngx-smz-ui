import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';

import { FormGroupComponent, InputListComponent } from './features/form-group/form-group.component';

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

import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
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
import { HttpClientModule } from '@angular/common/http';
import { SmzTemplatesPipeModule } from '../../common/pipes/templates.pipe';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { ValidationMessagesPipe } from './components/validation-messages/validation-messages.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { LinkedMultiSelectComponent } from './components/linked-multi-select/linked-multi-select.component';

import { ClickStopPropagationModule } from '../../common/stop-click-propagation/click-stop-propagation.module';
import { FileDragDropDirective } from './directives/file-drag-drop.directive';
import { MessagesModule } from 'primeng/messages';
import { SafeContentPipeModule } from '../../common/pipes/safe-html.pipe';
import { FileNameShortenPipe } from './components/file-upload/file-name-shorten.pipe';
import { SmzInputTagAreaModule } from './components/input-text-area/input-tag-area.component';
import { InputTagAreaComponent } from './components/input-tag-area/input-tag-area.component';
import { NgxSmzDataPipesModule } from '../../common/data-pipes/data-pipes.module';
import { SmzFormsGlobalInjector } from './services/smz-forms-global-injector';

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
            defaultLabel: 'Escolha multiplas opções'
        },
        [SmzControlType.FILE]: {
            fileAccept: 'image/*,application/pdf',
            invalidFileTypeMessageDetail: 'Tipos permitidos: {0}.',
            invalidFileSizeMessageDetail: 'Máximo permitido é {0}.',
            maxFileSize: null,
            thumbnailSize: '90px',
            allowZoom: true,
            dragIconClass: 'pi pi-upload green-text',
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
        }
    }
};

@NgModule({
    imports: [
        CommonModule,
        CalendarModule,
        CheckboxModule,
        ClickStopPropagationModule,
        ColorPickerModule,
        DropdownModule,
        FileUploadModule,
        FlexLayoutModule,
        FormsModule,
        HttpClientModule,
        InjectContentAppModule,
        InputMaskModule,
        InputNumberModule,
        InputSwitchModule,
        InputTextareaModule,
        InputTextModule,
        ListboxModule,
        MultiSelectModule,
        NgGroupByPipeModule,
        PasswordModule,
        RadioButtonModule,
        ReactiveFormsModule,
        SmzTemplatesPipeModule,
        TooltipModule,
        MessagesModule,
        SafeContentPipeModule,
        SmzInputTagAreaModule,
        NgxSmzDataPipesModule
    ],
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
        InputTextComponent,
        LinkedDropdownComponent,
        LinkedMultiSelectComponent,
        MultiSelectComponent,
        RadioButtonComponent,
        ValidationMessagesComponent,
        ValidationMessagesPipe,
        FileDragDropDirective,
        FileNameShortenPipe,
        InputTagAreaComponent
    ],
    entryComponents: [FormGroupComponent],
    exports: [
        CalendarComponent,
        CheckBoxComponent,
        CheckBoxGroupComponent,
        ColorPickerComponent,
        DropdownComponent,
        FileUploadComponent,
        FormGroupComponent,
        InputCurrencyComponent,
        InputListComponent,
        InputMaskComponent,
        InputNumberComponent,
        InputPasswordComponent,
        InputSwitchComponent,
        InputTextAreaComponent,
        InputTextComponent,
        LinkedDropdownComponent,
        LinkedMultiSelectComponent,
        MultiSelectComponent,
        RadioButtonComponent,
    ],

})
export class NgxSmzFormsModule {
    constructor(injector: Injector) {
        SmzFormsGlobalInjector.instance = injector;
    }
}

