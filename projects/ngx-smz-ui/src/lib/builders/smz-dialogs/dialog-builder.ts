import { Observable } from 'rxjs';
import { ComponentData, ComponentDataBase } from '../../common/modules/inject-content/models/injectable.model';
import { SmzFormBuilder } from '../smz-forms/form-builder';
import { getSmzTemplate } from '../smz-forms/form-group-builder';
import { SmzForm } from '../../modules/smz-forms/models/smz-forms';
import { SmzDialog, SmzDialogFeature } from '../../modules/smz-dialogs/models/smz-dialogs';
import { GlobalInjector } from '../../modules/smz-dialogs/services/global-injector';
import { SmzDialogsConfig } from '../../modules/smz-dialogs/smz-dialogs.config';
import { SmzDialogButtonsBuilder } from './dialog-buttons-builder';
import { SmzDialogUiDefinitionBuilder } from './dialog-ui-definition-builder';
import { SmzTableState } from '../../modules/smz-tables/models/table-state';
import { SmzDocumentState } from '../../modules/smz-documents/models/smz-document';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';

export class SmzDialogBuilder<TResponse> extends SmzBuilderUtilities<SmzDialogBuilder<TResponse>> {
  protected that = this;
  private defaultConfig = GlobalInjector.instance.get(SmzDialogsConfig);
  public _state: SmzDialog<TResponse> = {
    title: null,
    callbacks: {
      onCancel: null,
      onClose: null,
      onConfirm: null,
      onOk: null,
      onSaveAction: null,
      postProcessResponse: null
    },
    customButtons: [],
    customButtonsOrder: 'last',
    behaviors: {
      showCancelButton: true,
      showConfirmButton: true,
      showCloseButton: true,
      showOkButton: false,
      showSaveButton: false,
      confirmOnEnter: false,
      showMaximizeButton: false,
      openMaximized: false,
      showMinimizeButton: false,
      minimizeLabel: null,
      minimizeDockImagePath: 'assets/images/dock/dialog.svg',
      useAdvancedResponse: false,
      closeOnEscape: false,
      showHeader: true,
      showFooter: true,
      dismissableMask: false,
      contentPadding: '1.5em',
      baseZIndex: 0,
      includeComponentResponses: false,
      ...this.defaultConfig?.dialogs?.behaviors
    },
    builtInButtons: {
      confirmName: 'CONFIRMAR',
      confirmDependsOnValidation: true,
      cancelName: 'CANCELAR',
      cancelClass: 'p-button-outlined',
      okName: 'OK',
      okDependsOnValidation: false,
      ...this.defaultConfig?.dialogs?.builtInButtons
    },
    dialogTemplate:  {
      extraSmall: { row: 'col-12' },
      large: { row: 'col-8' },
      extraLarge: { row: 'col-6' },
      ...this.defaultConfig?.dialogs?.dialogTemplate
    },
    features: []
  };

  public createdByUiDefinitions = false;

  constructor() {
    super();
  }

  public setTitle(title = null): SmzDialogBuilder<TResponse> {
    this._state.title = title;
    return this;
  }

  public useAdvancedResponse(): SmzDialogBuilder<TResponse> {
    this._state.behaviors.useAdvancedResponse = true;
    return this;
  }

  public closeOnEscape(): SmzDialogBuilder<TResponse> {
    this._state.behaviors.closeOnEscape = true;
    return this;
  }

  public allowMaximize(): SmzDialogBuilder<TResponse> {
    this._state.behaviors.showMaximizeButton = true;
    return this;
  }

  public openMaximized(): SmzDialogBuilder<TResponse> {
    this._state.behaviors.openMaximized = true;
    return this;
  }

  public allowMinimize(label?: string): SmzDialogBuilder<TResponse> {
    this._state.behaviors.showMinimizeButton = true;
    this._state.behaviors.minimizeLabel = label;
    return this;
  }

  public setMinimizeDockImage(imagePath: string): SmzDialogBuilder<TResponse> {
    this._state.behaviors.minimizeDockImagePath = imagePath;
    return this;
  }

  public hideHeader(): SmzDialogBuilder<TResponse> {
    this._state.behaviors.showHeader = false;
    return this;
  }

  public hideFooter(): SmzDialogBuilder<TResponse> {
    this._state.behaviors.showFooter = false;
    return this;
  }

  public dismissableMask(): SmzDialogBuilder<TResponse> {
    this._state.behaviors.dismissableMask = true;
    return this;
  }

  public confirmOnEnter(): SmzDialogBuilder<TResponse> {
    this._state.behaviors.confirmOnEnter = true;
    return this;
  }

