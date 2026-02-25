import { BaseChartBuilder } from '../base-chart-builder';

export class LinearCategoryDataBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData>
{
    private _categorySelector: (x: TData) => string = () => '';
    private _seriesSelector: (x: TData) => string = () => '';
    private _valueSelector: (x: TData[]) => number = () => 0;
    private _singleSerie = false;
    private _dataBuilt = false;

    constructor(private _builder: TFactory)
    {
    }

    public appendExtraData(converter: (x: TData) => any): LinearCategoryDataBuilder<TFactory, TData> {
        return this;
    }

    public categoryFrom(categorySelector: (x: TData) => string): LinearCategoryDataBuilder<TFactory, TData> {
        this._categorySelector = categorySelector;
        return this;
    }

    public seriesFrom(seriesSelector: (x: TData) => string): LinearCategoryDataBuilder<TFactory, TData> {
        this._seriesSelector = seriesSelector;
        return this;
    }

    public valueFrom(valueSelector: (x: TData[]) => number): LinearCategoryDataBuilder<TFactory, TData> {
        this._valueSelector = valueSelector;
        return this;
    }

    public singleSerie(): LinearCategoryDataBuilder<TFactory, TData> {
        this._singleSerie = true;
        return this;
    }

    public roundValues(decimalPlaces: number): LinearCategoryDataBuilder<TFactory, TData> {
        return this;
    }

    private buildData(): void {
        const data = this._builder.getOriginalData();
        if (data == null || data.length === 0) return;
        if (this._singleSerie) {
            const byCategory = new Map<string, TData[]>();
            const categoryOrder: string[] = [];
            for (const item of data) {
                const cat = this._categorySelector(item);
                if (!byCategory.has(cat)) categoryOrder.push(cat);
                const list = byCategory.get(cat) ?? [];
                list.push(item);
                byCategory.set(cat, list);
            }
            const labels = categoryOrder;
            const values = labels.map((label) => this._valueSelector(byCategory.get(label) ?? []));
            const chartData = { labels, datasets: [{ id: '_', label: '', order: 0, data: values }] };
            const cfg = this._builder._chart.config as { type?: string; data?: any; options?: any };
            if (cfg) cfg.data = chartData;
            this._builder._chart.data = chartData;
            return;
        }
        const byCategory = new Map<string, Map<string, TData[]>>();
        const categoryOrder: string[] = [];
        const seriesOrder: string[] = [];
        for (const item of data) {
            const cat = this._categorySelector(item);
            const series = this._seriesSelector(item);
            if (!byCategory.has(cat)) {
                byCategory.set(cat, new Map());
                categoryOrder.push(cat);
            }
            const bySeries = byCategory.get(cat)!;
            if (!bySeries.has(series)) {
                bySeries.set(series, []);
                if (!seriesOrder.includes(series)) seriesOrder.push(series);
            }
            bySeries.get(series)!.push(item);
        }
        const labels = categoryOrder;
        const datasets = seriesOrder.map((seriesId) => ({
            id: seriesId,
            label: seriesId,
            order: 0,
            data: labels.map((label) => {
                const group = byCategory.get(label)?.get(seriesId) ?? [];
                return this._valueSelector(group);
            }),
        }));
        const chartData = { labels, datasets };
        const cfg = this._builder._chart.config as { type?: string; data?: any; options?: any };
        if (cfg) cfg.data = chartData;
        this._builder._chart.data = chartData;
    }

    public get chart(): TFactory {
        if (!this._dataBuilt) {
            this.buildData();
            this._dataBuilt = true;
        }
        return this._builder;
    }
}