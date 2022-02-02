import { ChartDataset, Color, PointStyle } from 'chart.js';
import { BaseChartBuilder } from '../base-chart-builder';
import { DatasetType } from '../models/dataset-type';
import { DatasetBuilder } from './dataset-builder';

export class LinearDatasetBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData> extends DatasetBuilder<TFactory, TData>
{

    constructor(builder: TFactory, public datasets: ChartDataset[])
    {
        super(builder);
    }

    public ofType(type: DatasetType): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }

    public valuesRounding(decimals: number): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }

    public label(label: string): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }

    public thickness(thickness: number): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }

    public customAxis(axisId: string): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }

    public color(color: Color, transparency: string = 'ff'): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }

    public barPercentage(value: number): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }

    public pointStyle(style: PointStyle): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }

    public pointRadius(radius: number, hitRadius = null): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }

    public roundedBorders(radius: number): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }

    public roundToNearestStorageUnit(showUnitsInChartTitle = false): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }
}