import { Color } from 'chart.js';
import { BaseChartBuilder } from '../base-chart-builder';

export class TooltipBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData>
{

    constructor(private _builder: TFactory)
    {
        const opts = (this._builder as any)._chart?.config?.options ?? {};
        if (opts.plugins == null) opts.plugins = {};
        if (opts.plugins.tooltip == null) opts.plugins.tooltip = {};
        opts.plugins.tooltip.enabled = true;
    }

    public backgroundColor(color: Color): TooltipBuilder<TFactory, TData> {
        return this;
    }

    public useSeriesPointStyles(): TooltipBuilder<TFactory, TData> {
        return this;
    }

    public cornerRadius(radius: number): TooltipBuilder<TFactory, TData> {
        return this;
    }

    public atPointLocation(): TooltipBuilder<TFactory, TData> {
        return this;
    }

    public atVerticalAxis(): TooltipBuilder<TFactory, TData> {
        return this;
    }

    public border(color: Color, width: number): TooltipBuilder<TFactory, TData> {
        return this;
    }

    public get chart(): TFactory {
        return this._builder;
    }

}