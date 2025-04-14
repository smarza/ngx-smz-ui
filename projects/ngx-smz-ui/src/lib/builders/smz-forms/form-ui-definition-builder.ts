import { Store } from '@ngxs/store';
import { SmzBaseUiDefinitionBuilder } from '../common/base-ui-definition-builder';
import { convertFormCreationFeature, convertFormFeature, convertFormUpdateFeature } from '../smz-dialogs/dialog-input-conversion';
import { SmzForm } from '../../modules/smz-forms/models/smz-forms';
import { SmzFormsGlobalInjector } from '../../modules/smz-forms/services/smz-forms-global-injector';
import { SmzFormBuilder } from './form-builder';

export class SmzFormUiDefinitionBuilder<TResponse> extends SmzBaseUiDefinitionBuilder<SmzFormUiDefinitionBuilder<TResponse>> {
  protected override that = this;

  constructor(public _formBuilder: SmzFormBuilder<TResponse>, private entityName: string) {
    super();
  }

  public get form(): SmzFormBuilder<TResponse> {

    const store = SmzFormsGlobalInjector.instance.get(Store);

    switch (this.behavior) {
      case 'creation':
        // Creation
        const creationForm: SmzForm<unknown> = convertFormCreationFeature(this.entityName, store, this.dataEntity, this.uiDefinitionOptions).data as any;
        this._formBuilder._state.groups.push(...creationForm.groups);
        return this._formBuilder;

      case 'update':
        // Update
        const updateForm: SmzForm<unknown> = convertFormUpdateFeature(this.entityName, store, this.dataEntity, this.uiDefinitionOptions).data as any;
        this._formBuilder._state.groups.push(...updateForm.groups);
        return this._formBuilder;

      default:
        // Legacy
        const form: SmzForm<unknown> = convertFormFeature(this.entityName, store, this.dataEntity, this.uiDefinitionOptions).data as any;
        this._formBuilder._state.groups.push(...form.groups);
        return this._formBuilder;
    }

  }
}

