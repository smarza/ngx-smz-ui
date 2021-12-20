import { Color } from 'chart.js';
import { BaseChartBuilder } from '../base-chart-builder';

export class TitleBuilder<TFactory extends BaseChartBuilder<TFactory, TData>, TData>
{

    constructor(private _builder: TFactory, public title: string)
    {

    }

    public padding(top: number, bottom: number): TitleBuilder<TFactory, TData> {
        return this;
    }

    public font(size: number, lineheight: number = null, family: string = null): TitleBuilder<TFactory, TData> {
        return this;
    }

    public alignment(align: 'start' | 'center' | 'end'): TitleBuilder<TFactory, TData> {
        return this;
    }

    public at(position: 'top' | 'left' | 'bottom' | 'right'): TitleBuilder<TFactory, TData> {
        return this;
    }

    public color(color: Color): TitleBuilder<TFactory, TData> {
        return this;
    }

    public get chart(): TFactory {
        return this._builder;
    }

}