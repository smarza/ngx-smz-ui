import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LayoutUiSelectors } from '../../state/ui/layout/layout.selectors';
import { SmzExportDialogService } from './smz-export-dialog.service';

@Component({
    selector: 'smz-export-dialog',
    template: ``,
    providers: [SmzExportDialogService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class SmzExportDialogComponent implements OnInit {
  constructor(private store: Store, private exporter: SmzExportDialogService) {
    this.store
      .select(LayoutUiSelectors.exportData)
      .subscribe((exportData) => {
        if (exportData != null) {
          this.exporter.showExportDocumentDialog(exportData);
        }
      });
  }

  ngOnInit() { }
}