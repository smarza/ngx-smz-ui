import {
  ChartType,
  ColorPallete,
  CreateLinearChart,
  CreateRadialChart,
  GroupingType,
  DatasetType,
} from '@ngx-smz/core';
import { VERTICAL_BAR_MODEL } from './data/chart-data';
import { NeutralDatePoint } from './data/neutral-date-point';
import { NeutralCategoryPoint } from './data/neutral-category-point';
import { SpeedSeries } from './data/speed-series';

export interface ChartUseCase {
  id: string;
  title: string;
  getConfig: () => any;
  snippet: string;
}

function fromModel() {
  return { model: VERTICAL_BAR_MODEL, cSharp: null };
}

function barChart() {
  const data: NeutralDatePoint[] = [
    new NeutralDatePoint('Data 1', new Date(2021, 1, 1), 12, null),
    new NeutralDatePoint('Data 1', new Date(2021, 2, 1), 19, null),
    new NeutralDatePoint('Data 1', new Date(2021, 3, 1), 3, null),
    new NeutralDatePoint('Data 1', new Date(2021, 4, 1), 5, null),
    new NeutralDatePoint('Data 1', new Date(2021, 5, 1), 2, null),
    new NeutralDatePoint('Data 1', new Date(2021, 6, 1), 3, null),
  ];
  return CreateLinearChart<NeutralDatePoint>(data)
    .prepareLinearDateData(GroupingType.Monthly)
    .seriesFrom((x) => x.serieId)
    .dateFrom((x) => x.date)
    .valueFrom((x) => x.map((i) => i.value).reduce((a, b) => a + b, 0))
    .chart.ofType(ChartType.Bar)
    .withTooltips()
    .chart.withTitle('# of Votes')
    .chart.withLegend()
    .at('top')
    .chart.setupDataset('Data 1')
    .label('Dataset 1')
    .color('#FF0000', '33')
    .thickness(0)
    .chart.build(true);
}

function lineBarChart() {
  const durationData: NeutralDatePoint[] = [
    new NeutralDatePoint('Dataset 1', new Date(2021, 1, 1), 25, null),
    new NeutralDatePoint('Dataset 1', new Date(2021, 2, 1), 10, null),
    new NeutralDatePoint('Dataset 1', new Date(2021, 3, 1), 15, null),
    new NeutralDatePoint('Dataset 1', new Date(2021, 4, 1), 50, null),
    new NeutralDatePoint('Dataset 1', new Date(2021, 5, 1), 75, null),
    new NeutralDatePoint('Dataset 1', new Date(2021, 6, 1), 45, null),
    new NeutralDatePoint('Dataset 2', new Date(2021, 1, 1), 7, null),
    new NeutralDatePoint('Dataset 2', new Date(2021, 2, 1), 45, null),
    new NeutralDatePoint('Dataset 2', new Date(2021, 3, 1), 55, null),
    new NeutralDatePoint('Dataset 2', new Date(2021, 4, 1), 60, null),
    new NeutralDatePoint('Dataset 2', new Date(2021, 5, 1), 30, null),
    new NeutralDatePoint('Dataset 2', new Date(2021, 6, 1), 60, null),
  ];
  return CreateLinearChart<NeutralDatePoint>(durationData)
    .prepareLinearDateData(GroupingType.Monthly)
    .seriesFrom((x) => x.serieId)
    .dateFrom((x) => x.date)
    .valueFrom((x) => x.map((i) => i.value).reduce((a, b) => a + b, 0))
    .chart.ofType(ChartType.Line)
    .withTitle('Line Chart')
    .chart.withTooltips()
    .chart.withLegend()
    .at('top')
    .chart.setupDataset('Dataset 1')
    .ofType(DatasetType.Line)
    .label('Dataset 1')
    .color('#FF0000', '77')
    .chart.setupDataset('Dataset 2')
    .ofType(DatasetType.Line)
    .label('Dataset 2')
    .color('#5500FF', '77')
    .chart.build(true);
}

