import { ChartDataset, Color, PointStyle } from 'chart.js';
import { BaseChartBuilder } from '../base-chart-builder';
import { DatasetType } from '../models/dataset-type';
import { DatasetBuilder } from './dataset-builder';

const DATASET_TYPE_MAP: Record<DatasetType, string> = {
    [DatasetType.Line]: 'line',
    [DatasetType.Bar]: 'bar',
};

function toHexColor(color: Color, transparency: string): string {
    const hex = typeof color === 'string' ? color.replace('#', '') : (color as unknown as string);
    return `#${hex}${transparency}`;
}

export class LinearDatasetBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData> extends DatasetBuilder<TFactory, TData>
{

    constructor(builder: TFactory, public datasets: ChartDataset[])
    {
        super(builder);
    }

    public ofType(type: DatasetType): LinearDatasetBuilder<TFactory, TData>
    {
        const typeStr = DATASET_TYPE_MAP[type] ?? 'bar';
        for (const d of this.datasets) {
            if (d != null) (d as any).type = typeStr;
        }
        return this;
    }

    public valuesRounding(decimals: number): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }

    public label(label: string): LinearDatasetBuilder<TFactory, TData>
    {
        for (const d of this.datasets) {
            if (d != null) d.label = label;
        }
        return this;
    }

    public thickness(thickness: number): LinearDatasetBuilder<TFactory, TData>
    {
        for (const d of this.datasets) {
            if (d != null) (d as any).borderWidth = thickness;
        }
        return this;
    }

    public customAxis(axisId: string): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }

    public color(color: Color, transparency: string = 'ff'): LinearDatasetBuilder<TFactory, TData>
    {
        const bg = toHexColor(color, transparency);
        const border = typeof color === 'string' ? color : (color as unknown as string);
        for (const d of this.datasets) {
            if (d != null) {
                (d as any).backgroundColor = bg;
                (d as any).borderColor = border;
            }
        }
        return this;
    }

    public barPercentage(value: number): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }

    public pointStyle(style: PointStyle): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }

    public pointRadius(radius: number, hitRadius = null): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }

    public roundedBorders(radius: number): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }

    public roundToNearestStorageUnit(showUnitsInChartTitle = false): LinearDatasetBuilder<TFactory, TData>
    {
        return this;
    }
}