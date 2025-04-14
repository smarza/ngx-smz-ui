import { SmzTemplate } from '../../common/models/templates';
import { InputConversionOptions } from '../smz-dialogs/dialog-input-conversion';

export function getSmzTemplate(breakpoint: 'EXTRA_SMALL' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE',
  colType: 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-7' | 'col-8' | 'col-9' | 'col-10' | 'col-11' | 'col-12') {
  let template: SmzTemplate;
  switch (breakpoint) {
    case 'EXTRA_SMALL':
      template = { extraSmall: { row: colType == null ? 'col-auto' : colType } };
      break;
    case 'SMALL':
      template = { small: { row: colType == null ? 'col-auto' : colType } };
      break;
    case 'MEDIUM':
      template = { medium: { row: colType == null ? 'col-auto' : colType } };
      break;
    case 'LARGE':
      template = { large: { row: colType == null ? 'col-auto' : colType } };
      break;
    case 'EXTRA_LARGE':
      template = { extraLarge: { row: colType == null ? 'col-auto' : colType } };
      break;
    default:
      break;
  }

  return template;
}

export class SmzBaseUiDefinitionBuilder {
  protected updateEntity: any;
  protected uiDefinitionOptions: InputConversionOptions = {fieldsToConvert : [], fieldsWithLayoutTemplates: [], fieldsToUseSelectors: [], fieldsToIgnore: []};
  constructor() {
  }

  public forEntity(entity: any): SmzBaseUiDefinitionBuilder {
    this.updateEntity = entity;
    return this;
  }

  public ignore(...properties: string[]): SmzBaseUiDefinitionBuilder {
    properties.forEach(property => {
      if (this.uiDefinitionOptions.fieldsToIgnore.indexOf(property) === -1) {
        this.uiDefinitionOptions.fieldsToIgnore.push(property);
      }
    });

    return this;
  }

  public rename(originalName: string, newName: string): SmzBaseUiDefinitionBuilder {
    const field = this.uiDefinitionOptions.fieldsToConvert.find(x => x.originalName == originalName);
    if (field == null) {
      this.uiDefinitionOptions.fieldsToConvert.push({originalName, newName});
    }
    else {
      throw Error(`rename already used for the property name ${originalName}`)
    }
    return this;
  }

  public useSelector(propertyName: string, selector: any): SmzBaseUiDefinitionBuilder {
    const field = this.uiDefinitionOptions.fieldsToUseSelectors.find(x => x.propertyName == propertyName);
    if (field == null) {
      this.uiDefinitionOptions.fieldsToUseSelectors.push({propertyName, selector})
    }
    else {
      throw Error(`useSlector already used for the property name ${propertyName}`)
    }

    return this;
  }

  public reorder(...properties: string[]): SmzBaseUiDefinitionBuilder {
    this.uiDefinitionOptions.fieldsToOverwriteOrder = properties;

    return this;
  }

  public useLayout(field: string, template: 'EXTRA_SMALL' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE',
    colType: 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-7' | 'col-8' | 'col-9' | 'col-10' | 'col-11' | 'col-12' = null): SmzBaseUiDefinitionBuilder {
    this.uiDefinitionOptions.fieldsWithLayoutTemplates.push({propertyName: field, template: getSmzTemplate(template, colType)});
    return this;
  }


}