function comboChart() {
  const durationData: NeutralDatePoint[] = [
    new NeutralDatePoint('Dataset 2', new Date(2021, 1, 1), 7, null),
    new NeutralDatePoint('Dataset 2', new Date(2021, 2, 1), 45, null),
    new NeutralDatePoint('Dataset 2', new Date(2021, 3, 1), 55, null),
    new NeutralDatePoint('Dataset 2', new Date(2021, 4, 1), 60, null),
    new NeutralDatePoint('Dataset 2', new Date(2021, 5, 1), 30, null),
    new NeutralDatePoint('Dataset 2', new Date(2021, 6, 1), 60, null),
    new NeutralDatePoint('Dataset 1', new Date(2021, 1, 1), 25, null),
    new NeutralDatePoint('Dataset 1', new Date(2021, 2, 1), 10, null),
    new NeutralDatePoint('Dataset 1', new Date(2021, 3, 1), 15, null),
    new NeutralDatePoint('Dataset 1', new Date(2021, 4, 1), 50, null),
    new NeutralDatePoint('Dataset 1', new Date(2021, 5, 1), 75, null),
    new NeutralDatePoint('Dataset 1', new Date(2021, 6, 1), 45, null),
  ];
  return CreateLinearChart<NeutralDatePoint>(durationData)
    .prepareLinearDateData(GroupingType.Monthly)
    .seriesFrom((x) => x.serieId)
    .dateFrom((x) => x.date)
    .valueFrom((x) => x.map((i) => i.value).reduce((a, b) => a + b, 0))
    .chart.ofType(ChartType.Mixed)
    .withTitle('Chart.js Combined Line/Bar Chart')
    .chart.withTooltips()
    .chart.withLegend()
    .at('top')
    .chart.setupDataset('Dataset 1')
    .ofType(DatasetType.Line)
    .label('Dataset 1')
    .color('#f53794')
    .thickness(2)
    .chart.setupDataset('Dataset 2')
    .ofType(DatasetType.Bar)
    .label('Dataset 2')
    .color('#537bc4', '77')
    .thickness(2)
    .chart.build(true);
}

function verticalBarChart() {
  const durationData: NeutralDatePoint[] = [
    new NeutralDatePoint('Data 1', new Date(2021, 1, 1), 5, null),
    new NeutralDatePoint('Data 1', new Date(2021, 2, 1), 10, null),
    new NeutralDatePoint('Data 1', new Date(2021, 3, 1), 15, null),
    new NeutralDatePoint('Data 1', new Date(2021, 4, 1), 50, null),
    new NeutralDatePoint('Data 1', new Date(2021, 5, 1), 75, null),
    new NeutralDatePoint('Data 1', new Date(2021, 6, 1), 45, null),
    new NeutralDatePoint('Data 2', new Date(2021, 1, 1), 7, null),
    new NeutralDatePoint('Data 2', new Date(2021, 2, 1), 7, null),
    new NeutralDatePoint('Data 2', new Date(2021, 3, 1), 10, null),
    new NeutralDatePoint('Data 2', new Date(2021, 4, 1), 60, null),
    new NeutralDatePoint('Data 2', new Date(2021, 5, 1), 30, null),
    new NeutralDatePoint('Data 2', new Date(2021, 6, 1), 60, null),
  ];
  return CreateLinearChart<NeutralDatePoint>(durationData)
    .prepareLinearDateData(GroupingType.Monthly)
    .seriesFrom((x) => x.serieId)
    .dateFrom((x) => x.date)
    .valueFrom((x) => x.map((i) => i.value).reduce((a, b) => a + b, 0))
    .chart.ofType(ChartType.Bar)
    .withTooltips()
    .chart.withLegend()
    .at('top')
    .chart.setupDataset('Data 1')
    .label('Dataset 1')
    .color('#FF0000', '77')
    .thickness(0)
    .chart.setupDataset('Data 2')
    .label('Dataset 2')
    .color('#00FF00', '77')
    .thickness(0)
    .chart.build(true);
}

