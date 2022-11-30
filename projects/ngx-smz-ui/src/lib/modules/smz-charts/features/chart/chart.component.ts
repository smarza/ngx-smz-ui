
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { SmzDialogsConfig } from '../../../smz-dialogs/smz-dialogs.config';
import { SmzChartTypes } from '../../models/chart';
import { SmzChartInteractionEvent } from '../../models/chart-click-event';

@Component({
  selector: 'smz-ui-chart',
  templateUrl: './chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SmzChartComponent implements AfterViewInit, OnDestroy {
  @Input() type: SmzChartTypes;

  @Input() plugins: any[] = [];

  @Input() width: string;

  @Input() height: string;

  @Input() responsive: boolean = true;
  @Input() styleClass: string = '';

  @Output() chartClick: EventEmitter<SmzChartInteractionEvent<any>> = new EventEmitter<SmzChartInteractionEvent<any>>();
  @Output() chartHover: EventEmitter<SmzChartInteractionEvent<any>> = new EventEmitter<SmzChartInteractionEvent<any>>();

  private _originalData: any;
  private _data: any;

  private _options: any = {};

  public title: string;
  public chart: any;

  constructor(public el: ElementRef, public defaultConfig: SmzDialogsConfig) {}

  @Input() public get data(): any {
    return this._data;
  }

  public set data(val: any) {
    this._data = val;
    this._originalData = JSON.parse(JSON.stringify(val));
    this.reinit();
  }

  @Input() public get options(): any {
    return this._options;
  }

  public set options(val: any) {
    this._options = val;

    if (this._options != null) {
      this.title = this._options.plugins?.title?.text;

      // 'info' is an array of all elements in the clicked index
      this._options.onClick = (e, info) => {
        const canvasPosition = getRelativePosition(e, this.chart);

        const element = (this.chart as Chart).getElementsAtEventForMode(
          e,
          'dataset',
          { axis: '', intersect: true },
          true
        );

        let datasetIndex = -1;
        let pointIndex = -1;
        let value = null;

        // TODO: tratar o clique em gráficos de barras horizontais
        if (this.chart.scales.x != null) {
          // linear charts, except horizontal bar charts
          if (element != null && element.length > 0) {
            datasetIndex = element[0].datasetIndex;
          }
          pointIndex = this.chart.scales.x.getValueForPixel(canvasPosition.x);

          if (datasetIndex != -1 && pointIndex != -1) {
            value = this._originalData.datasets[datasetIndex].data[pointIndex];
          }
        } else {
          // radial charts
          const activeElements = (this.chart as Chart).getActiveElements();
          if (activeElements.length > 0) {
            datasetIndex = activeElements[0].datasetIndex;
            pointIndex = activeElements[0].index;
          }
          if (datasetIndex != -1 && pointIndex != -1 && this._originalData.datasets[datasetIndex].extra?.length > 0) {
            value = this._originalData.datasets[datasetIndex].extra[pointIndex];
          }
        }

        this.chartClick.emit({ chart: this.chart, event: e, value: value });
      };

      this._options.onHover = (e, dataset, chart) => {
        this.chartHover.emit({ chart: this.chart, event: e, value: dataset });
      };

      // this._options.events = ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'];
    }
    this.reinit();
  }

  public ngAfterViewInit(): void {
    this.initChart();
  }

  public initChart(): void {
    if (this.type === 'empty') return;

    let opts = this.options || {};
    opts.responsive = this.responsive;

    // allows chart to resize in responsive mode
    if (opts.responsive && (this.height || this.width)) {
      opts.maintainAspectRatio = false;
    }

    this.chart = new Chart(this.el.nativeElement.children[0].children[0], {
      type: this.type,
      data: this.data,
      options: this.options,
      plugins: this.plugins
    });
  }

  public getCanvas(): void {
    return this.el.nativeElement.children[0].children[0];
  }

  public getBase64Image(): void {
    return this.chart.toBase64Image();
  }

  public generateLegend(): void {
    if (this.chart) {
      return this.chart.generateLegend();
    }
  }

  public refresh(): void {
    if (this.chart) {
      this.chart.update();
    }
  }

  public reinit(): void {
    if (this.chart) {
      this.chart.destroy();
      this.initChart();
    }
  }

  public ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
