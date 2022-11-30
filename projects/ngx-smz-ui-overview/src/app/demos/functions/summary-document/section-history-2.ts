
import { ReportSummaryBuilder } from './summary-report-document';
import { SmzDocumentBuilder } from 'ngx-smz-ui';

export const ReportSectionHistory2: ReportSummaryBuilder<any> = (builder, data): SmzDocumentBuilder => builder

.content()
  .useFixedLayout()

.row()
  .pageBreak()
    .row
.content

.row()

  // TÍTULO DA SEÇÃO
  .subTitle('GRÁFICOS')
    .overrideContainerStyles('justify-start smz-document-border pl-2')
    .overrideTextStyles('text-black text-lg font-bold py-2 pt-3')
    .row

.content

.row().spacer().setHeight('10px').row.content

  .for([data.charts[0]], (_, row: any) =>
    (
      _
        .row()
          .subTitle(row.title)
            .setWidth('col-12')
            .overrideContainerStyles('justify-start')
            .overrideTextStyles('text-black text-sm text-center')
            .row
          .content

        .row()
          .chart(row.data)
            .setWidth('col-4')
            .addContainerStyles('')
            .row
          .chart(row.data)
            .setWidth('col-4')
            .addContainerStyles('')
            .row
          .chart(row.data)
            .setWidth('col-4')
            .addContainerStyles('')
            .row
          .content

        .row().spacer().setHeight('20px').row.content
    )
  )

.document;