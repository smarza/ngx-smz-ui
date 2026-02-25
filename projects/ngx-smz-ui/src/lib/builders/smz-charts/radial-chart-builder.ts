import { Color } from 'chart.js';
import { BaseChartBuilder } from './base-chart-builder';
import { ColorPallete } from './models/color-pallete';
import { ChartColorSelector } from './models/color-selector';
import { GroupingType } from './models/grouping-type';
import { RadialDataBuilder } from './secondary/radial-data-builder';

function toHexWithTransparency(color: Color, transparency: string): string {
    const hex = typeof color === 'string' ? color.replace('#', '') : (color as unknown as string);
    return `#${hex}${transparency}`;
}

export function CreateRadialChart<TData>(data: TData[]): RadialChartBuilder<TData>
{
    return new RadialChartBuilder<TData>(data);
}

export class RadialChartBuilder<TData> extends BaseChartBuilder<RadialChartBuilder<TData>, TData>
{
    protected override that = this;
    private _colors: Color[] = [];
    private _backgroundTransparency = 'ff';

    constructor(originalData: TData[])
    {
        super(originalData);
    }

    public setValuesRounding(decimals: number): RadialChartBuilder<TData> {
        return this;
    }

    public theme(palletes: ColorPallete[], backgroundTransparency?: string): RadialChartBuilder<TData> {
        return this.colors(ChartColorSelector.GetColors(palletes), backgroundTransparency ?? 'ff');
    }

    public colors(colors: Color[], backgroundTransparency: string = 'ff'): RadialChartBuilder<TData> {
        this._colors = Array.isArray(colors) ? [...colors] : [];
        this._backgroundTransparency = backgroundTransparency ?? 'ff';
        return this;
    }

    public roundToNearestStorageUnit(): RadialChartBuilder<TData> {
        return this;
    }

    public prepareData(type: GroupingType) {
        return new RadialDataBuilder<RadialChartBuilder<TData>, TData>(this, type);
    }

    public override build(debug = false) {
        this.ensureRadialData();
        return super.build(debug);
    }

    private ensureRadialData(): void {
        const data = this._chart?.data;
        const hasData = data?.datasets?.length > 0 && (data.datasets[0] as any)?.data?.length > 0;
        if (hasData) return;
        const raw = this.getOriginalData();
        if (raw == null || raw.length === 0) return;
        const labels: string[] = [];
        const values: number[] = [];
        for (const item of raw) {
            const row = item as { category?: string; label?: string; value?: number };
            labels.push(row.category ?? row.label ?? '');
            values.push(Number(row.value ?? 0));
        }
        const backgroundColor = this._colors.length >= values.length
            ? values.map((_, i) => toHexWithTransparency(this._colors[i], this._backgroundTransparency))
            : undefined;
        const chartData = { labels, datasets: [{ data: values, backgroundColor }] };
        const cfg = this._chart.config as { type?: string; data?: any; options?: any };
        if (cfg) cfg.data = chartData;
        this._chart.data = chartData;
    }
}