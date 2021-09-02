import { Store } from '@ngxs/store';
import { SmzBaseUiDefinitionBuilder } from '../common/base-ui-definition-builder';
import { convertFormFeature } from '../smz-dialogs/dialog-input-conversion';
import { SmzForm } from '../../modules/smz-forms/models/smz-forms';
import { SmzFormsGlobalInjector } from '../../modules/smz-forms/services/smz-forms-global-injector';
import { SmzFormBuilder } from './form-builder';

export class SmzFormUiDefinitionBuilder<TResponse> extends SmzBaseUiDefinitionBuilder<SmzFormUiDefinitionBuilder<TResponse>> {
  protected that = this;

  constructor(public _formBuilder: SmzFormBuilder<TResponse>, private entityName: string) {
    super();
  }

  public get form(): SmzFormBuilder<TResponse> {

    const store = SmzFormsGlobalInjector.instance.get(Store);

    const form: SmzForm<unknown> = convertFormFeature(this.entityName, store, this.updateEntity, this.uiDefinitionOptions).data as any;

    this._formBuilder._state.groups.push(...form.groups);

    return this._formBuilder;
  }
}

