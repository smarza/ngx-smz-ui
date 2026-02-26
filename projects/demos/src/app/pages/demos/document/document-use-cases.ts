import { SmzDocumentBuilder, SmzDocumentState } from '@ngx-smz/core';

export interface DocumentUseCase {
  id: string;
  title: string;
  getConfig: () => SmzDocumentState;
  snippet: string;
}

function buildBasicDocument(): SmzDocumentState {
  return new SmzDocumentBuilder()
    .setRenderer('html2pdf')
    .setQuality(2)
    .hidePageNumbers()
    .setUnit('cm')
    .setMargins(1, 1, 1, 1)
    .setFilename('demo-report')
    .setPage('a4', 'portrait')
    .viewer()
      .setZoom(1, 0.5, 5, 0.5)
      .allowDownload()
      .document
    .header()
      .row()
        .field('DEMO REPORT', 'Document')
          .setWidth('col-6')
          .useBold()
          .row
        .field('2024-01-15', 'Date')
          .setWidth('col-3')
          .useCentralized()
          .row
        .field('v1.0', 'Version')
          .setWidth('col-3')
          .useCentralized()
          .row
        .content
      .document
    .content()
      .row()
        .subTitle('Product Overview')
          .row
        .content
      .row()
        .field('Notebook Pro 15', 'Product Name')
          .setWidth('col-6')
          .row
        .field('Electronics', 'Category')
          .setWidth('col-3')
          .row
        .field('R$ 4.599,90', 'Price')
          .setWidth('col-3')
          .useBold()
          .row
        .content
      .row()
        .field('This is a demonstration of the SmzDocumentBuilder generating a PDF document.', 'Description')
          .setWidth('col-12')
          .row
        .content
      .row()
        .subTitle('Specifications')
          .row
        .content
      .row()
        .field('Intel Core i7', 'Processor')
          .setWidth('col-4')
          .row
        .field('16 GB DDR5', 'Memory')
          .setWidth('col-4')
          .row
        .field('512 GB NVMe', 'Storage')
          .setWidth('col-4')
          .row
        .content
      .row()
        .field('15.6" Full HD', 'Display')
          .setWidth('col-4')
          .row
        .field('1.8 kg', 'Weight')
          .setWidth('col-4')
          .row
        .field('10 hours', 'Battery')
          .setWidth('col-4')
          .row
        .content
      .document
    .build();
}

function buildLandscapeDocument(): SmzDocumentState {
  return new SmzDocumentBuilder()
    .setRenderer('html2pdf')
    .setQuality(2)
    .setUnit('cm')
    .setMargins(0.6, 0.6, 0.6, 0.6)
    .setFilename('landscape-report')
    .setPage('a4', 'landscape')
    .viewer()
      .setZoom(0.8, 0.3, 3, 0.3)
      .allowDownload()
      .document
    .header()
      .row()
        .field('QUARTERLY REPORT', 'Title')
          .setWidth('col-8')
          .useBold()
          .row
        .field('Q4 2024', 'Period')
          .setWidth('col-4')
          .useCentralized()
          .row
        .content
      .document
    .content()
      .row()
        .subTitle('Revenue Summary')
          .row
        .content
      .row()
        .field('R$ 1.250.000,00', 'Total Revenue')
          .setWidth('col-3')
          .useBold()
          .row
        .field('R$ 890.000,00', 'Net Profit')
          .setWidth('col-3')
          .useBold()
          .row
        .field('12.5%', 'Growth')
          .setWidth('col-3')
          .useBold()
          .row
        .field('1,847', 'Customers')
          .setWidth('col-3')
          .useBold()
          .row
        .content
      .row()
        .field('Revenue increased by 12.5% compared to the previous quarter.', 'Summary')
          .setWidth('col-12')
          .row
        .content
      .document
    .build();
}

// ────────────────────────────────────────────────────────
// Snippets
// ────────────────────────────────────────────────────────

const SNIPPET_BASIC = `new SmzDocumentBuilder()
  .setRenderer('html2pdf')
  .setQuality(2)
  .hidePageNumbers()
  .setUnit('cm')
  .setMargins(1, 1, 1, 1)
  .setFilename('demo-report')
  .setPage('a4', 'portrait')
  .viewer()
    .setZoom(1, 0.5, 5, 0.5)
    .allowDownload()
    .document
  .header()
    .row()
      .field('DEMO REPORT', 'Document').setWidth('col-6').useBold().row
      .field('2024-01-15', 'Date').setWidth('col-3').useCentralized().row
      .field('v1.0', 'Version').setWidth('col-3').useCentralized().row
      .header
    .document
  .content()
    .row()
      .subTitle('Product Overview').row
      .content
    .row()
      .field('Notebook Pro 15', 'Product Name').setWidth('col-6').row
      .field('Electronics', 'Category').setWidth('col-3').row
      .field('R$ 4.599,90', 'Price').setWidth('col-3').useBold().row
      .content
    .document
  .build();`;

const SNIPPET_LANDSCAPE = `new SmzDocumentBuilder()
  .setRenderer('html2pdf')
  .setQuality(2)
  .setUnit('cm')
  .setMargins(0.6, 0.6, 0.6, 0.6)
  .setFilename('landscape-report')
  .setPage('a4', 'landscape')
  .viewer()
    .setZoom(0.8, 0.3, 3, 0.3)
    .allowDownload()
    .document
  .header()
    .row()
      .field('QUARTERLY REPORT', 'Title').setWidth('col-8').useBold().row
      .field('Q4 2024', 'Period').setWidth('col-4').useCentralized().row
      .header
    .document
  .content()
    .row()
      .subTitle('Revenue Summary').row
      .content
    .row()
      .field('R$ 1.250.000,00', 'Total Revenue').setWidth('col-3').useBold().row
      .field('R$ 890.000,00', 'Net Profit').setWidth('col-3').useBold().row
      .content
    .document
  .build();`;

export const DOCUMENT_USE_CASES: DocumentUseCase[] = [
  { id: 'basic-document', title: 'Basic (portrait)', getConfig: buildBasicDocument, snippet: SNIPPET_BASIC },
  { id: 'landscape-document', title: 'Landscape', getConfig: buildLandscapeDocument, snippet: SNIPPET_LANDSCAPE },
];