  public padding(padding: string): SmzDialogBuilder<TResponse> {
    this._state.behaviors.contentPadding = padding;
    return this;
  }

  public baseZIndex(zIndex: number): SmzDialogBuilder<TResponse> {
    this._state.behaviors.baseZIndex = zIndex;
    return this;
  }

  public includeComponentResponses(): SmzDialogBuilder<TResponse> {
    this._state.behaviors.includeComponentResponses = true;
    return this;
  }

  public onSave(callback: any): SmzDialogBuilder<TResponse> {
    this._state.callbacks.onSaveAction = callback;
    return this;
  }

  public postProcessResponse(callback: (data: TResponse) => void): SmzDialogBuilder<TResponse> {
    this._state.callbacks.postProcessResponse = callback;
    return this;
  }

  public setLayout(breakpoint: 'EXTRA_SMALL' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE',
    colType: 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-7' | 'col-8' | 'col-9' | 'col-10' | 'col-11' | 'col-12' = null): SmzDialogBuilder<TResponse> {
      const template = getSmzTemplate(breakpoint, colType) as any;
      this._state.dialogTemplate = { ...this._state.dialogTemplate, ...template };
      return this;
  }

  public buttons(): SmzDialogButtonsBuilder<TResponse> {
    return new SmzDialogButtonsBuilder(this);
  }

  public fromUiDefinition(entityName: string): SmzDialogUiDefinitionBuilder<TResponse> {
    this.createdByUiDefinitions = true;
    return new SmzDialogUiDefinitionBuilder(this, entityName);
  }

  public form(form: SmzForm<TResponse> = null): SmzFormBuilder<TResponse> {
    if (this.createdByUiDefinitions) {
      const feature = this._state.features[0];
      const formBuilder = new SmzFormBuilder(this, feature.data as SmzForm<TResponse>);
      return formBuilder;
    }

    const feature: SmzDialogFeature = {
      type: 'form',
      data: form != null ? form : {groups: []},
    };
    this._state.features.push(feature);

    if (form == null) {
      const formBuilder = new SmzFormBuilder(this);
      feature.data = formBuilder._state;
      return formBuilder;
    }
    else
    {
      return new SmzFormBuilder(this, form);
    }
  }

  public component(component: ComponentDataBase | any): SmzDialogComponentBuilder<TResponse> {
    const feature: SmzDialogFeature = {
      type: 'component',
      data: {component: component, inputs: [], outputs: []},
    };
    this._state.features.push(feature);
    return new SmzDialogComponentBuilder(this, feature);
  }

  public message(message: string | string[]): SmzDialogBuilder<TResponse> {
    const feature: SmzDialogFeature = {
      type: 'message',
      data: message,
    };

    this._state.features.push(feature);
    return this;
  }

  public html(html: string[]): SmzDialogBuilder<TResponse> {
    const feature: SmzDialogFeature = {
      type: 'html',
      data: html,
    };
    this._state.features.push(feature);
    return this;
  }

  public table(items$: Observable<any>, state: SmzTableState): SmzDialogBuilder<TResponse> {
    const data: any = { items$, state };
    const feature: SmzDialogFeature = {
      type: 'table',
      data
    };
    this._state.features.push(feature);
    return this;
  }

  public document(state: SmzDocumentState): SmzDialogBuilder<TResponse> {
    const data: any = { state };
    const feature: SmzDialogFeature = {
      type: 'document',
      data
    };
    this._state.features.push(feature);
    return this;
  }

  public build(): SmzDialog<TResponse> {
    return this._state;
  }
}

export class SmzDialogComponentBuilder<TResponse> {
  constructor(public _dialogBuilder: SmzDialogBuilder<TResponse>, public feature: SmzDialogFeature) {
  }

  public addInput(input: string, data: any): SmzDialogComponentBuilder<TResponse> {
    (this.feature.data as ComponentData).inputs.push({input, data});
    return this;
  }

  public addOutput(output: string, callback: (data: any) => void): SmzDialogComponentBuilder<TResponse> {
    (this.feature.data as ComponentData).outputs.push({output, callback});
    return this;
  }

  public setLayout(breakpoint: 'EXTRA_SMALL' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE',
    colType: 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-7' | 'col-8' | 'col-9' | 'col-10' | 'col-11' | 'col-12' = null): SmzDialogComponentBuilder<TResponse> {
      const template = getSmzTemplate(breakpoint, colType) as any;
      this.feature.template = { ...this.feature.template, ...template };
      return this;
  }

  public get dialog(): SmzDialogBuilder<TResponse> {
    return this._dialogBuilder;
  }
}
