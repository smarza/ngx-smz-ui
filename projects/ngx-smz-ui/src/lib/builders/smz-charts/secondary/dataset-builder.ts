import { BaseChartBuilder } from '../base-chart-builder';

export class DatasetBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData>
{

    constructor(private _builder: TFactory)
    {

    }

    public get chart(): TFactory {
        return this._builder;
    }

}