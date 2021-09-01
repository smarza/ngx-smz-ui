import { UUID } from 'angular2-uuid';
import { SmzDialogBuilder } from '../../smz-dialogs/builders/dialog-builder';
import { GlobalInjector } from '../../smz-dialogs/services/global-injector';
import { SmzDialogsConfig } from '../../smz-dialogs/smz-dialogs.config';
import { SmzForm, SmzFormGroup } from '../models/smz-forms';
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
      showErrorsMethod: 'touched',
      ...this.defaultConfig?.forms?.behaviors
    },
  };

  public createdByUiDefinitions = false;

  constructor(public _dialogBuilder: SmzDialogBuilder<TResponse> = null, state: SmzForm<TResponse> = null) {
    if (state != null) {
      this._state = state;
    }
  }

  public group(name: string = null): SmzFormGroupBuilder<TResponse> {
    if(this._dialogBuilder) {
      if (this._dialogBuilder.createdByUiDefinitions) {
        return new SmzFormGroupBuilder(this, this._state.groups[0]);
      }
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