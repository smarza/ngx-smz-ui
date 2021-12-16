import { BaseChartBuilder } from '../base-chart-builder';

export class HistogramDataBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData>
{

    constructor(private _builder: TFactory, public intervalCount: number)
    {

    }

    public appendExtraData(converter: (x: TData) => any): HistogramDataBuilder<TFactory, TData> {
        return this;
    }

    public setDesiredIntervalFraction(value: number): HistogramDataBuilder<TFactory, TData> {
        return this;
    }

    public valuesFrom(valueSelector: (x: TData[]) => number): HistogramDataBuilder<TFactory, TData> {
        return this;
    }

    public get chart(): TFactory {
        return this._builder;
    }

}