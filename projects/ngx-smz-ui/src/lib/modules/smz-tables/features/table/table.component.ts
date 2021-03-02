import { AfterContentInit, Component, ContentChildren, forwardRef, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { SmzControlType } from 'ngx-smz-dialogs';
import { PrimeTemplate } from 'primeng/api';
import { SmzTableConfig } from '../../models/table-config';

@Component({
  selector: 'smz-ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class SmzTableComponent implements OnInit, AfterContentInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public items: any[] = [];
  @Input() public config: SmzTableConfig;
  @Input() public loading: boolean = false;
  public contentTemplate: TemplateRef<any>;
  public actionsTemplate: TemplateRef<any>;
  public selectedItems: any[];
  public dropDownControlType = `${SmzControlType.DROPDOWN}`;

  constructor() {

  }

  ngOnInit(): void {
    console.log('items', this.items);
  }


  public ngAfterContentInit() {
    console.log('ngAfterContentInit', this.templates);
    this.templates.forEach((item) => {
      switch (item.getType()) {

        case 'content':
          this.contentTemplate = item.template;
          break;

        case 'actions':
          this.actionsTemplate = item.template;
          break;
      }
    });

  }

}
