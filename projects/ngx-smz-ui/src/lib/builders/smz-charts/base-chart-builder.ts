import { Chart } from 'chart.js';
import { SmzChart } from '../../modules/smz-charts/models/chart';
import { ChartType } from './models/chart-type';
import { LegendBuilder } from './secondary/legend-builder';
import { TitleBuilder } from './secondary/title-builder';
import { TooltipBuilder } from './secondary/tooltip-builder';

function NewChart(): Chart
{
    return new Chart(null, { type: null, data: { datasets: [] }, options: {} });
}

export class BaseChartBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData>
{
    protected that: TFactory;
    public _chart: Chart = NewChart();
    // public _seriesSelector: (x: TData) => string;
    // public _dateSelector: (x: TData) => Date;
    // public _valueSelector: (x: TData[]) => number;

    constructor(private _originalData: TData[])
    {
    }

    public ofType(type: ChartType): TFactory
    {
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

        const results: SmzChart = {
            type: null,
            config: null,
            data: null
        };

        return results;
    }

}