function roundedBarChart() {
  const durationData: NeutralDatePoint[] = [
    new NeutralDatePoint('Data 1', new Date(2021, 1, 1), 5, null),
    new NeutralDatePoint('Data 1', new Date(2021, 2, 1), 10, null),
    new NeutralDatePoint('Data 1', new Date(2021, 3, 1), 15, null),
    new NeutralDatePoint('Data 1', new Date(2021, 4, 1), 50, null),
    new NeutralDatePoint('Data 1', new Date(2021, 5, 1), 75, null),
    new NeutralDatePoint('Data 1', new Date(2021, 6, 1), 45, null),
    new NeutralDatePoint('Data 2', new Date(2021, 1, 1), 7, null),
    new NeutralDatePoint('Data 2', new Date(2021, 2, 1), 7, null),
    new NeutralDatePoint('Data 2', new Date(2021, 3, 1), 10, null),
    new NeutralDatePoint('Data 2', new Date(2021, 4, 1), 60, null),
    new NeutralDatePoint('Data 2', new Date(2021, 5, 1), 30, null),
    new NeutralDatePoint('Data 2', new Date(2021, 6, 1), 60, null),
  ];
  return CreateLinearChart<NeutralDatePoint>(durationData)
    .prepareLinearDateData(GroupingType.Monthly)
    .seriesFrom((x) => x.serieId)
    .dateFrom((x) => x.date)
    .valueFrom((x) => x.map((i) => i.value).reduce((a, b) => a + b, 0))
    .chart.ofType(ChartType.Bar)
    .withTooltips()
    .chart.withLegend()
    .at('top')
    .chart.setupDataset('Data 1')
    .label('Data 1')
    .color('#FF0000', '77')
    .thickness(2)
    .roundedBorders(5)
    .chart.setupDataset('Data 2')
    .label('Data 2')
    .color('#5500FF', '77')
    .thickness(2)
    .roundedBorders(5)
    .chart.build(true);
}

function stackedBarChart() {
  const durationData: NeutralDatePoint[] = [
    new NeutralDatePoint('Data 1', new Date(2021, 1, 1), 5, null),
    new NeutralDatePoint('Data 1', new Date(2021, 2, 1), 10, null),
    new NeutralDatePoint('Data 1', new Date(2021, 3, 1), 15, null),
    new NeutralDatePoint('Data 1', new Date(2021, 4, 1), 50, null),
    new NeutralDatePoint('Data 1', new Date(2021, 5, 1), 75, null),
    new NeutralDatePoint('Data 1', new Date(2021, 6, 1), 45, null),
    new NeutralDatePoint('Data 2', new Date(2021, 1, 1), 7, null),
    new NeutralDatePoint('Data 2', new Date(2021, 2, 1), 7, null),
    new NeutralDatePoint('Data 2', new Date(2021, 3, 1), 10, null),
    new NeutralDatePoint('Data 2', new Date(2021, 4, 1), 60, null),
    new NeutralDatePoint('Data 2', new Date(2021, 5, 1), 30, null),
    new NeutralDatePoint('Data 2', new Date(2021, 6, 1), 60, null),
    new NeutralDatePoint('Data 3', new Date(2021, 1, 1), 2, null),
    new NeutralDatePoint('Data 3', new Date(2021, 2, 1), 15, null),
    new NeutralDatePoint('Data 3', new Date(2021, 3, 1), 5, null),
    new NeutralDatePoint('Data 3', new Date(2021, 4, 1), 30, null),
    new NeutralDatePoint('Data 3', new Date(2021, 5, 1), 30, null),
    new NeutralDatePoint('Data 3', new Date(2021, 6, 1), 10, null),
  ];
  return CreateLinearChart<NeutralDatePoint>(durationData)
    .prepareLinearDateData(GroupingType.Monthly)
    .seriesFrom((x) => x.serieId)
    .dateFrom((x) => x.date)
    .valueFrom((x) => x.map((i) => i.value).reduce((a, b) => a + b, 0))
    .chart.ofType(ChartType.StackedBar)
    .withTitle('Bar Chart - Stacked')
    .chart.withTooltips()
    .chart.withLegend()
    .at('top')
    .chart.setupDataset('Data 1')
    .label('Dataset 1')
    .color('#FF0000')
    .chart.setupDataset('Data 2')
    .label('Dataset 2')
    .color('#0000FF')
    .chart.setupDataset('Data 3')
    .label('Dataset 3')
    .color('#00FF00')
    .chart.build(true);
}

