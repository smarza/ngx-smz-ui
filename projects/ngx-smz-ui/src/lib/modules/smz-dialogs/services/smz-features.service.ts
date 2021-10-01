import { Injectable } from '@angular/core';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { HtmlContentComponent } from '../features/html-content/html-content.component';
import { MessageContentComponent } from '../features/message-content/message-content.component';
import { TableContentComponent } from '../features/table-content/table-content.component';
import { isArray } from '../../../common/utils/utils';
import { SmzDialog } from '../models/smz-dialogs';
import { mergeClone } from '../../../common/utils/deep-merge';
import { SmzForm } from '../../smz-forms/models/smz-forms';
import { FormGroupComponent } from '../../smz-forms/features/form-group/form-group.component';

@Injectable({providedIn: 'root'})
export class SmzFeaturesService {
  constructor() { }

  public createInjectables(data: SmzDialog<any>): void
  {

      for (let feature of data.features)
      {
          const featureTemplate = mergeClone(data._context.featureTemplate, feature.template);

          switch (feature.type)
          {
              case 'form':
                  // FORM GROUP DETECTED
                  const featureData = feature.data as SmzForm<any>;

                  data._context.injectables.push({
                      component: FormGroupComponent,
                      inputs: [{ data: feature.data, input: 'config' }],
                      outputs: [{
                          output: 'statusChanges', callback: (event: any) =>
                          {
                              data._context.advancedResponse[featureData.formId] = event.data;

                              data._context.simpleResponse = {};

                              for (const key of Object.keys(data._context.advancedResponse))
                              {
                                  data._context.simpleResponse = { ...data._context.simpleResponse, ...data._context.advancedResponse[key] };
                              }

                              // data._context.simpleResponse = { ...data._context.simpleResponse, ...event.data };
                              // data._context.simpleResponse = { ...data._context.simpleResponse, ...event.data };
                          }
                      }],
                      template: featureTemplate,
                      type: feature.type
                  });
                  break;

              case 'message':
                  // MESSAGE DETECTED

                  const message = isArray(feature.data) ? (feature.data as string[]).join('<br>') : feature.data;

                  data._context.injectables.push({
                      component: MessageContentComponent,
                      inputs: [{ data: message, input: 'data' }],
                      outputs: [],
                      template: featureTemplate,
                      type: feature.type
                  });
                  break;

              case 'html':
                  // HTML DETECTED

                  const html = isArray(feature.data) ? (feature.data as string[]).join('<br>') : feature.data;

                  data._context.injectables.push({
                      component: HtmlContentComponent,
                      inputs: [{ data: html, input: 'data' }],
                      outputs: [],
                      template: featureTemplate,
                      type: feature.type
                  });
                  break;

              case 'table':
                  // HTML DETECTED

                  const tableData = feature.data as any; // SmzDialogTable;

                  data._context.injectables.push({
                      component: TableContentComponent,
                      inputs: [{ data: tableData.items$, input: 'items$' }, { data: tableData.state, input: 'state' }],
                      outputs: [],
                      template: featureTemplate,
                      type: feature.type
                  });
                  break;

              case 'component':
                  // INJECTABLE COMPONENT DETECTED
                  data._context.injectables.push({
                      ...feature.data as ComponentData,
                      template: featureTemplate,
                      type: feature.type
                  });
                  break;
              default:
                  break;
          }

      }

  }

}