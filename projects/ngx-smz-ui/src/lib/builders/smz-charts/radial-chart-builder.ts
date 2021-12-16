import { Color } from 'chart.js';
import { BaseChartBuilder } from './base-chart-builder';
import { ColorPallete } from './models/color-pallete';
import { ChartColorSelector } from './models/color-selector';
import { GroupingType } from './models/grouping-type';
import { RadialDataBuilder } from './secondary/radial-data-builder';

export function CreateRadialChart<TData>(data: TData[]): RadialChartBuilder<TData>
{
    return new RadialChartBuilder<TData>(data);
}

export class RadialChartBuilder<TData> extends BaseChartBuilder<RadialChartBuilder<TData>, TData>
{
    protected that = this;
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
        return this;
    }

    public roundToNearestStorageUnit(): RadialChartBuilder<TData> {
        return this;
    }

    public prepareData(type: GroupingType) {
        return new RadialDataBuilder<RadialChartBuilder<TData>, TData>(this, type);
    }
}