function doughnutChart() {
  const data: NeutralCategoryPoint[] = [
    new NeutralCategoryPoint('Red', 5, null),
    new NeutralCategoryPoint('Orange', 15, null),
    new NeutralCategoryPoint('Yellow', 5, null),
    new NeutralCategoryPoint('Green', 25, null),
    new NeutralCategoryPoint('Blue', 20, null),
  ];
  return CreateRadialChart(data)
    .ofType(ChartType.Doughnut)
    .colors(['#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236'])
    .withTooltips()
    .chart.withLegend()
    .at('top')
    .chart.build(true);
}

function pieChart() {
  const data: NeutralCategoryPoint[] = [
    new NeutralCategoryPoint('Red', 5, null),
    new NeutralCategoryPoint('Orange', 15, null),
    new NeutralCategoryPoint('Yellow', 5, null),
    new NeutralCategoryPoint('Green', 25, null),
    new NeutralCategoryPoint('Blue', 20, null),
  ];
  return CreateRadialChart(data)
    .ofType(ChartType.Pie)
    .colors(['#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236'])
    .withTooltips()
    .chart.withLegend()
    .at('top')
    .chart.build(true);
}

function polarAreaChart() {
  const data: NeutralCategoryPoint[] = [
    new NeutralCategoryPoint('Red', 5, null),
    new NeutralCategoryPoint('Orange', 15, null),
    new NeutralCategoryPoint('Yellow', 5, null),
    new NeutralCategoryPoint('Green', 25, null),
    new NeutralCategoryPoint('Blue', 20, null),
  ];
  return CreateRadialChart(data)
    .ofType(ChartType.PolarArea)
    .colors(['#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236'], '44')
    .withTooltips()
    .chart.withLegend()
    .at('top')
    .chart.build(true);
}

function sprintsChart1() {
  const durationData: SpeedSeries[] = [
    new SpeedSeries('done', 'Sprint88', 50),
    new SpeedSeries('extra', 'Sprint88', 5),
    new SpeedSeries('done', 'Sprint89', 75),
    new SpeedSeries('extra', 'Sprint89', 3),
    new SpeedSeries('done', 'Sprint90', 63),
    new SpeedSeries('extra', 'Sprint90', 9),
    new SpeedSeries('done', 'Sprint91', 95),
    new SpeedSeries('extra', 'Sprint91', 0),
  ];
  return CreateLinearChart<SpeedSeries>(durationData)
    .prepareLinearCategoryData()
    .seriesFrom((x) => x.serieId)
    .categoryFrom((x) => x.sprintName)
    .valueFrom((x) => x.map((i) => i.value).reduce((a, b) => a + b, 0))
    .chart.responsive()
    .ofType(ChartType.Bar)
    .theme([ColorPallete.Spring1])
    .withLegend()
    .chart.build(true);
}

function sprintsChart2() {
  const durationData: SpeedSeries[] = [
    new SpeedSeries('done', 'Sprint88', 50),
    new SpeedSeries('extra', 'Sprint88', 5),
    new SpeedSeries('done', 'Sprint89', 75),
    new SpeedSeries('extra', 'Sprint89', 3),
    new SpeedSeries('done', 'Sprint90', 63),
    new SpeedSeries('extra', 'Sprint90', 9),
    new SpeedSeries('done', 'Sprint91', 95),
    new SpeedSeries('extra', 'Sprint91', 0),
  ];
  return CreateLinearChart<SpeedSeries>(durationData)
    .prepareLinearCategoryData()
    .singleSerie()
    .categoryFrom((x) => x.sprintName)
    .valueFrom((x) => x.map((i) => i.value).reduce((a, b) => a + b, 0))
    .chart.responsive()
    .ofType(ChartType.Bar)
    .theme([ColorPallete.Spring1])
    .withLegend()
    .chart.build(true);
}

