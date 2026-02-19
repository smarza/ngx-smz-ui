import { Component, Input, OnInit, ChangeDetectorRef, OnDestroy, TemplateRef, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { SmzEasyTableState } from '../../models/smz-easy-table-state';
import { TableContentService } from '../../services/table-content.service';
import { TableDataSourceService } from '../../services/table-data-source.service';

@Component({
    selector: 'smz-easy-table',
    templateUrl: 'smz-easy-table.component.html',
    providers: [TableDataSourceService, TableContentService],
    standalone: false
})

export class SmzEasyTableComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() public state: SmzEasyTableState;
  @Input() public dataSource: Observable<any[]>;
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

  constructor(public cdr: ChangeDetectorRef, public dataService: TableDataSourceService, public contentService: TableContentService) {
  }

  ngOnInit() {
    this.dataService.cdr = this.cdr;
    this.dataService.source$ = this.dataSource;
    this.dataService.state = this.state;
    this.dataService.setupListener();
  }

  public ngAfterContentInit() {

    this.contentService.templates = this.templates;
    this.contentService.state = this.state;
    this.contentService.init();

  }

  public ngOnDestroy(): void {
    this.dataService.disconnect();
  }
}