import { UUID } from 'angular2-uuid';
import { SmzDialogBuilder } from '../smz-dialogs/dialog-builder';
import { GlobalInjector } from '../../modules/smz-dialogs/services/global-injector';
import { SmzDialogsConfig } from '../../modules/smz-dialogs/smz-dialogs.config';
import { SmzForm, SmzFormGroup } from '../../modules/smz-forms/models/smz-forms';
import { SmzFormGroupBuilder } from './form-group-builder';
import { SmzFormUiDefinitionBuilder } from './form-ui-definition-builder';

export class SmzFormBuilder<TResponse> {
  private defaultConfig = GlobalInjector.instance.get(SmzDialogsConfig);
  public _state: SmzForm<TResponse> = {
    formId: UUID.UUID(),
    groups: [],
    template: {
      extraSmall: { horizontalAlignment: 'justify-content-between', verticalAlignment: 'align-items-start' },
      small: { horizontalAlignment: 'justify-content-between', verticalAlignment: 'align-items-start' },
      ...this.defaultConfig?.forms?.formTemplates
    },
    behaviors: {
      avoidFocusOnLoad: false,
      debounceTime: 400,
      flattenResponse: true,
      runCustomFunctionsOnLoad: false,
      skipFunctionAfterNextEmit: false,
      skipEmitChangesOnLoad: false,
      showErrorsMethod: 'touched',
      // updateOn: 'change',
      ...this.defaultConfig?.forms?.behaviors
    },
  };

  public createdByUiDefinitions = false;

  constructor(public _dialogBuilder: SmzDialogBuilder<TResponse> = null, state: SmzForm<TResponse> = null) {
    if (state != null) {
      this._state = state;
    }

    if(this._dialogBuilder) {
      this.createdByUiDefinitions = this._dialogBuilder.createdByUiDefinitions;
    }
  }

  public group(name: string = null): SmzFormGroupBuilder<TResponse> {
    if(this.createdByUiDefinitions) {
      return new SmzFormGroupBuilder(this, this._state.groups[this._state.groups.length - 1]);
    }

    const group: SmzFormGroup = { name, showName: name != null, children: [] };
    this._state.groups.push(group)
    return new SmzFormGroupBuilder(this, group);
  }

  public disableFlattenResponse(): SmzFormBuilder<TResponse> {
    this._state.behaviors.flattenResponse = false;
    return this;
  }

  public setDebounceTime(debouceTime: number): SmzFormBuilder<TResponse> {
    this._state.behaviors.debounceTime = debouceTime;
    return this;
  }

  public setEmitChangesBehavior(updateOn: 'blur' | 'change' | 'submit'): SmzFormBuilder<TResponse> {
    this._state.behaviors.updateOn = updateOn;

    if (updateOn !== 'change') this._state.behaviors.skipEmitChangesOnLoad = true;

    return this;
  }

  public avoidEmitChangesOnLoad(): SmzFormBuilder<TResponse> {
    this._state.behaviors.skipEmitChangesOnLoad = true;
    return this;
  }

  public get dialog(): SmzDialogBuilder<TResponse> {
    return this._dialogBuilder;
  }

  public build(): SmzForm<TResponse> {
    return this._state;
  }

  public fromUiDefintion(entity: string): SmzFormUiDefinitionBuilder<TResponse> {
    if (this.createdByUiDefinitions) {
      throw Error("Form already created from ui definition.")
    }
    this.createdByUiDefinitions = true;
    return new SmzFormUiDefinitionBuilder(this, entity);
  }
}