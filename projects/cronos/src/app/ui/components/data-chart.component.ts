import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartOptions, TooltipItem } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { NgCloneModule } from '@ngx-smz/core';
import { ChartData } from '@models/chart-data';

@Component({
  selector: 'app-data-chart',
  standalone: true,
  imports: [CommonModule, NgCloneModule, ChartModule],
  template: `
  <ng-container *ngClone="data as data">
    <p-chart [type]="data.type" [data]="data" [options]="chartOptions"/>
  </ng-container>
  `
})
export class DataChartComponent implements OnInit {
  @Input() public data: ChartData;
  @Input() public maintainAspectRatio = true;
  @Input() public aspectRatio = 2;
  public chartOptions: ChartOptions = {};

  public ngOnInit(): void {
    this.initializeChartOptions();

    if (this.data.normalize) {
      this.setupNormalization();
    }

    this.chartOptions.maintainAspectRatio = this.maintainAspectRatio;
    this.chartOptions.aspectRatio = this.aspectRatio;
  }

  private initializeChartOptions(): void {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      plugins: {
        legend: {
          display: true
        },
        tooltip: {
          callbacks: {
            label: (context): string => this.getTooltipLabel(context)
          }
        }
      },
      animation: {
        duration: 0
      },
      scales: {
        y: { }
      }
    };
  }

  public setupNormalization(): void {
    this.chartOptions.scales['y'] = {
      beginAtZero: this.data.min === 0,
      min: this.data.min,
      max: this.data.max
    };
  }
  private getTooltipLabel(context: TooltipItem<'bar' | 'pie'>): string {
    const chartType = this.data.type;

    if (chartType === 'bar') {
      return this.getBarTooltipLabel(context);
    }

    if (chartType === 'pie') {
      return this.getPieTooltipLabel(context);
    }

    return '';
  }

  private getBarTooltipLabel(context: TooltipItem<'bar'>): string {
    let label = context.dataset.label || '';

    if (label) {
      label += ': ';
    }

    if (context.parsed.y !== null) {
      label += context.parsed.y;
    }

    return label;
  }

  private getPieTooltipLabel(context: TooltipItem<'pie'>): string {
    let label = context.dataset.label || '';

    if (label) {
      label += ': ';
    }

    if (context.raw !== null) {
      label += context.raw;
    }

    return label;
  }
}