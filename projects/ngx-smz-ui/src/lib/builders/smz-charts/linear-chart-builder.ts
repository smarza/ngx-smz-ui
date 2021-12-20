import { Color, LinearScaleOptions } from 'chart.js';
import { BaseChartBuilder } from './base-chart-builder';
import { ColorPallete } from './models/color-pallete';
import { ChartColorSelector } from './models/color-selector';
import { GroupingType } from './models/grouping-type';
import { CartesianScaleBuilder } from './secondary/cartesian-scale-builder';
import { HistogramDataBuilder } from './secondary/histogram-data-builder';
import { LinearCategoryDataBuilder } from './secondary/linear-category-data-builder';
import { LinearDatasetBuilder } from './secondary/linear-dataset-builder';
import { LinearDateDataBuilder } from './secondary/linear-date-data-builder';

export function CreateLinearChart<TData>(data: TData[]): LinearChartBuilder<TData>
{
    return new LinearChartBuilder<TData>(data);
}

export class LinearChartBuilder<TData> extends BaseChartBuilder<LinearChartBuilder<TData>, TData>
{
    protected that = this;
    constructor(originalData: TData[])
    {
        super(originalData);
    }

    public prepareLinearDateData(type: GroupingType) {
        return new LinearDateDataBuilder<LinearChartBuilder<TData>, TData>(this, type);
    }

    public prepareLinearCategoryData() {
        return new LinearCategoryDataBuilder<LinearChartBuilder<TData>, TData>(this);
    }

    public prepareHistogramData(intervalCount: number) {
        return new HistogramDataBuilder<LinearChartBuilder<TData>, TData>(this, intervalCount);
    }

    public setupDataset(datasetId: string) {

        var dataset = this._chart.data.datasets.find(x => x['id'] == datasetId);

        if (dataset == null && this._chart.data.datasets.length > 0) throw new Error(`Unknown dataset: ${datasetId}`);

        var orderedDatasets = this._chart.data.datasets.filter(x => x.order != null);

        if (orderedDatasets != null && orderedDatasets.length > 0)
        {
            if (dataset != null)
            {
                dataset.order = Math.max(...orderedDatasets.map(x => x.order)) + 1;
            }
        }
        else
        {
            if (dataset != null)
            {
                dataset.order = 0;
            }
        }

        return new LinearDatasetBuilder<LinearChartBuilder<TData>, TData>(this.that, [ dataset ]);
    }

    public setupDatasets() {
        return new LinearDatasetBuilder<LinearChartBuilder<TData>, TData>(this.that, this._chart.data.datasets);
    }

    public theme(palletes: ColorPallete[], backgroundTransparency?: string): LinearChartBuilder<TData> {
        return this.colors(ChartColorSelector.GetColors(palletes), backgroundTransparency ?? 'ff');
    }

    public colors(colors: Color[], backgroundTransparency: string = 'ff'): LinearChartBuilder<TData> {
        return this;
    }

    public withXAxis(axisId: string): CartesianScaleBuilder<LinearChartBuilder<TData>, TData> {
        return this.withAxis(axisId)
    }

    public withYAxis(axisId: string): CartesianScaleBuilder<LinearChartBuilder<TData>, TData> {
        return this.withAxis(axisId)
    }

    public withAxis(axisId: string) {
        const axis: LinearScaleOptions = null;
        return new CartesianScaleBuilder<LinearChartBuilder<TData>, TData>(this.that, axis);
    }

    // TODO: any é um Point
    // o nome desse método tem WithExpression pq o typescript não suporte overloads de métodos
    public reorderCategoriesWithExpression(expression: (x: any[]) => any): LinearChartBuilder<TData> {
        return this;
    }

    public reorderCategories(orderedCategories: string[]): LinearChartBuilder<TData> {
        return this;
    }

    public setColors(pallete: ColorPallete, indices: number[]): LinearChartBuilder<TData> {
        return this;
    }
}