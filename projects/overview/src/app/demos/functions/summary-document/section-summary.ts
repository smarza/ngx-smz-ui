import { SmzDocumentBuilder } from '@ngx-smz/core';
import { ReportSummaryBuilder } from './summary-report-document';


export const ReportSummarySectionTable: ReportSummaryBuilder<any> = (builder, data): SmzDocumentBuilder => builder

.content()

.row()

  // TÍTULO DA SEÇÃO
  .subTitle(`${data.title}`)
    .overrideContainerStyles('justify-start')
    .overrideTextStyles('text-black text-xl font-bold py-2')
    .row

.content

.row().spacer().setHeight('10px').row.content

.row()

  // TABELA
  .table()
    .setSource(null, null, data.data)
    .for(data.headers, (_, header: { name: string, property: string}, index: number) =>
      (
        _.addColumn(header.property, header.name)
          .setWidth((index + 1) % 2 === 0 ? 'col-3': 'col-9')
        .table
      )
    )
    .row
  .content

.row().spacer().setHeight('20px').row.content

.document;