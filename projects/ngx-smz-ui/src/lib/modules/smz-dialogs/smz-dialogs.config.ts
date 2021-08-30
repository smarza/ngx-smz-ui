import { SmzFormsConfig, SmzFormsPresets } from '../smz-forms/smz-forms.config';
import { SmzDialogBehaviors } from './models/smz-dialogs';
import { SmzTemplate } from '../../common/models/templates';

export class SmzDialogsConfig
{
    public dialogs?: SmzDialogsPresets;
    public forms?: SmzFormsConfig & SmzFormsPresets;
    public charts?: {
        emptyMessage: string
    };
}

export class SmzDialogsPresets
{
    public behaviors?: SmzDialogBehaviors;
    public builtInButtons?: SmzDialogButtonsPreset;
    public featureTemplate?: SmzTemplate;
    public dialogTemplate?: SmzTemplate;

}

export interface SmzDialogButtonsPreset
{
    confirmName?: string;
    confirmClass?: string;
    confirmDependsOnValidation?: boolean;
    cancelName?: string;
    cancelClass?: string;
    okName?: string;
    okClass?: string;
    okDependsOnValidation?: boolean;
    saveName?: string;
    saveClass?: string;
    saveDependsOnValidation?: boolean;

}