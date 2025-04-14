import { BaseChartBuilder } from '../base-chart-builder';
import { GroupingType } from '../models/grouping-type';

export class LinearDateDataBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData>
{

    constructor(private _builder: TFactory, public type: GroupingType)
    {

    }
    public enforceStartDate(data: Date): LinearDateDataBuilder<TFactory, TData> {
        return this;
    }

    public enforceEndDate(data: Date): LinearDateDataBuilder<TFactory, TData> {
        return this;
    }

    public take(value: number): LinearDateDataBuilder<TFactory, TData> {
        return this;
    }

    public appendExtraData(converter: (x: TData) => any): LinearDateDataBuilder<TFactory, TData> {
        return this;
    }

    public seriesFrom(seriesSelector: (x: TData) => string): LinearDateDataBuilder<TFactory, TData> {
        return this;
    }

    public singleSerie(): LinearDateDataBuilder<TFactory, TData> {
        return this;
    }

    public dateFrom(dateSelector: (x: TData) => Date): LinearDateDataBuilder<TFactory, TData> {
        return this;
    }

    public valueFrom(valueSelector: (x: TData[]) => number): LinearDateDataBuilder<TFactory, TData> {
        return this;
    }

    public addSerie(name: string, addSerieSelector: (x: Date[]) => TData): LinearDateDataBuilder<TFactory, TData> {
        return this;
    }

    public roundValues(decimalPlaces: number): LinearDateDataBuilder<TFactory, TData> {
        return this;
    }

    private buildLineChartAxis(): any[] {
        // TODO: any é uma Point
        return [];
    }

    public get chart(): TFactory {
        return this._builder;
    }

}