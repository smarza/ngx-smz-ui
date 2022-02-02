import { BaseChartBuilder } from '../base-chart-builder';
export class LinearCategoryDataBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData>
{

    constructor(private _builder: TFactory)
    {

    }

    public appendExtraData(converter: (x: TData) => any): LinearCategoryDataBuilder<TFactory, TData> {
        return this;
    }

    public categoryFrom(categorySelector: (x: TData) => string): LinearCategoryDataBuilder<TFactory, TData> {
        return this;
    }

    public seriesFrom(seriesSelector: (x: TData) => string): LinearCategoryDataBuilder<TFactory, TData> {
        return this;
    }

    public valueFrom(valueSelector: (x: TData[]) => number): LinearCategoryDataBuilder<TFactory, TData> {
        return this;
    }

    public singleSerie(): LinearCategoryDataBuilder<TFactory, TData> {
        return this;
    }

    public roundValues(decimalPlaces: number): LinearCategoryDataBuilder<TFactory, TData> {
        return this;
    }

    public get chart(): TFactory {
        return this._builder;
    }

}