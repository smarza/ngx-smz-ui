import { getSmzTemplate } from '../smz-forms/form-group-builder';
import { InputConversionOptions } from '../smz-dialogs/dialog-input-conversion';
import { SmzControlTypes } from '../../modules/smz-forms/models/control-types';

export class SmzBaseUiDefinitionBuilder<T> {
  protected that: T;
  protected updateEntity: any;
  protected uiDefinitionOptions: InputConversionOptions = {fieldsToConvert : [], fieldsWithLayoutTemplates: [], fieldsToUseSelectors: [], fieldsToIgnore: [], fieldsToOverwriteControl: []};
  constructor() {
  }

  public forEntity(entity: any): T {
    this.updateEntity = entity;
    return this.that;
  }

  public ignore(...properties: string[]): T {
    properties.forEach(property => {
      if (this.uiDefinitionOptions.fieldsToIgnore.indexOf(property) === -1) {
        this.uiDefinitionOptions.fieldsToIgnore.push(property);
      }
    });

    return this.that;
  }

  public rename(originalName: string, newName: string): T {
    const field = this.uiDefinitionOptions.fieldsToConvert.find(x => x.originalName == originalName);
    if (field == null) {
      this.uiDefinitionOptions.fieldsToConvert.push({originalName, newName});
    }
    else {
      throw Error(`rename already used for the property name ${originalName}`);
    }
    return this.that;
  }

  public useSelector(propertyName: string, selector: any): T {
    const field = this.uiDefinitionOptions.fieldsToUseSelectors.find(x => x.propertyName == propertyName);
    if (field == null) {
      this.uiDefinitionOptions.fieldsToUseSelectors.push({propertyName, selector})
    }
    else {
      throw Error(`useSelector already used for the property name ${propertyName}`);
    }

    return this.that;
  }

  public override(propertyName: string, callback: (controls: SmzControlTypes) => void): T {
    const field = this.uiDefinitionOptions.fieldsToOverwriteControl.find(x => x.propertyName == propertyName);
    if (field == null) {
      this.uiDefinitionOptions.fieldsToOverwriteControl.push({propertyName, callback});
    }
    else {
      throw Error(`override already done for the property name ${propertyName}`);
    }
    return this.that;
  }

  public reorder(...properties: string[]): T {
    this.uiDefinitionOptions.fieldsToOverwriteOrder = properties;

    return this.that;
  }

  public useLayout(field: string, breakpoint: 'EXTRA_SMALL' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE',
    colType: 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-7' | 'col-8' | 'col-9' | 'col-10' | 'col-11' | 'col-12' = null): T {

      const template = getSmzTemplate(breakpoint, colType) as any;
      this.uiDefinitionOptions.fieldsWithLayoutTemplates.push({propertyName: field, template });

    return this.that;
  }

}

