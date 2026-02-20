import { Chart } from 'chart.js';
import { SmzChart } from '../../modules/smz-charts/models/chart';
import { ChartType } from './models/chart-type';
import { LegendBuilder } from './secondary/legend-builder';
import { TitleBuilder } from './secondary/title-builder';
import { TooltipBuilder } from './secondary/tooltip-builder';

function NewChart(): Chart
{
    const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
    if (canvas == null) {
        throw new Error('Chart.js requires a canvas element. Ensure the code runs in a browser context.');
    }
    return new Chart(canvas, { type: 'bar', data: { datasets: [] }, options: {} });
}

const CHART_TYPE_MAP: Record<ChartType, string> = {
    [ChartType.Empty]: 'bar',
    [ChartType.Line]: 'line',
    [ChartType.Bar]: 'bar',
    [ChartType.Radar]: 'radar',
    [ChartType.Doughnut]: 'doughnut',
    [ChartType.PolarArea]: 'polarArea',
    [ChartType.Bubble]: 'bubble',
    [ChartType.Pie]: 'pie',
    [ChartType.StackedBar]: 'bar',
    [ChartType.Mixed]: 'bar',
    [ChartType.HorizontalBar]: 'bar',
};

export class BaseChartBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData>
{
    protected that: TFactory;
    public _chart: Chart = NewChart();

    constructor(protected _originalData: TData[])
    {
    }

    public getOriginalData(): TData[]
    {
        return this._originalData;
    }

    public ofType(type: ChartType): TFactory
    {
        const chartType = CHART_TYPE_MAP[type] ?? 'bar';
        const cfg = this._chart.config as { type?: string; data?: any; options?: any };
        if (cfg) cfg.type = chartType;
        return this.that;
    }

    public withTitle(title: string): TitleBuilder<TFactory, TData> {
        return new TitleBuilder(this.that, title);
    }

    public withTooltips(): TooltipBuilder<TFactory, TData> {
        return new TooltipBuilder(this.that);
    }

    public withLegend(): LegendBuilder<TFactory, TData> {
        return new LegendBuilder(this.that);
    }

    public padding(left: number, right: number, top: number, bottom: number): TFactory
    {
        return this.that;
    }

    public aspectRatio(ratio: number): TFactory
    {
        return this.that;
    }

    public allowEmpty(): TFactory
    {
        return this.that;
    }

    public responsive(): TFactory
    {
        return this.that;
    }

    public build(debug = false): SmzChart {
        const cfg = this._chart?.config;
        if (cfg == null) {
            return { type: null, config: null, data: null };
        }
        const cfgAny = cfg as { type?: string; data?: any; options?: any };
        return {
            type: (cfgAny.type as SmzChart['type']) ?? null,
            data: cfgAny.data ?? null,
            config: cfgAny.options ?? {},
        };
    }

}