
import { SmzDocumentBuilder, SmzDocumentState } from 'ngx-smz-ui';
import { ReportHeaderSummary } from './header';
import { ReportSectionHistory } from './section-history';
import { ReportSummarySectionTable } from './section-summary';

export type ReportSummaryBuilder<T> = (builder: SmzDocumentBuilder, data: T) => SmzDocumentBuilder;

export function buildSummaryReportDocument(report: any): SmzDocumentState {

  let document = new SmzDocumentBuilder()
    .setRenderer('html2pdf')
    .setQuality(2)
    .setPaddingCompensation(12)
    // .debugMode()

    .setUnit('cm')
    .setMargins(2, 2, 1.5, 1.5)
    .setFilename(report.filename)
    .setPage('a4', 'portrait')

    .viewer()
      .disableZoomControls()
      .allowDownload()
      .document;

  document = ReportHeaderSummary(document, report);
  document = ReportSummarySectionTable(document, report.summary);
  document = ReportSectionHistory(document, report.history);

  return document.build();

}

