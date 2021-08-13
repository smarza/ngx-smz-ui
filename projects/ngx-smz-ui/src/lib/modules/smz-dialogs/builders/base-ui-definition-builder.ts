import { getSmzTemplate } from '../../smz-forms/builders/form-group-builder';
import { InputConversionOptions } from './dialog-input-conversion';

export class SmzBaseUiDefinitionBuilder<T> {
  protected that: T;
  protected updateEntity: any;
  protected uiDefinitionOptions: InputConversionOptions = {fieldsToConvert : [], fieldsWithLayoutTemplates: [], fieldsToUseSelectors: [], fieldsToIgnore: []};
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
      throw Error(`rename already used for the property name ${originalName}`)
    }
    return this.that;
  }

  public useSelector(propertyName: string, selector: any): T {
    const field = this.uiDefinitionOptions.fieldsToUseSelectors.find(x => x.propertyName == propertyName);
    if (field == null) {
      this.uiDefinitionOptions.fieldsToUseSelectors.push({propertyName, selector})
    }
    else {
      throw Error(`useSelector already used for the property name ${propertyName}`)
    }

    return this.that;
  }

  public reorder(...properties: string[]): T {
    this.uiDefinitionOptions.fieldsToOverwriteOrder = properties;

    return this.that;
  }

  public useLayout(field: string, template: 'EXTRA_SMALL' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE',
    colType: 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-7' | 'col-8' | 'col-9' | 'col-10' | 'col-11' | 'col-12' = null): T {
    this.uiDefinitionOptions.fieldsWithLayoutTemplates.push({propertyName: field, template: getSmzTemplate(template, colType)});
    return this.that;
  }

}

