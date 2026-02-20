import { LayoutPosition } from 'chart.js';
import { BaseChartBuilder } from '../base-chart-builder';

export class LegendBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData>
{

    constructor(private _builder: TFactory)
    {
        const opts = (this._builder as any)._chart?.config?.options ?? {};
        if (opts.plugins == null) opts.plugins = {};
        if (opts.plugins.legend == null) opts.plugins.legend = {};
        opts.plugins.legend.display = true;
    }

    public align(align: 'start' | 'center' | 'end'): LegendBuilder<TFactory, TData> {
        return this;
    }

    public at(position: LayoutPosition): LegendBuilder<TFactory, TData> {
        const opts = (this._builder as any)._chart?.config?.options ?? {};
        if (opts.plugins?.legend) opts.plugins.legend.position = position;
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