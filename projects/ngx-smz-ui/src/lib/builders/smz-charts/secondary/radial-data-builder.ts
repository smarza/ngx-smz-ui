import { BaseChartBuilder } from '../base-chart-builder';
import { GroupingType } from '../models/grouping-type';

export class RadialDataBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData>
{

    constructor(private _builder: TFactory, public type: GroupingType)
    {

    }

    public appendExtraData(converter: (x: TData) => any): RadialDataBuilder<TFactory, TData> {
        return this;
    }

    public seriesFrom(seriesSelector: (x: TData) => string): RadialDataBuilder<TFactory, TData> {
        return this;
    }

    public maximumSeries(value: number, label: string): RadialDataBuilder<TFactory, TData> {
        return this;
    }

    public take(value: number): RadialDataBuilder<TFactory, TData> {
        return this;
    }

    public valueFrom(valueSelector: (x: TData[]) => number): RadialDataBuilder<TFactory, TData> {
        return this;
    }

    public roundValues(decimalPlaces: number): RadialDataBuilder<TFactory, TData> {
        return this;
    }

    public get chart(): TFactory {
        return this._builder;
    }

}