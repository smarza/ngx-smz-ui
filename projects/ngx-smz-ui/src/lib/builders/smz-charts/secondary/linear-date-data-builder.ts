import { BaseChartBuilder } from '../base-chart-builder';
import { GroupingType } from '../models/grouping-type';

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function dateKey(d: Date, grouping: GroupingType): string {
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    switch (grouping) {
        case GroupingType.Yearly:
            return `${y}`;
        case GroupingType.Monthly:
            return `${y}-${String(m).padStart(2, '0')}`;
        case GroupingType.Daily:
            return `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        default:
            return `${y}-${String(m).padStart(2, '0')}`;
    }
}

function dateLabel(key: string, grouping: GroupingType): string {
    if (grouping === GroupingType.Yearly) return key;
    const [y, m] = key.split('-').map(Number);
    if (grouping === GroupingType.Monthly && m != null) {
        return `${MONTH_LABELS[m - 1]} ${y}`;
    }
    return key;
}

export class LinearDateDataBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData>
{
    private _seriesSelector: (x: TData) => string = () => '';
    private _dateSelector: (x: TData) => Date = () => new Date();
    private _valueSelector: (x: TData[]) => number = () => 0;
    private _dataBuilt = false;

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
        this._seriesSelector = seriesSelector;
        return this;
    }

    public singleSerie(): LinearDateDataBuilder<TFactory, TData> {
        return this;
    }

    public dateFrom(dateSelector: (x: TData) => Date): LinearDateDataBuilder<TFactory, TData> {
        this._dateSelector = dateSelector;
        return this;
    }

    public valueFrom(valueSelector: (x: TData[]) => number): LinearDateDataBuilder<TFactory, TData> {
        this._valueSelector = valueSelector;
        return this;
    }

    public addSerie(name: string, addSerieSelector: (x: Date[]) => TData): LinearDateDataBuilder<TFactory, TData> {
        return this;
    }

    public roundValues(decimalPlaces: number): LinearDateDataBuilder<TFactory, TData> {
        return this;
    }

    private buildLineChartAxis(): any[] {
        return [];
    }

    private buildData(): void {
        const data = this._builder.getOriginalData();
        if (data == null || data.length === 0) {
            return;
        }
        const byDate = new Map<string, Map<string, TData[]>>();
        const seriesOrder: string[] = [];
        for (const item of data) {
            const d = this._dateSelector(item);
            const s = this._seriesSelector(item);
            const key = dateKey(d, this.type);
            if (!byDate.has(key)) byDate.set(key, new Map());
            const bySeries = byDate.get(key)!;
            if (!bySeries.has(s)) {
                bySeries.set(s, []);
                if (!seriesOrder.includes(s)) seriesOrder.push(s);
            }
            bySeries.get(s)!.push(item);
        }
        const labels = [...byDate.keys()].sort().map((k) => dateLabel(k, this.type));
        const datasets = seriesOrder.map((seriesId) => ({
            id: seriesId,
            label: seriesId,
            order: 0,
            data: labels.map((label, i) => {
                const key = [...byDate.keys()].sort()[i];
                const group = byDate.get(key)?.get(seriesId) ?? [];
                return { x: label, y: this._valueSelector(group), data: { value: this._valueSelector(group) } };
            }),
        }));
        const chartData = { labels, datasets };
        const cfg = this._builder._chart.config as { type?: string; data?: any; options?: any };
        if (cfg) cfg.data = chartData;
        this._builder._chart.data = chartData as any;
    }

    public get chart(): TFactory {
        if (!this._dataBuilt) {
            this.buildData();
            this._dataBuilt = true;
        }
        return this._builder;
    }
}