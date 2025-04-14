import { LinearScaleOptions } from 'chart.js';
import { BaseChartBuilder } from '../base-chart-builder';
import { AxisPosition } from '../models/axis-position';
import { CartesianScaleBuilder } from './cartesian-scale-builder';

export class CartesianTitleBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData>
{

    constructor(builder: CartesianScaleBuilder<TFactory, TData>, public scale: LinearScaleOptions)
    {
    }

    public at(position: AxisPosition): CartesianTitleBuilder<TFactory, TData>
    {
        return this;
    }

    public font(size: number, lineHeight: number, font: string): CartesianTitleBuilder<TFactory, TData>
    {
        return this;
    }

    public padding(left: number, top: number, right: number, bottom: number): CartesianTitleBuilder<TFactory, TData>
    {
        return this;
    }

}