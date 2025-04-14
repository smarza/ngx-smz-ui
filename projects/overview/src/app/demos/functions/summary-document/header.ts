import moment from 'moment';
import { SmzDocumentBuilder } from 'ngx-smz-ui';
import { ReportSummaryBuilder } from './summary-report-document';

export const ReportHeaderSummary: ReportSummaryBuilder<any> = (builder, data): SmzDocumentBuilder => builder

.header()

.row()

  // LOGO PETROBRAS
  .image('assets/Principal_h_cor_RGB-no-margin.png')
    .setWidth('col-8')
    .setRowspan(2)
    .setImageWidth('55%')
    .overrideContainerStyles('items-left')
    .row

  // LOGO FAPENG
  .image('assets/logo-documento.png')
    .setWidth('col-4')
    .setImageWidth('75%')
    .addContainerStyles('items-center mb-2')
    .row

.content

.row()

  // DATA DO RELATÓRIO
  .field(moment(data.header.timestamp).format('YYYY-MM-DD hh:mm'), 'DATA')
    .setWidth('col-4')
    .useCentralized()
    .useBold()
    .row

.content

.row().spacer().setHeight('10px').row.content

.row()

  // TÍTULO
  .title(data.header.title)
    .overrideContainerStyles('justify-around bg-slate-50 pt-2')
    .overrideTextStyles('text-black text-xl font-bold')
    .row

.content

.row()

  // SUB TÍTULO
  .subTitle(data.header.subtitle)
    .overrideContainerStyles('justify-around bg-slate-50 pb-2')
    .overrideTextStyles('text-black text-lg')
    .row

.content

.row().spacer().setHeight('10px').row.content

.document;