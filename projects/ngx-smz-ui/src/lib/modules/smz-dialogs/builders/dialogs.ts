import { ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SmzDialog } from '../models/smz-dialogs';
import { SmzPresets } from '../models/smz-presets';
import { GlobalInjector } from '../services/global-injector';
import { SmzDialogsService } from '../services/smz-dialogs.service';
import { convertFormFeature, InputConfig, InputConversionOptions } from './dialog-input-conversion';

export function showPersistentDialog(
  entity: { [key: string]: any },
  entityName: string, title: string,
  action: any,
  options: InputConversionOptions = null,
): void {

  const store = GlobalInjector.instance.get(Store);
  if (store == null) throw new Error('Could not get an instance of the Store');

  const dialogsService = GlobalInjector.instance.get(SmzDialogsService);
  if (dialogsService == null) throw new Error('Could not get an instance of the dialogs service');

  const inputs = convertFormFeature(entityName, store, entity, options);

  dialogsService.open({
    title: title,
    features: [
      inputs
    ],
    behaviors: {
      showCancelButton: false,
      showConfirmButton: false,
      showCloseButton: true,
      showOkButton: false,
      showSaveButton: true,
      showHeader: true,
      showFooter: true,
    },
    builtInButtons: {
      confirmDependsOnValidation: true,
      saveDependsOnValidation: true, // Habilita salvar somente se o form estiver validado
    },
    callbacks: {
      onSaveAction: action
    }
  });
}

export function showDialog<T>(
  entity: { [key: string]: any },
  entityName: string, title: string,
  confirmCallback: (data: T) => void,
  options: InputConversionOptions = null,
  logResult: boolean = false
): void {

  const store = GlobalInjector.instance.get(Store);
  if (store == null) throw new Error('Could not get an instance of the Store');

  const dialogsService = GlobalInjector.instance.get(SmzDialogsService);
  if (dialogsService == null) throw new Error('Could not get an instance of the dialogs service');

  const inputs = convertFormFeature(entityName, store, entity, options);

  dialogsService.open({
    title: title,
    features: [
      inputs
    ],
    behaviors: {
      showCancelButton: true,
      showConfirmButton: true,
      showCloseButton: true,
      showOkButton: false,
      showSaveButton: false,
      showHeader: true,
      showFooter: true,
    },
    builtInButtons: {
      confirmDependsOnValidation: true,
      saveDependsOnValidation: true, // Habilita salvar somente se o form estiver validado
    },
    callbacks: {
      onConfirm: (data: T): void => {
        if (logResult) {
          console.log(data);
        }
        confirmCallback(data);
      }
    }
  } as SmzDialog<T>);
}


export function showConfirmation(title: string, message: string, confirmCallback: () => void): void {

  const dialogsService = GlobalInjector.instance.get(SmzDialogsService);
  if (dialogsService == null) throw new Error('Could not get an instance of the dialogs service');

  dialogsService.open(({
    presetId: SmzPresets.Confirmation,
    title: title,
    features: [{ type: 'message', data: message }],
    callbacks: {
      onConfirm: confirmCallback
    }
  }));
}

export function showMessage(title: string, message: string, confirmCallback: () => void): void {

  const dialogsService = GlobalInjector.instance.get(SmzDialogsService);
  if (dialogsService == null) throw new Error('Could not get an instance of the dialogs service');

  dialogsService.open(({
    presetId: SmzPresets.Message,
    title: title,
    features: [{ type: 'message', data: message }],
    callbacks: {
      onConfirm: confirmCallback
    }
  }));
}

export function getValidatorsForInput(entityName: string, propertyName: string): ValidatorFn {
  const store = GlobalInjector.instance.get(Store);
  if (store == null) throw new Error('Could not get an instance of the Store');

  const uiDefinitions = store.selectSnapshot(x => x.database['uiDefinitions']?.data);
  if (uiDefinitions == null) throw new Error('Ui Definitions seems to be not loaded');

  const entityData = uiDefinitions[entityName];
  if (entityData == null) throw new Error(`There are no Ui Definitions data for the entity ${entityName}`);

  const createData = entityData?.create;
  const updateData = entityData?.update;

  let input: InputConfig;
  for (const groupConfig of createData) {
    input = groupConfig.controls.find(x => x.propertyName === propertyName);
  }

  if (input != null) {
    for (const groupConfig of updateData) {
      input = groupConfig.controls.find(x => x.propertyName === propertyName);
    }
  }

  if (input != null) {
    const validators = [];

    if (input.required) {
      validators.push(Validators.required);
    }

    if (input.minLength != null) {
      validators.push(Validators.minLength(input.minLength));
    }

    if (input.maxLength != null) {
      validators.push(Validators.maxLength(input.maxLength));
    }

    return Validators.compose(validators);
  }
  else {
    return Validators.compose([]);
  }
}