const SNIPPET_FROM_MODEL = `const model = { type: 'bar', data: { ... }, config: { ... } };
// <smz-ui-chart [type]="model.type" [data]="model.data" [options]="model.config" />`;

const SNIPPET_BAR = `CreateLinearChart(data).prepareLinearDateData(GroupingType.Monthly)
  .seriesFrom(x => x.serieId).dateFrom(x => x.date).valueFrom(...)
  .chart.ofType(ChartType.Bar).withTooltips().withTitle('# of Votes')
  .withLegend().at('top').setupDataset('Data 1').label('Dataset 1').color('#FF0000','33').chart.build();`;

const SNIPPET_LINE = `CreateLinearChart(durationData).prepareLinearDateData(GroupingType.Monthly)
  .chart.ofType(ChartType.Line)
  .setupDataset('Dataset 1').ofType(DatasetType.Line).color('#FF0000','77')
  .setupDataset('Dataset 2').ofType(DatasetType.Line).color('#5500FF','77').chart.build(true);`;

const SNIPPET_COMBO = `CreateLinearChart(data).prepareLinearDateData(GroupingType.Monthly)
  .chart.ofType(ChartType.Mixed)
  .setupDataset('Dataset 1').ofType(DatasetType.Line).color('#f53794')
  .setupDataset('Dataset 2').ofType(DatasetType.Bar).color('#537bc4','77').chart.build(true);`;

const SNIPPET_RADIAL = `CreateRadialChart(data).ofType(ChartType.Doughnut)
  .colors(['#4dc9f6', '#f67019', ...]).withTooltips().chart.withLegend().at('top').chart.build(true);`;

const SNIPPET_SPRINTS = `CreateLinearChart<SpeedSeries>(data).prepareLinearCategoryData()
  .seriesFrom(x => x.serieId).categoryFrom(x => x.sprintName).valueFrom(...)
  .chart.responsive().ofType(ChartType.Bar).theme([ColorPallete.Spring1]).withLegend().chart.build(true);`;

export const CHART_USE_CASES: ChartUseCase[] = [
  { id: 'from-model', title: 'From model', getConfig: fromModel, snippet: SNIPPET_FROM_MODEL },
  { id: 'bar', title: 'Bar', getConfig: barChart, snippet: SNIPPET_BAR },
  { id: 'line', title: 'Line', getConfig: lineBarChart, snippet: SNIPPET_LINE },
  { id: 'combo', title: 'Combo (Line + Bar)', getConfig: comboChart, snippet: SNIPPET_COMBO },
  { id: 'vertical-bar', title: 'Vertical Bar', getConfig: verticalBarChart, snippet: SNIPPET_BAR },
  { id: 'rounded-bar', title: 'Rounded Bar', getConfig: roundedBarChart, snippet: SNIPPET_BAR },
  { id: 'stacked-bar', title: 'Stacked Bar', getConfig: stackedBarChart, snippet: SNIPPET_BAR },
  { id: 'doughnut', title: 'Doughnut', getConfig: doughnutChart, snippet: SNIPPET_RADIAL },
  { id: 'pie', title: 'Pie', getConfig: pieChart, snippet: SNIPPET_RADIAL },
  { id: 'polar-area', title: 'Polar Area', getConfig: polarAreaChart, snippet: SNIPPET_RADIAL },
  { id: 'sprints-1', title: 'Sprints (múltiplas séries)', getConfig: sprintsChart1, snippet: SNIPPET_SPRINTS },
  { id: 'sprints-2', title: 'Sprints (série única)', getConfig: sprintsChart2, snippet: SNIPPET_SPRINTS },
];
