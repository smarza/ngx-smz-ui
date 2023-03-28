import { UUID } from 'angular2-uuid';
import { SmzDialogBuilder } from '../smz-dialogs/dialog-builder';
import { SmzForm, SmzFormGroup } from '../../modules/smz-forms/models/smz-forms';
import { SmzFormGroupBuilder } from './form-group-builder';
import { SmzFormUiDefinitionBuilder } from './form-ui-definition-builder';
import { isSimpleNamedEntity } from '../../common/utils/utils';
import flatten from 'lodash-es/flatten';
import { GlobalInjector } from '../../common/services/global-injector';

export class SmzFormBuilder<TResponse> {
  private defaultConfig = GlobalInjector.config.dialogs;
  public _state: SmzForm<TResponse> = {
    isDebug: false,
    formId: UUID.UUID(),
    groups: [],
    template: {
      extraSmall: { horizontalAlignment: 'justify-between', verticalAlignment: 'items-start' },
      small: { horizontalAlignment: 'justify-between', verticalAlignment: 'items-start' },
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
      showMultipleErrorMessages: false,
      // updateOn: 'change',
      ...this.defaultConfig?.forms?.behaviors
    },
    functions: {

    }
  };

  public createdByUiDefinitions = false;

  constructor(public _dialogBuilder: SmzDialogBuilder<TResponse> = null, state: SmzForm<TResponse> = null) {
    if (state != null) {
      this._state = state;
    }

    if (this._dialogBuilder) {
      this.createdByUiDefinitions = this._dialogBuilder.createdByUiDefinitions;
    }
  }

  public debugMode(): SmzFormBuilder<TResponse> {
    this._state.isDebug = true;
    return this;
  }

  public group(name: string = null, key: string = null): SmzFormGroupBuilder<TResponse> {
    if (this.createdByUiDefinitions) {
      return new SmzFormGroupBuilder(this, this._state.groups[this._state.groups.length - 1]);
    }

    const group: SmzFormGroup = { name, showName: name != null, key, children: [] };
    this._state.groups.push(group)
    return new SmzFormGroupBuilder(this, group);
  }

  public disableFlattenResponse(): SmzFormBuilder<TResponse> {
    this._state.behaviors.flattenResponse = false;
    return this;
  }

  public runCustomFunctionsOnLoad(): SmzFormBuilder<TResponse> {
    this._state.behaviors.runCustomFunctionsOnLoad = true;
    return this;
  }

  public applyValues(...values: { propertyName: string, value: any }[]): SmzFormBuilder<TResponse> {

    if (this._state.groups.length === 0) {
      throw Error("You need to have at least one group to applyValues");
    }

    this._state.groups.forEach(group => {
      group.children.forEach(input => {
        const value = values.find(x => x.propertyName === input.propertyName);
        if (value != null) input.defaultValue = value.value;
      });
    });

    return this;
  }

  public applyData(data: any, debug = false): SmzFormBuilder<TResponse> {

    if (this._state.groups.length === 0) {
      throw Error("You need to have at least one group to applyData");
    }

    const inputs = flatten(this._state.groups.map(x => x.children));

    if (debug) console.log('flatten inputs', inputs);

    Reflect
      .ownKeys(data)
      .forEach(key => {
        if (debug) console.log('------ key', key);

        const value = data[key];
        if (debug) console.log('------ value', value);

        if (isSimpleNamedEntity(value)) {
          const input = inputs.find(x => x.propertyName === key);
          if (debug) console.log('------ isSimpleNamedEntity', input, value.id);
          if (input != null) input.defaultValue = value.id;
        }
        else {
          const input = inputs.find(x => x.propertyName === key);
          if (debug) console.log('------ else', input, value);
          if (input != null) input.defaultValue = value;
        }

      });

      if (debug) console.log('state', this._state);

    return this;
  }

  public setDebounceTime(debouceTime: number): SmzFormBuilder<TResponse> {
    this._state.behaviors.debounceTime = debouceTime;
    return this;
  }

  public emitChangesOnFocusExit(): SmzFormBuilder<TResponse> {
    this._state.behaviors.updateOn = 'blur';
    this._state.behaviors.skipEmitChangesOnLoad = true;
    return this;
  }

  // public EmitChangesOnSubmit(): SmzFormBuilder<TResponse> {
  //   this._state.behaviors.updateOn = 'submit';
  //   this._state.behaviors.skipEmitChangesOnLoad = true;
  //   return this;
  // }

  public enableSubmitOnEnter(): SmzFormBuilder<TResponse> {
    this._state.behaviors.submitOnEnter = true;
    return this;
  }

  public emitChangesOnAllChanges(): SmzFormBuilder<TResponse> {
    this._state.behaviors.updateOn = 'change';
    return this;
  }


  public avoidEmitChangesOnLoad(): SmzFormBuilder<TResponse> {
    this._state.behaviors.skipEmitChangesOnLoad = true;
    return this;
  }

  public showMultipleErrorsMessages(): SmzFormBuilder<TResponse> {
    this._state.behaviors.showMultipleErrorMessages = true;
    return this;
  }

  public get dialog(): SmzDialogBuilder<TResponse> {
    return this._dialogBuilder;
  }

  public build(): SmzForm<TResponse> {
    return this._state;
  }

  public fromUiDefinition(entity: string): SmzFormUiDefinitionBuilder<TResponse> {
    if (this.createdByUiDefinitions) {
      throw Error("Form already created from ui definition.")
    }
    this.createdByUiDefinitions = true;
    return new SmzFormUiDefinitionBuilder(this, entity);
  }
}
