import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { SmzClipboardService, SmzColumnCollectionBuilder, SmzExportableContentType, SmzTableBuilder, SmzTableComponent, SmzTableState, SmzTableViewportState, SmzTableViewportStateData } from 'ngx-smz-ui';
import { Store } from '@ngxs/store';

@UntilDestroy()
@Component({
  selector: 'app-results-table',
  templateUrl: 'results-table.component.html',
})
export class ResultsTableComponent implements OnInit {
  @ViewChild(SmzTableComponent) public table: SmzTableComponent;
  @Input() public results: any;
  @Input() public title: string;
  @Input() public filename: string;
  @Input() public viewport: SmzTableViewportStateData;
  @Input() public itemsPerRow: 10 | 15 = 10;

  public resultsTableState: SmzTableState;

  constructor(private clipboardService: SmzClipboardService, private store: Store) {
  }

  public ngOnInit(): void {
    this.buildResultsTable();
  }

  public buildResultsTable(): void {

    const headers = this.results.headers == null ? [] : this.results.headers;

    const factory: SmzTableBuilder<any> = new SmzTableBuilder()
      .setTitle(this.title)
      .enableGlobalFilter()
      .enableClearFilters()
      .setEmptyFeedbackMessage('Nenhuma inconsistência encontrada')
      .setEmptyFeedbackImage('assets/images/server-checkmark.svg')
      .enableColumnVisibility(true)
      .usePagination()
      .setPaginationPageOptions([10, 15, 25, 100, 200])
      .setPaginationDefaultRows(this.itemsPerRow)
      .useEstimatedColWidth(400)
      .useGridStyle()
      .setSize('small')
      .useStrippedStyle()
      .disableRowHoverEffect()
      .excel()
        .setFilename(this.filename)
        .setMaxFilenameLength(100)
        .setShortenSuffix('(...)')
        .setUserAsAuthor()
        .useHyperlinkAsHtml()
        .setNewLineSeparator('<br>')
        .excel
      .columns()
        .for(headers, (builder: SmzColumnCollectionBuilder<any>, header: any) => (builder
          .text(header.id, header.name)
            .hide(header.hide ?? false)
            .exportAs(SmzExportableContentType.AUTODETECT)
            .actions()
              .if(header.id === 'elementRefno')
                .add('fa-regular fa-copy', (item: { elementRefno: string }) => this.clipboardService.copy(item.elementRefno))
                  .setStyleClass('text-green-500')
                  .action
                .endIf
              .if(header.id === 'significantRefno')
                .add('fa-regular fa-copy', (item: { significantRefno: string }) => this.clipboardService.copy(item.significantRefno))
                  .setStyleClass('text-green-500')
                  .action
                .endIf
              .column
          .columns
        ))
        .table
        .resizeIgnoringCheck(
          { property: 'elementType', width: '12em'},
          { property: 'elementRefno', width: '12em'},
          { property: 'significantType', width: '13em'},
          { property: 'significantRefno', width: '13em'},
          { property: 'severity', width: '9em'}
        );

    if (this.viewport != null) {
      this.resultsTableState = factory
        .viewport()
          .usePersistenceGlobally('results-table')
          .table
        .build();
    }
    else {
      this.resultsTableState = factory.build();
    }



  }

}