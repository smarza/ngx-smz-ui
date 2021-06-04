import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SmzChart } from './features/chart/chart.component';

@NgModule({
    imports: [CommonModule],
    exports: [SmzChart],
    declarations: [SmzChart]
  })
  export class SmzChartModule {}
