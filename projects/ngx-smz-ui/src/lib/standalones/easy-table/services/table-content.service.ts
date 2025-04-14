import { Injectable, QueryList, TemplateRef } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { SmzEasyTableState } from '../models/smz-easy-table-state';

@Injectable()
export class TableContentService {

  public state: SmzEasyTableState;
  public contentTemplate: TemplateRef<any>;
  public templates: QueryList<PrimeTemplate>;

  constructor() {

  }

  public init() {

    this.templates.forEach((item) => {
      switch (item.getType()) {

        case 'content':
          this.contentTemplate = item.template;
          break;
      }
    });
  }

}
