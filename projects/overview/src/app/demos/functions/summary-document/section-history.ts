
import { SmzChart, SmzDocumentBuilder, SmzDocumentWidthTypes } from '@ngx-smz/core';
import { ReportSummaryBuilder } from './summary-report-document';

export const ReportSectionHistory: ReportSummaryBuilder<any> = (builder, data): SmzDocumentBuilder => builder

.content()
  .useFixedLayout()

// .row()
//   .pageBreak()
//     .row
// .content

.row()

  // TÍTULO DA SEÇÃO
  .subTitle(`${data.title}`)
    .overrideContainerStyles('justify-start')
    .overrideTextStyles('text-black text-xl font-bold py-2')
    .row

.content

.row().spacer().setHeight('10px').row.content

  .for(createChartInfoMatrix(data.charts), (_, row: { type: 'title' | 'chart', data: SmzChart[], width: SmzDocumentWidthTypes }, index: number) =>
    (
      _
        .if(row.type === 'title')
          .row()
            .for(row.data, (__, value: string, i: number) => (
              __
                // TÍTULO DO GRÁFICO
                .subTitle(value ?? '')
                  .setWidth(row.width)
                  .overrideContainerStyles(`justify-around ${value != null ? 'bg-slate-50' : ''} p-2 ${i === 0 ? 'mr-4': 'ml-4'}`)
                  .overrideTextStyles('text-black text-sm text-center')
                  .row
            ))
            .content
        .endIf

        .if(row.type === 'chart')
          .row()
            .for(row.data, (__, value: SmzChart, j: number) => (
              __
                // GRÁFICO
                .if(value != null)
                  .chart(value)
                    .setWidth(row.width)
                    .addContainerStyles(`pt-1 pr-3 ${j === 0 ? 'mr-4': 'ml-4'}`)
                    .row
                .endIf
            ))
            .content
        .endIf

        .if((index + 1) % 2 === 0)
          .row().spacer().setHeight('20px').row.content
        .endIf
    )
  )

.document;

export function createChartInfoMatrix(data: any[]): { type: 'title' | 'chart', data: string[] | SmzChart[], width: SmzDocumentWidthTypes }[] {

  const titles = data.map(x => x.title);
  const charts = data.map(x => x.data);

  const rowsCount = charts.length / 2;

  const matrix = [];
  let dataIndex = 0;

  for (let i = 0; i < rowsCount; i++) {
    const hasSecondColumnData = (titles.length > dataIndex + 1);
    const width = hasSecondColumnData ? 'col-12' : 'col-6';

    matrix.push({ type: 'title', data: hasSecondColumnData ? [ titles[dataIndex], titles[dataIndex + 1] ] : [ titles[dataIndex], null ], width });
    matrix.push({ type: 'chart', data: hasSecondColumnData ? [ charts[dataIndex], charts[dataIndex + 1] ] : [ charts[dataIndex], null ], width });

    dataIndex += 2;
  }

  return matrix;

}