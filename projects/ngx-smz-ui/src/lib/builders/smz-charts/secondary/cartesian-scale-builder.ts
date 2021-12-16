import { LinearScaleOptions } from 'chart.js';
import { BaseChartBuilder } from '../base-chart-builder';
import { AxisOverflowDirection } from '../models/axis-overflow-direction';
import { AxisOverflowType } from '../models/axis-overflow-type';
import { AxisPosition } from '../models/axis-position';
import { CartesianTitleBuilder } from './cartesian-title-builder';
import { DatasetBuilder } from './dataset-builder';

export class CartesianScaleBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData>
{

    constructor(builder: TFactory, public scale: LinearScaleOptions)
    {
    }

    public stacked(): CartesianScaleBuilder<TFactory, TData>
    {
        return this;
    }

    public hideGridlines(): CartesianScaleBuilder<TFactory, TData>
    {
        return this;
    }

    public at(position: AxisPosition): CartesianScaleBuilder<TFactory, TData>
    {
        return this;
    }

    public title(label: string): CartesianTitleBuilder<TFactory, TData>
    {
        return new CartesianTitleBuilder(this, this.scale);
    }

    public range(min?: number, max?: number): CartesianScaleBuilder<TFactory, TData>
    {
        return this;
    }

    public stepSize(size: number): CartesianScaleBuilder<TFactory, TData>
    {
        return this;
    }

    public setYAxisOverflow(type: AxisOverflowType, direction: AxisOverflowDirection, value: number): CartesianScaleBuilder<TFactory, TData>
    {
        return this;
    }

    public autoSkip(padding?: number): CartesianScaleBuilder<TFactory, TData>
    {
        return this;
    }

}