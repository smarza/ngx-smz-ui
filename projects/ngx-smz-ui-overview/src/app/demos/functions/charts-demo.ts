
import { VERTICAL_BAR } from '../data/chart-data-original';
import { DemoKeys } from '@demos/demo-keys';
import { VERTICAL_BAR_CSHARP } from '../data/chart-data-csharp';
import { NeutralDatePoint } from '../data/charts/neutral-date-point';
import { CreateLinearChart, GroupingType, ChartType, DatasetType, CreateRadialChart, ColorPallete } from 'ngx-smz-ui';
import { NeutralCategoryPoint } from '../data/charts/neutral-category-point';
import { SpeedSeries } from '../data/charts/speed-series';

export const ChartsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.CHARTS_VERTICAL_BAR]: () => {
    return { model: VERTICAL_BAR, cSharp: VERTICAL_BAR_CSHARP }
  },
  //
  [DemoKeys.CHARTS_COMBO]: () => {

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

      var chart = CreateLinearChart<NeutralDatePoint>(durationData)
        .prepareLinearDateData(GroupingType.Monthly)
          .seriesFrom(x => x.serieId)
          .dateFrom(x => x.date)
          .valueFrom(x => x.map(x => x.value).reduce((a,b) => a + b, 0))
          .chart
        .ofType(ChartType.Mixed)
        .withTitle('Chart.js Combined Line/Bar Chart')
          .chart
        .withTooltips()
          .chart
        .withLegend()
          .at('top')
          .chart
        .setupDataset('Dataset 1')
          .ofType(DatasetType.Line)
          .label('Dataset 1')
          .color('#f53794')
          .thickness(2)
          .chart
        .setupDataset('Dataset 2')
          .ofType(DatasetType.Bar)
          .label('Dataset 2')
          .color('#537bc4', '77')
          .thickness(2)
          .chart
        .build(true);

      return chart;
  },
  //
  [DemoKeys.CHARTS_LINE_BAR]: () => {

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

      var chart = CreateLinearChart<NeutralDatePoint>(durationData)
        .prepareLinearDateData(GroupingType.Monthly)
          .seriesFrom(x => x.serieId)
          .dateFrom(x => x.date)
          .valueFrom(x => x.map(x => x.value).reduce((a,b) => a + b, 0))
          .chart
        .ofType(ChartType.Line)
        .withTitle('Line Chart')
          .chart
        .withTooltips()
          .chart
        .withLegend()
          .at('top')
          .chart
        .setupDataset('Dataset 1')
          .ofType(DatasetType.Line)
          .label('Dataset 1')
          .color('#FF0000', '77')
          .chart
        .setupDataset('Dataset 2')
          .ofType(DatasetType.Line)
          .label('Dataset 2')
          .color('#5500FF', '77')
          .chart
        .build(true);

      return chart;
  },
  //
  [DemoKeys.CHARTS_ROUNDED_BAR]: () => {

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

    var chart = CreateLinearChart<NeutralDatePoint>(durationData)
      .prepareLinearDateData(GroupingType.Monthly)
        .seriesFrom(x => x.serieId)
        .dateFrom(x => x.date)
        .valueFrom(x => x.map(x => x.value).reduce((a,b) => a + b, 0))
        .chart
      .ofType(ChartType.Bar)
      .withTooltips()
        .chart
      .withLegend()
        .at('top')
        .chart
      .setupDataset('Data 1')
        .label('Data 1')
        .color('#FF0000', '77')
        .thickness(2)
        .roundedBorders(5)
        .chart
      .setupDataset('Data 2')
        .label('Data 2')
        .color('#5500FF', '77')
        .thickness(2)
        .roundedBorders(5)
        .chart
      .build(true);

    return chart;
  },
  //
  [DemoKeys.CHARTS_STACKED_BAR]: () => {

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

    var chart = CreateLinearChart<NeutralDatePoint>(durationData)
      .prepareLinearDateData(GroupingType.Monthly)
        .seriesFrom(x => x.serieId)
        .dateFrom(x => x.date)
        .valueFrom(x => x.map(x => x.value).reduce((a,b) => a + b, 0))
        .chart
      .ofType(ChartType.StackedBar)
      .withTitle('Bar Chart - Stacked')
        .chart
      .withTooltips()
        .chart
      .withLegend()
        .at('top')
        .chart
      .setupDataset('Data 1')
        .label('Dataset 1')
        .color('#FF0000')
        .chart
      .setupDataset('Data 2')
        .label('Dataset 2')
        .color('#0000FF')
        .chart
      .setupDataset('Data 3')
        .label('Dataset 3')
        .color('#00FF00')
        .chart
      .build(true);

    return chart;
  },
  //
  [DemoKeys.CHARTS_VERTICAL_BAR]: () => {

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

    var chart = CreateLinearChart<NeutralDatePoint>(durationData)
      .prepareLinearDateData(GroupingType.Monthly)
        .seriesFrom(x => x.serieId)
        .dateFrom(x => x.date)
        .valueFrom(x => x.map(x => x.value).reduce((a,b) => a + b, 0))
        .chart
      .ofType(ChartType.Bar)
      .withTooltips()
        .chart
      .withLegend()
        .at('top')
        .chart
      .setupDataset('Data 1')
        .label('Dataset 1')
        .color('#FF0000', '77')
        .thickness(0)
        .chart
      .setupDataset('Data 2')
        .label('Dataset 2')
        .color('#00FF00', '77')
        .thickness(0)
        .chart
      .build(true);

    return chart;
  },
  //
  [DemoKeys.CHARTS_BAR]: () => {

    const durationData: NeutralDatePoint[] = [
      new NeutralDatePoint('Data 1', new Date(2021, 1, 1), 12, null),
      new NeutralDatePoint('Data 1', new Date(2021, 2, 1), 19, null),
      new NeutralDatePoint('Data 1', new Date(2021, 3, 1), 3, null),
      new NeutralDatePoint('Data 1', new Date(2021, 4, 1), 5, null),
      new NeutralDatePoint('Data 1', new Date(2021, 5, 1), 2, null),
      new NeutralDatePoint('Data 1', new Date(2021, 6, 1), 3, null),
    ];

    var chart = CreateLinearChart<NeutralDatePoint>(durationData)
        .prepareLinearDateData(GroupingType.Monthly)
          .seriesFrom(x => x.serieId)
          .dateFrom(x => x.date)
          .valueFrom(x => x.map(x => x.value).reduce((a,b) => a + b, 0))
          .chart
        .ofType(ChartType.Bar)
        .withTooltips()
          .chart
        .withTitle('# of Votes')
          .chart
        .withLegend()
          .at('top')
          .chart
        .setupDataset('Data 1')
          .label('Dataset 1')
          .color('#FF0000', '33')
          .thickness(0)
          .chart
        .build();

    return chart;
  },
  //
  [DemoKeys.CHARTS_DOUGNUT]: () => {

    const durationData: NeutralCategoryPoint[] = [
      new NeutralCategoryPoint('Red', 5, null),
      new NeutralCategoryPoint('Orange', 15, null),
      new NeutralCategoryPoint('Yellow', 5, null),
      new NeutralCategoryPoint('Green', 25, null),
      new NeutralCategoryPoint('Blue', 20, null),
    ];

    var chart = CreateRadialChart(durationData)
      .ofType(ChartType.Doughnut)
      .colors([ '#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236' ])
      .withTooltips()
        .chart
      .withLegend()
        .at('top')
        .chart
      .build(true);

    return chart;
  },
  //
  [DemoKeys.CHARTS_PIE]: () => {

    const durationData: NeutralCategoryPoint[] = [
      new NeutralCategoryPoint('Red', 5, null),
      new NeutralCategoryPoint('Orange', 15, null),
      new NeutralCategoryPoint('Yellow', 5, null),
      new NeutralCategoryPoint('Green', 25, null),
      new NeutralCategoryPoint('Blue', 20, null),
    ];

    var chart = CreateRadialChart(durationData)
      .ofType(ChartType.Pie)
      .colors([ '#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236' ])
      .withTooltips()
        .chart
      .withLegend()
        .at('top')
        .chart
      .build(true);

    return chart;

  },
  //
  [DemoKeys.CHARTS_POLAR_AREA]: () => {

    const durationData: NeutralCategoryPoint[] = [
      new NeutralCategoryPoint('Red', 5, null),
      new NeutralCategoryPoint('Orange', 15, null),
      new NeutralCategoryPoint('Yellow', 5, null),
      new NeutralCategoryPoint('Green', 25, null),
      new NeutralCategoryPoint('Blue', 20, null),
    ];

    var chart = CreateRadialChart(durationData)
      .ofType(ChartType.PolarArea)
      .colors([ '#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236' ], '44')
      .withTooltips()
        .chart
      .withLegend()
        .at('top')
        .chart
      .build(true);

    return chart;
  },
  //
  [DemoKeys.CHARTS_COLOR_PALLETE]: () => {

    // const durationData: NeutralCategoryPoint[] = [
    //   new NeutralCategoryPoint('A', 1),
    //   new NeutralCategoryPoint('B', 1),
    //   new NeutralCategoryPoint('C', 1),
    //   new NeutralCategoryPoint('D', 1),
    //   new NeutralCategoryPoint('E', 1),
    // ];

    // var results = new List<object>();

    // var values = (ColorPallete[])Enum.GetValues(typeof(ColorPallete));
    // foreach (var pallete in values)
    // {
    //     var chart = data1.CreateRadialChart()
    //         .ofType(ChartType.Doughnut)
    //         .theme('77', pallete)
    //         .build(false);

    //     results.Add(new
    //     {
    //         Name = pallete.ToString() + ' = ' + (int)pallete,
    //         Chart = chart
    //     });
    // }

    // Debug.WriteLine(JsonConvert.SerializeObject(results, new JsonSerializerSettings
    // {
    //     Formatting = Formatting.Indented,
    //     ContractResolver = new CamelCasePropertyNamesContractResolver()
    // }));

  },
  //
  [DemoKeys.CHARTS_SPRINTS_1]: () => {

    const durationData: SpeedSeries[] = [
      new SpeedSeries('done', 'Sprint88', 50),
      new SpeedSeries('extra', 'Sprint88', 5),

      new SpeedSeries('done', 'Sprint89', 75),
      new SpeedSeries('extra', 'Sprint89', 3),

      new SpeedSeries('done', 'Sprint90', 63),
      new SpeedSeries('extra', 'Sprint90', 9),

      new SpeedSeries('done', 'Sprint91', 95),
      new SpeedSeries('extra', 'Sprint91', 0)
    ];

    var chart = CreateLinearChart<SpeedSeries>(durationData)
      .prepareLinearCategoryData()
        .seriesFrom(x => x.serieId)
        .categoryFrom(x => x.sprintName)
        .valueFrom(x => x.map(x => x.value).reduce((a,b) => a + b, 0))
        .chart
      .responsive()
      .ofType(ChartType.Bar)
      .theme([ ColorPallete.Spring1 ])
      .withLegend()
        .chart
      .build(true);

    return chart;
  },
  //
  [DemoKeys.CHARTS_SPRINTS_2]: () => {

    const durationData: SpeedSeries[] = [
      new SpeedSeries('done', 'Sprint88', 50),
      new SpeedSeries('extra', 'Sprint88', 5),

      new SpeedSeries('done', 'Sprint89', 75),
      new SpeedSeries('extra', 'Sprint89', 3),

      new SpeedSeries('done', 'Sprint90', 63),
      new SpeedSeries('extra', 'Sprint90', 9),

      new SpeedSeries('done', 'Sprint91', 95),
      new SpeedSeries('extra', 'Sprint91', 0)
    ];

    var chart = CreateLinearChart<SpeedSeries>(durationData)
      .prepareLinearCategoryData()
        .singleSerie()
        .categoryFrom(x => x.sprintName)
        .valueFrom(x => x.map(x => x.value).reduce((a,b) => a + b, 0))
        .chart
      .responsive()
      .ofType(ChartType.Bar)
      .theme([ ColorPallete.Spring1 ])
      .withLegend()
        .chart
      .build(true);

    return chart;
  },
}

