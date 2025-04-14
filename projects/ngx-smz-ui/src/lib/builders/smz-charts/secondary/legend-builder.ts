import { LayoutPosition } from 'chart.js';
import { BaseChartBuilder } from '../base-chart-builder';

export class LegendBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData>
{

    constructor(private _builder: TFactory)
    {

    }

    public align(align: 'start' | 'center' | 'end'): LegendBuilder<TFactory, TData> {
        return this;
    }

    public at(position: LayoutPosition): LegendBuilder<TFactory, TData> {
        return this;
    }

    public title(title: string): LegendBuilder<TFactory, TData> {
        return this;
    }

    public usePointStyles(): LegendBuilder<TFactory, TData> {
        return this;
    }

    public get chart(): TFactory {
        return this._builder;
    }

}