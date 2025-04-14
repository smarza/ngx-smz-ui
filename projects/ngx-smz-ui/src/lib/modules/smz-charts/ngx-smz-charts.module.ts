import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SmzChartComponent } from './features/chart/chart.component';

@NgModule({
    imports: [CommonModule],
    exports: [SmzChartComponent],
    declarations: [SmzChartComponent]
  })
  export class SmzChartModule {}
