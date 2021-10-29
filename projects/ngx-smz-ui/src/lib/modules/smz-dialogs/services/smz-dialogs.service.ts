import { Injectable } from '@angular/core';
import { SmzDialogsConfig } from '../smz-dialogs.config';
import { SmzDialog, SmzDialogPreset, SmzDynamicDialogConfig } from '../models/smz-dialogs';
import { SmzForm, SmzFormGroup } from '../../smz-forms/models/smz-forms';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { DialogService } from '../dynamicdialog/dialogservice';
import { DialogContentManagerComponent } from '../features/dialog-content-manager/dialog-content-manager.component';
import { clone, mergeClone } from '../../../common/utils/deep-merge';
import { SetTemplateClasses } from '../../../common/pipes/templates.pipe';
import { DynamicDialogRef } from '../dynamicdialog/dynamicdialog-ref';
import { removeElementFromArray, uuidv4 } from '../../../common/utils/utils';
import { SmzDialogsVisibilityService } from './smz-dialogs-visibility.service';
import { getPreset } from '../models/smz-presets';
import { SmzControlTypes } from '../../smz-forms/models/control-types';
import { SmzCheckBoxControl } from '../../smz-forms/models/control-types';
import { SmzFeaturesService } from './smz-features.service';

const FORMGROUP_BASE = 2;
const CONFIRMATION_BASE = 4;
const COMPONENT_BASE = 3;
const MESSAGE_BASE = 6;

const BASE_DIALOG: SmzDialog<any> = {
    title: '',
    features: [],
    behaviors: {},
    callbacks: {
        onConfirm: (data: any) => { },
        onCancel: () => { },
        onClose: () => { },
    },
    dialogTemplate: {},
    _context: {
        id: '',
        injectables: [],
        apiErrors: [],
        isGlobalDisabled: false,
        isLoading: false,
        behaviors: {},
        advancedResponse: {},
        simpleResponse: {},
        builtInButtons: {},
        customButtons: [],
        customButtonsOrder: 'first',
        featureTemplate: {},
        dialogTemplate: {},
    }
}


@Injectable({
    providedIn: 'root'
})
export class SmzDialogsService
{
    public dialogRefs: DynamicDialogRef[] = [];
    constructor(private moduleConfig: SmzDialogsConfig, private dialogService: DialogService, public refService: DynamicDialogRef, private visibilityService: SmzDialogsVisibilityService, private featuresService: SmzFeaturesService)
    {
        BASE_DIALOG.behaviors = moduleConfig.dialogs.behaviors;
        BASE_DIALOG.dialogTemplate = moduleConfig.dialogs.dialogTemplate;
    }

    /**
    * Cria uma instancia de Dialogo.
    * Atenção: o preset irá subscrever o behaviors, builtInButtons e dialogTemplate existentes
    * O Preset tem prioridade sobre as configurações do app module e sobre o presetId do dialogo.
    */
    public open(dialog: SmzDialog<any>, preset?: SmzDialogPreset): DynamicDialogRef
    {
        // console.log('open', dialog);
        const dialogId = uuidv4();

        const data: SmzDialog<any> = {
            ...BASE_DIALOG,
            ...dialog,
        };

        this.setupComponentVisibilities(dialog);
        this.setupVisibilityObservers(dialog);
        this.safeTypeFunctions(data);

        this.createContext(dialogId, data);

        if (preset != null || dialog.presetId != null)
        {
            const currentPreset = preset != null ? preset : getPreset(dialog.presetId);
            this.createContextWithPreset(dialogId, data, currentPreset);
            this.applyDialogPreset(dialog, currentPreset);
            this.applyFormsPreset(dialog, currentPreset);
        }

        // console.log('dialog', dialog);

        this.featuresService.createInjectables(data);

        const behaviors = data._context.behaviors;
        const paddingStyle = behaviors.contentPadding ? { 'padding': behaviors.contentPadding } : {};

        const config: SmzDynamicDialogConfig = {
            header: dialog.title,
            contentStyle: { 'overflow': 'auto', ...paddingStyle },
            headerStyle: { ...paddingStyle, 'padding-bottom': '0em' },
            footerStyle: { ...paddingStyle, 'padding-top': '0em' },
            styleClass: SetTemplateClasses(data._context.dialogTemplate, ['row']),
            footer: behaviors.showFooter ? '-' : null,
            closable: behaviors.showCloseButton === true,
            maximizable: behaviors.showMaximizeButton === true,
            closeOnEscape: behaviors.closeOnEscape,
            confirmOnEnter: behaviors.confirmOnEnter,
            showHeader: behaviors.showHeader,
            dismissableMask: behaviors.dismissableMask,
            baseZIndex: behaviors.baseZIndex,
            data,
            domElementId : dialog.domElementId,
        };

        const ref = this.dialogService.open(DialogContentManagerComponent, config);

        ref.onDestroy.subscribe(() =>
        {
            data.callbacks.onClose();
            removeElementFromArray(this.dialogRefs, ref.id, 'id');
        });

        ref.id = dialogId;

        this.dialogRefs.push(ref);
        // console.log('dialogRefs push', this.dialogRefs);

        return ref;
    }

    public closeAll(): void
    {
        // console.log('----- closeAll');
        // console.log('dialogRefs push', this.dialogRefs);

        this.dialogRefs.forEach(dialog => {
            dialog.close();
        });
    }

    private applyDialogPreset(data: SmzDialog<any>, preset: SmzDialogPreset): void
    {
        data.behaviors = { ...data.behaviors, ...preset.dialog.behaviors };
        data.builtInButtons = { ...data.builtInButtons, ...preset.dialog.builtInButtons };
        data.dialogTemplate = { ...data.dialogTemplate, ...preset.dialog.dialogTemplate };
    }

    private applyFormsPreset(data: SmzDialog<any>, preset: SmzDialogPreset): void
    {
        for (const feature of data.features)
        {
            if (feature.type === 'form')
            {
                const form = feature.data as SmzForm<any>;
                form.behaviors = { ...form.behaviors, ...preset.features.formBehaviors };
                form.template = { ...form.template, ...preset.features.featureTemplate };

                for (const group of form.groups)
                {
                    this.applyFormGroupsPreset(group, preset);
                }
            }
        }
    }

    private applyFormGroupsPreset(data: SmzFormGroup, preset: SmzDialogPreset): void
    {
        data.template = { ...data.template, ...preset.features.formGroupTemplate };

        for (const control of data.children)
        {
            this.applyFormControlPreset(control, preset);
        }
    }

    private applyFormControlPreset(data: SmzControlTypes, preset: SmzDialogPreset): void
    {
        data.template = { ...data.template, ...preset.features.formControlTemplate };
    }

    private setupVisibilityObservers(data: SmzDialog<any>): void
    {
        for (const feature of data.features)
        {
            if (feature.type === 'component')
            {
                const componentData = feature.data as ComponentData;

                if (componentData.componentId == null)
                {
                    componentData.componentId = uuidv4();
                }

                if (componentData.visibilityDependsOn != null)
                {
                    this.visibilityService.registryObserver(componentData);
                }
            }
        }
    }

    private setupComponentVisibilities(data: SmzDialog<any>): void
    {
        for (const feature of data.features)
        {
            if (feature.type === 'component')
            {
                const componentData = feature.data as ComponentData;

                if (componentData.visibilityDependsOn != null)
                {
                    this.setupVisibilityEmitters(data, componentData);
                }
            }
        }
    }

    public setupVisibilityEmitters(data: SmzDialog<any>, component: ComponentData): void
    {
        for (const feature of data.features)
        {
            if (feature.type === 'form')
            {
                const form = feature.data as SmzForm<any>;

                for (const group of form.groups)
                {
                    for (const input of group.children)
                    {
                        if (component.visibilityDependsOn.formId === form.formId && component.visibilityDependsOn.propertyName === input.propertyName)
                        {
                            this.visibilityService.registryDependsOnData(input as SmzCheckBoxControl, form.formId);
                        }
                    }
                }
            }
        }
    }

    private safeTypeFunctions(data: SmzDialog<any>): void
    {
        if (data.callbacks.onConfirm == null) data.callbacks.onConfirm = (data: any) => { };
        if (data.callbacks.onCancel == null) data.callbacks.onCancel = () => { };
        if (data.callbacks.onClose == null) data.callbacks.onClose = () => { };
        if (data.callbacks.onOk == null) data.callbacks.onOk = () => { };
    }

    private createContextWithPreset(id: string, data: SmzDialog<any>, preset: SmzDialogPreset): void
    {

        const builtInButtons = mergeClone(this.moduleConfig.dialogs.builtInButtons, data.builtInButtons);
        const userBuiltInButtons = data?.builtInButtons ? clone(data.builtInButtons) : {};

        data._context = {
            id,
            injectables: [],
            apiErrors: [],
            isGlobalDisabled: false,
            isLoading: false,
            advancedResponse: {},
            simpleResponse: {},
            behaviors: mergeClone(data.behaviors, preset.dialog.behaviors),
            builtInButtons: mergeClone(builtInButtons, preset.dialog.builtInButtons),
            customButtons: data.customButtons ?? [],
            customButtonsOrder: data.customButtonsOrder ?? 'first',
            featureTemplate: preset.features.featureTemplate,
            dialogTemplate: mergeClone(data.dialogTemplate, preset.dialog.dialogTemplate),
        }

        data._context.builtInButtons.cancelName = userBuiltInButtons?.cancelName ?? data._context.builtInButtons.cancelName;
        data._context.builtInButtons.okName = userBuiltInButtons?.okName ?? data._context.builtInButtons.okName;
        data._context.builtInButtons.confirmName = userBuiltInButtons?.confirmName ?? data._context.builtInButtons.confirmName;

        if (preset.globals != null)
        {
            for (const feature of data.features)
            {
                if (feature.type === 'form')
                {
                    const form = feature.data as SmzForm<any>;

                    if (form._context == null)
                    {
                        form._context = {
                            applyGlobalStyles: false,
                            form: null
                        };
                    }
                    else
                    {
                        form._context.applyGlobalStyles = true;
                    }

                }
            }

            document.documentElement.style.setProperty('--smz-spacer', preset.globals.spacer);
            document.documentElement.style.setProperty('--smz-form-global-scale', `${preset.globals.globalStyleScale}rem`);
        }
    }

    private createContext(id: string, data: SmzDialog<any>): void
    {

        // console.log('userBuiltthis.moduleConfig.dialogs.builtInButtonsInButtons', this.moduleConfig.dialogs.builtInButtons);
        // console.log('data.builtInButtons', data.builtInButtons);

        data._context = {
            id,
            injectables: [],
            apiErrors: [],
            isGlobalDisabled: false,
            isLoading: false,
            advancedResponse: {},
            simpleResponse: {},
            behaviors: mergeClone(this.moduleConfig.dialogs.behaviors, data.behaviors),
            builtInButtons: mergeClone(this.moduleConfig.dialogs.builtInButtons, data.builtInButtons),
            customButtons: data.customButtons ?? [],
            customButtonsOrder: data.customButtonsOrder ?? 'first',
            featureTemplate: this.moduleConfig.dialogs.featureTemplate,
            dialogTemplate: mergeClone(this.moduleConfig.dialogs.dialogTemplate, data.dialogTemplate),
        };
    }

}